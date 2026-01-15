#!/bin/bash

# Quick deployment script for IT-DK.sk
# Usage: ./deploy.sh [admin_password]

set -e

SERVER="188.245.222.156"
SSH_PORT="2222"
SSH_USER="stef_user"
STACK_ID="28"
ENDPOINT_ID="2"

echo "=========================================="
echo "IT-DK.sk Deployment Script"
echo "=========================================="
echo ""

# Check if password is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <portainer_admin_password>"
    echo ""
    echo "Example: $0 'your_password_here'"
    exit 1
fi

ADMIN_PASSWORD="$1"

echo "Step 1: Connecting to server..."
echo "Step 2: Authenticating with Portainer..."

# Get JWT token
TOKEN=$(ssh -p $SSH_PORT $SSH_USER@$SERVER "curl -sX POST 'http://localhost:9000/api/auth' \
  -H 'Content-Type: application/json' \
  -d '{\"username\":\"admin\",\"password\":\"$ADMIN_PASSWORD\"}' \
  2>/dev/null | python3 -c \"import sys,json; print(json.load(sys.stdin)['jwt'])\"")

if [ -z "$TOKEN" ]; then
    echo "❌ Authentication failed. Check password."
    exit 1
fi

echo "✓ Authenticated successfully"
echo ""

echo "Step 3: Stopping stack..."
ssh -p $SSH_PORT $SSH_USER@$SERVER "curl -sX POST 'http://localhost:9000/api/stacks/$STACK_ID/stop?endpointId=$ENDPOINT_ID' \
  -H 'Authorization: Bearer $TOKEN' > /dev/null"
echo "✓ Stack stopped"
echo ""

echo "Step 4: Deleting old Docker images..."
ssh -p $SSH_PORT $SSH_USER@$SERVER "
  curl -sX DELETE 'http://localhost:9000/api/endpoints/$ENDPOINT_ID/docker/images/itdk-backend?force=true' \
    -H 'Authorization: Bearer $TOKEN' > /dev/null
  curl -sX DELETE 'http://localhost:9000/api/endpoints/$ENDPOINT_ID/docker/images/itdk-frontend?force=true' \
    -H 'Authorization: Bearer $TOKEN' > /dev/null
"
echo "✓ Old images deleted"
echo ""

echo "Step 5: Redeploying from GitHub..."
RESULT=$(ssh -p $SSH_PORT $SSH_USER@$SERVER "curl -sX PUT 'http://localhost:9000/api/stacks/$STACK_ID/git/redeploy?endpointId=$ENDPOINT_ID' \
  -H 'Authorization: Bearer $TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{\"pullImage\":false}' 2>/dev/null")

if echo "$RESULT" | grep -q "error\|failed"; then
    echo "❌ Deployment failed:"
    echo "$RESULT"
    exit 1
fi

echo "✓ Redeploy triggered"
echo ""

echo "Step 6: Waiting for build to complete..."
echo "(This takes about 2 minutes...)"
for i in {1..12}; do
    echo -n "."
    sleep 10
done
echo ""
echo "✓ Build should be complete"
echo ""

echo "Step 7: Verifying deployment..."
HEALTH=$(ssh -p $SSH_PORT $SSH_USER@$SERVER "curl -s 'https://it-dk.sk/api/health' 2>/dev/null")

if echo "$HEALTH" | grep -q "ok"; then
    echo "✓ API is responding"
else
    echo "⚠ API might still be starting up. Check manually: https://it-dk.sk/api/health"
fi

echo ""
echo "=========================================="
echo "✓ Deployment completed!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Open https://it-dk.sk in browser"
echo "2. Check that everything works"
echo "3. Monitor logs in Portainer if needed"
echo ""
