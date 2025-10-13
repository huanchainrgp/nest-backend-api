# Testing Guide

This document provides comprehensive information about testing the NestJS Backend API.

## 🧪 Test Structure

The project includes two types of tests:

1. **Unit Tests** - Test individual components in isolation
2. **E2E Tests** - Test the entire application flow from API endpoints

## 📁 Test Files

```
test/
├── auth.e2e-spec.ts          # Authentication E2E tests
├── app.e2e-spec.ts           # Basic app functionality tests
├── setup.ts                  # Test setup and cleanup
├── jest-e2e.json            # E2E test configuration
└── run-e2e.sh               # E2E test runner script

src/
├── auth/
│   └── auth.service.spec.ts  # Authentication service unit tests
└── ... (other unit test files)
```

## 🚀 Running Tests

### Unit Tests

```bash
# Run all unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov

# Run specific test file
yarn test auth.service.spec.ts
```

### E2E Tests

```bash
# Run all E2E tests
yarn test:e2e

# Run E2E tests with the helper script
./test/run-e2e.sh

# Run specific E2E test file
yarn test:e2e --testPathPattern=auth.e2e-spec.ts
```

## 📋 Test Coverage

### Authentication E2E Tests

The `auth.e2e-spec.ts` file includes comprehensive tests for:

#### Health Check Tests
- ✅ API status endpoint (`GET /`)
- ✅ Health check endpoint (`GET /health`)

#### User Registration Tests
- ✅ Successful user registration
- ✅ Validation of email format
- ✅ Password length validation
- ✅ Required field validation
- ✅ Duplicate email handling
- ✅ Optional name field handling

#### User Login Tests
- ✅ Successful login with valid credentials
- ✅ Invalid email rejection
- ✅ Invalid password rejection
- ✅ Missing credentials handling
- ✅ Email format validation

#### Protected Route Tests
- ✅ Profile access with valid token
- ✅ Profile access via users endpoint
- ✅ Unauthorized access without token
- ✅ Invalid token rejection
- ✅ Malformed token handling
- ✅ Token validation

#### Error Handling Tests
- ✅ Malformed JSON handling
- ✅ Empty request body handling
- ✅ Extra fields handling (whitelist validation)

#### API Documentation Tests
- ✅ Swagger UI accessibility
- ✅ Swagger JSON endpoint

#### CORS Tests
- ✅ CORS headers verification

## 🔧 Test Configuration

### Jest Configuration

The project uses Jest for testing with the following configuration:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": ["**/*.(t|j)s"],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  "setupFilesAfterEnv": ["<rootDir>/../test/setup.ts"]
}
```

### E2E Configuration

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "setupFilesAfterEnv": ["<rootDir>/setup.ts"],
  "testTimeout": 30000
}
```

## 🗄️ Database Testing

### Test Database Setup

The tests use the same PostgreSQL database as the main application. The test setup includes:

1. **Before Tests**: Clean up existing test data
2. **After Tests**: Clean up test data and disconnect from database

### Test Data Management

- Test users are created with email addresses containing `test@example.com`
- All test data is automatically cleaned up after test completion
- Tests use unique email addresses to avoid conflicts

## 🔐 Authentication Testing

### JWT Token Testing

The E2E tests verify:

1. **Token Generation**: Valid tokens are created during registration and login
2. **Token Validation**: Tokens are properly validated for protected routes
3. **Token Security**: Invalid, malformed, and expired tokens are rejected
4. **User Context**: Tokens contain correct user information

### Test User Flow

1. Register a new user
2. Login with credentials
3. Access protected routes with the token
4. Verify user data consistency across endpoints

## 📊 Coverage Reports

After running tests with coverage, you can find detailed reports in the `coverage/` directory:

```bash
# Generate coverage report
yarn test:cov

# Open coverage report in browser
open coverage/lcov-report/index.html
```

## 🐛 Debugging Tests

### Running Individual Tests

```bash
# Run specific test
yarn test:e2e --testNamePattern="should register a new user successfully"

# Run tests with verbose output
yarn test:e2e --verbose

# Run tests with debug output
yarn test:e2e --detectOpenHandles
```

### Test Debugging Tips

1. **Check Application Status**: Ensure the app is running before E2E tests
2. **Database Connection**: Verify database connectivity
3. **Environment Variables**: Check that all required env vars are set
4. **Test Data**: Ensure test data is properly cleaned up between runs

## 🚨 Common Issues

### Application Not Running
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```
**Solution**: Start the application with `yarn start:dev`

### Database Connection Issues
```
Error: Can't reach database server
```
**Solution**: Check DATABASE_URL in .env file and ensure database is accessible

### Test Timeout
```
Error: Timeout - Async callback was not invoked
```
**Solution**: Increase test timeout in jest-e2e.json or check for hanging promises

### Token Validation Errors
```
Error: JwtStrategy requires a secret or key
```
**Solution**: Ensure JWT_SECRET is set in .env file

## 📈 Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '22'
      - run: npm install
      - run: npm run test
      - run: npm run test:e2e
```

## 🎯 Best Practices

1. **Test Isolation**: Each test should be independent
2. **Data Cleanup**: Always clean up test data
3. **Realistic Data**: Use realistic test data
4. **Error Scenarios**: Test both success and failure cases
5. **Performance**: Keep tests fast and efficient
6. **Documentation**: Document complex test scenarios

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Prisma Testing](https://www.prisma.io/docs/guides/testing)

---

**Happy Testing! 🎉**
