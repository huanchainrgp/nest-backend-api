# NestJS Backend API

A comprehensive NestJS backend API with authentication, Prisma ORM, PostgreSQL database, and Swagger documentation.

## 🚀 Features

- **Node.js 22** - Latest LTS version
- **NestJS Framework** - Progressive Node.js framework
- **Prisma ORM** - Next-generation ORM for Node.js and TypeScript
- **PostgreSQL Database** - Robust relational database
- **JWT Authentication** - Secure token-based authentication
- **Swagger Documentation** - Interactive API documentation
- **Unit Testing** - Comprehensive test coverage with Jest
- **TypeScript** - Full TypeScript support
- **Validation** - Request validation with class-validator
- **CORS Support** - Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js 22 or higher
- PostgreSQL database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nest-backend-api
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_EXPIRES_IN="7d"
   PORT=3000
   ```

4. **Database Setup**
   ```bash
   # Generate Prisma client
   yarn prisma:generate
   
   # Push schema to database
   yarn prisma:push
   
   # Or run migrations
   yarn prisma:migrate
   ```

5. **Start the application**
   ```bash
   # Development mode
   yarn start:dev
   
   # Production mode
   yarn build
   yarn start:prod
   ```

## 📁 Project Structure

```
nest-backend-api/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── register.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   └── auth-response.dto.ts
│   │   ├── guards/              # Authentication guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── local-auth.guard.ts
│   │   ├── strategies/          # Passport strategies
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── auth.controller.ts   # Authentication endpoints
│   │   ├── auth.service.ts      # Authentication business logic
│   │   └── auth.module.ts       # Authentication module
│   ├── users/                   # Users module
│   │   ├── users.controller.ts  # User endpoints
│   │   ├── users.service.ts     # User business logic
│   │   └── users.module.ts      # User module
│   ├── prisma/                  # Database module
│   │   ├── prisma.service.ts    # Prisma client service
│   │   └── prisma.module.ts     # Prisma module
│   ├── common/                  # Shared utilities
│   │   ├── decorators/          # Custom decorators
│   │   ├── guards/              # Global guards
│   │   ├── interceptors/        # Global interceptors
│   │   ├── pipes/               # Global pipes
│   │   └── utils/               # Utility functions
│   ├── config/                  # Configuration files
│   ├── app.controller.ts        # Main app controller
│   ├── app.service.ts           # Main app service
│   ├── app.module.ts            # Main app module
│   └── main.ts                  # Application entry point
├── prisma/
│   └── schema.prisma            # Database schema
├── test/                        # E2E tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## 🔧 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/profile` | Get user profile | Yes |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users/profile` | Get current user profile | Yes |

### General

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | API health check | No |
| GET | `/health` | Health status | No |

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
- **Swagger UI**: http://localhost:3000/api

## 🧪 Testing

### Run Tests

```bash
# Unit tests
yarn test

# E2E tests
yarn test:e2e

# Test coverage
yarn test:cov

# Watch mode
yarn test:watch
```

### Test Structure

- **Unit Tests**: Located in `*.spec.ts` files alongside source code
- **E2E Tests**: Located in the `test/` directory
- **Coverage**: Generated in the `coverage/` directory

## 🗄️ Database

### Prisma Commands

```bash
# Generate Prisma client
yarn prisma:generate

# Push schema changes to database
yarn prisma:push

# Create and run migrations
yarn prisma:migrate

# Open Prisma Studio (database GUI)
yarn prisma:studio
```

### Database Schema

The application uses a simple User model:

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register**: Create a new user account
2. **Login**: Authenticate and receive a JWT token
3. **Protected Routes**: Include the JWT token in the Authorization header

### Example Usage

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","name":"John Doe"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Access protected route
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Deployment

### Environment Variables

Make sure to set the following environment variables in production:

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
JWT_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="production"
```

### Build for Production

```bash
yarn build
yarn start:prod
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `yarn build` | Build the application |
| `yarn start` | Start the application |
| `yarn start:dev` | Start in development mode with hot reload |
| `yarn start:debug` | Start in debug mode |
| `yarn start:prod` | Start in production mode |
| `yarn test` | Run unit tests |
| `yarn test:watch` | Run tests in watch mode |
| `yarn test:cov` | Run tests with coverage |
| `yarn test:e2e` | Run e2e tests |
| `yarn lint` | Run ESLint |
| `yarn format` | Format code with Prettier |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or need help, please open an issue in the repository.

---

**Happy Coding! 🎉**
