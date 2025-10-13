#!/bin/bash

echo "🚀 Setting up NestJS Backend API..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 22 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "❌ Node.js version 22 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update with your database credentials."
fi

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npm run prisma:generate

# Push database schema
echo "🗄️ Setting up database schema..."
npm run prisma:push

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   npm run start:dev"
echo ""
echo "📚 Swagger documentation will be available at:"
echo "   http://localhost:3000/api"
echo ""
echo "🧪 To run tests:"
echo "   npm run test"
