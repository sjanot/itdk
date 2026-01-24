#!/bin/bash

# IT-DK.sk - Direct Deployment Script
# Deploys from local git repo on server, bypassing Portainer git integration

set -e

SERVER="stef_user@188.245.222.156"
SSH_PORT="2222"
REPO_PATH="/tmp/itdk"

echo "=========================================="
echo "IT-DK.sk - Direct Deployment"
echo "=========================================="
echo ""

echo "Step 1: Pulling latest code from GitHub..."
ssh -p $SSH_PORT $SERVER << 'ENDSSH'
    cd /tmp/itdk || exit 1

    echo "Current commit:"
    git log -1 --oneline

    echo ""
    echo "Pulling latest changes..."
    git fetch origin
    git reset --hard origin/main

    echo ""
    echo "Updated to:"
    git log -1 --oneline
ENDSSH

if [ $? -ne 0 ]; then
    echo "❌ Failed to update git repository"
    exit 1
fi

echo ""
echo "✓ Code updated successfully"
echo ""

echo "Step 2: Stopping containers..."
ssh -p $SSH_PORT $SERVER << 'ENDSSH'
    cd /tmp/itdk
    docker-compose down
ENDSSH

echo "✓ Containers stopped"
echo ""

echo "Step 3: Removing old Docker images..."
ssh -p $SSH_PORT $SERVER << 'ENDSSH'
    docker rmi itdk-frontend:latest 2>/dev/null || echo "Frontend image not found"
    docker rmi itdk-backend:latest 2>/dev/null || echo "Backend image not found"
ENDSSH

echo "✓ Old images removed"
echo ""

echo "Step 4: Building new images (this takes ~2 minutes)..."
ssh -p $SSH_PORT $SERVER << 'ENDSSH'
    cd /tmp/itdk
    docker-compose build --no-cache
ENDSSH

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✓ Images built successfully"
echo ""

echo "Step 5: Starting containers..."
ssh -p $SSH_PORT $SERVER << 'ENDSSH'
    cd /tmp/itdk
    docker-compose up -d
ENDSSH

echo "✓ Containers started"
echo ""

echo "Step 6: Waiting for services to start..."
sleep 20

echo ""
echo "Step 7: Verifying deployment..."

# Check backend
HEALTH=$(ssh -p $SSH_PORT $SERVER "curl -s http://127.0.0.1:5001/api/health 2>/dev/null")
if echo "$HEALTH" | grep -q "ok"; then
    echo "✓ Backend is responding"
else
    echo "⚠ Backend might still be starting"
fi

# Check frontend
FRONTEND=$(ssh -p $SSH_PORT $SERVER "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3080 2>/dev/null")
if [ "$FRONTEND" = "200" ]; then
    echo "✓ Frontend is responding"
else
    echo "⚠ Frontend returned status: $FRONTEND"
fi

echo ""
echo "=========================================="
echo "✅ DEPLOYMENT COMPLETE!"
echo "=========================================="
echo ""
echo "🌐 Website: https://it-dk.sk"
echo ""
echo "If changes not visible:"
echo "1. Hard refresh browser (Ctrl+Shift+R)"
echo "2. Clear browser cache"
echo "3. Try incognito mode"
echo ""
echo "To check logs:"
echo "  ssh -p $SSH_PORT $SERVER"
echo "  docker logs itdk-frontend"
echo "  docker logs itdk-backend"
echo ""
