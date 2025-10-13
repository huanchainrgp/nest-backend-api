#!/bin/bash

echo "🧪 Running E2E Tests for NestJS Backend API..."

# Check if the application is running
if ! curl -s http://localhost:3000/health > /dev/null; then
    echo "❌ Application is not running. Please start the application first:"
    echo "   npm run start:dev"
    exit 1
fi

echo "✅ Application is running"

# Run E2E tests
echo "🚀 Starting E2E tests..."
npm run test:e2e

echo "✅ E2E tests completed!"
