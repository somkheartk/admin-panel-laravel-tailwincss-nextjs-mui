# Migration from Laravel/MySQL to NestJS/MongoDB

## Overview
This document describes the migration from the Laravel backend with MySQL database to a NestJS backend with MongoDB database.

## What Changed

### Backend Stack
- **Before**: Laravel 12 + PHP 8.3 + MySQL 8.0
- **After**: NestJS 11 + TypeScript + MongoDB 8.0

### Key Changes

#### 1. Backend Structure
```
OLD (Laravel):
backend/
├── app/
│   ├── Http/Controllers/
│   └── Models/
├── routes/
├── database/migrations/
└── composer.json

NEW (NestJS):
backend/
├── src/
│   ├── dashboard/
│   ├── health/
│   └── main.ts
├── package.json
└── Dockerfile
```

#### 2. API Endpoints
All API endpoints remain the same:
- `GET /api/health` - Health check
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/orders` - Recent orders

#### 3. Docker Configuration

**Database Container**:
- Changed from `mysql:8.0` to `mongo:8.0`
- Port changed from `3306` to `27017`

**Backend Container**:
- Port changed from `8000` to `3001`
- No longer requires PHP-FPM or Nginx
- Runs directly with Node.js

#### 4. Environment Variables

**Before**:
```env
APP_KEY=base64:...
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=admin_panel
DB_USERNAME=admin_user
DB_PASSWORD=admin_password
```

**After**:
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin_password@db:27017/admin_panel?authSource=admin
FRONTEND_URL=http://localhost:3000
```

## Benefits of Migration

1. **Type Safety**: Full TypeScript support on backend
2. **Modern Architecture**: NestJS provides a modular, testable architecture
3. **Flexible Data Model**: MongoDB allows for more flexible schema design
4. **Unified Language**: Both frontend and backend now use JavaScript/TypeScript
5. **Better Developer Experience**: Hot reload, better debugging, modern tooling
6. **Scalability**: MongoDB horizontal scaling, NestJS microservices support

## Frontend Compatibility

The frontend currently uses hardcoded data and does not make API calls yet. When implementing API integration:

1. Update API base URL from `http://localhost:8000/api` to `http://localhost:3001/api`
2. The data structure remains the same, no changes needed in components
3. Use the environment variable `NEXT_PUBLIC_API_URL` for the API endpoint

## Development Workflow

### Before (Laravel)
```bash
cd backend
composer install
php artisan serve
```

### After (NestJS)
```bash
cd backend
npm install
npm run start:dev
```

## Docker Deployment

### Before
```bash
docker-compose up -d
# Wait for MySQL and Laravel migrations
```

### After
```bash
docker-compose up -d
# MongoDB starts immediately, no migrations needed
```

## Data Migration

Since the current application uses hardcoded data and doesn't have a production database yet, no data migration is required. When implementing real data storage:

1. Define MongoDB schemas using Mongoose
2. Create DTOs for data validation
3. Implement CRUD operations in services
4. Connect controllers to services

## Testing

All existing functionality has been preserved:
- ✅ Health check endpoint
- ✅ Dashboard stats endpoint
- ✅ Recent orders endpoint
- ✅ CORS configuration
- ✅ Docker containerization
- ✅ Environment-based configuration

## Next Steps

1. Implement MongoDB schemas for real data storage
2. Add authentication and authorization
3. Create more API endpoints as needed
4. Implement frontend API integration
5. Add comprehensive testing (unit, integration, e2e)
6. Set up monitoring and logging

## Rollback Plan

If needed, the original Laravel backend is preserved in `backend-laravel-backup/` directory. To rollback:

1. Stop and remove current containers
2. Restore Laravel backend: `mv backend-laravel-backup backend`
3. Update docker-compose.yml to use MySQL
4. Restart services

## Support

For questions or issues with the migration, please open an issue on GitHub.
