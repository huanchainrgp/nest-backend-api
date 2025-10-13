# Deployment Guide

This guide covers deploying the NestJS Backend API to various platforms.

## 🚀 Production Build

### Local Production Build

```bash
# Install dependencies
yarn install

# Generate Prisma client
yarn prisma:generate

# Build the application
yarn build

# Start in production mode
yarn start:prod
```

### Environment Variables

Make sure to set these environment variables in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="production"
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
# Build the image
docker build -t nest-backend-api .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  -e JWT_EXPIRES_IN="7d" \
  -e PORT=3000 \
  nest-backend-api
```

### Docker Compose

```bash
# Start with docker-compose
docker-compose up -d
```

## ☁️ Cloud Platform Deployment

### Render.com

1. **Connect Repository**: Connect your GitHub repository to Render
2. **Environment**: Select "Web Service"
3. **Build Command**: `yarn install --frozen-lockfile && yarn build`
4. **Start Command**: `yarn start:prod`
5. **Environment Variables**: Set all required environment variables
6. **Node Version**: 22.16.0 (specified in .nvmrc)

### Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `vercel --prod`
3. **Environment Variables**: Set in Vercel dashboard

### Railway

1. **Connect Repository**: Connect your GitHub repository
2. **Environment Variables**: Set all required variables
3. **Deploy**: Automatic deployment on push

### Heroku

1. **Install Heroku CLI**: Follow Heroku documentation
2. **Create App**: `heroku create your-app-name`
3. **Set Environment Variables**:
   ```bash
   heroku config:set DATABASE_URL="your-database-url"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set JWT_EXPIRES_IN="7d"
   heroku config:set PORT=3000
   ```
4. **Deploy**: `git push heroku main`

## 🔧 Build Configuration

### Package.json Scripts

The following scripts are configured for production:

- `yarn build`: Builds the application for production
- `yarn start:prod`: Starts the application in production mode
- `yarn postinstall`: Automatically generates Prisma client after installation

### Build Process

1. **Dependencies**: All dependencies are installed with `yarn install --frozen-lockfile`
2. **Prisma Client**: Generated automatically via `postinstall` script
3. **TypeScript Compilation**: Built using NestJS CLI
4. **Output**: Compiled JavaScript in `dist/` directory

## 🗄️ Database Setup

### Production Database

1. **Create Database**: Set up PostgreSQL database
2. **Environment Variable**: Set `DATABASE_URL`
3. **Schema Push**: Run `yarn prisma:push` to create tables
4. **Migrations**: Use `yarn prisma:migrate` for version control

### Database Migrations

```bash
# Create migration
yarn prisma:migrate dev --name init

# Apply migrations in production
yarn prisma:migrate deploy
```

## 🔒 Security Considerations

### Environment Variables

- Never commit `.env` files to version control
- Use strong, unique JWT secrets
- Rotate secrets regularly
- Use environment-specific database URLs

### CORS Configuration

The application has CORS enabled for all origins in development. For production:

```typescript
// In main.ts
app.enableCors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true,
});
```

### Rate Limiting

Consider adding rate limiting for production:

```bash
yarn add @nestjs/throttler
```

## 📊 Monitoring

### Health Checks

The application provides health check endpoints:

- `GET /health`: Basic health status
- `GET /`: API status

### Logging

Configure logging for production:

```typescript
// In main.ts
app.useLogger(new Logger());
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (should be 22.16.0)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection**:
   - Verify `DATABASE_URL` is correct
   - Check database accessibility
   - Ensure Prisma client is generated

3. **JWT Errors**:
   - Verify `JWT_SECRET` is set
   - Check token expiration settings

4. **Port Issues**:
   - Ensure `PORT` environment variable is set
   - Check if port is available

### Debug Commands

```bash
# Check build
yarn build

# Test production start
yarn start:prod

# Check Prisma connection
yarn prisma:studio

# Run tests
yarn test:e2e
```

## 📈 Performance Optimization

### Production Optimizations

1. **Enable Compression**:
   ```bash
   yarn add compression
   ```

2. **Set Production Environment**:
   ```bash
   export NODE_ENV=production
   ```

3. **Database Connection Pooling**: Configure in Prisma schema

4. **Caching**: Consider Redis for session storage

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '22'
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: yarn test:e2e
      # Deploy to your platform
```

---

**Happy Deploying! 🚀**
