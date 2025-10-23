# Deployment Guide

This guide explains how to deploy the Admin Panel application using Docker Compose for development or production environments.

## 📋 Table of Contents

- [Docker Compose Deployment](#docker-compose-deployment)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment Steps](#post-deployment-steps)

---

## 🐳 Docker Compose Deployment

### For Development or Self-Hosted Production

#### 1. Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 2GB RAM
- At least 10GB disk space

#### 2. Setup Steps

**Clone the repository:**
```bash
git clone https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui.git
cd admin-panel-laravel-tailwincss-nextjs-mui
```

**Configure environment:**
```bash
cp .env.docker.example .env
```

**Generate application key:**
```bash
# On your local machine with PHP installed:
cd backend
php artisan key:generate --show

# Or use Docker:
docker run --rm -v $(pwd)/backend:/app composer/composer require laravel/framework
docker run --rm -v $(pwd)/backend:/app php:8.3-cli php /app/artisan key:generate --show
```

**Update .env file:**
- Add the generated `APP_KEY`
- Update `APP_URL` with your domain
- Update `NEXT_PUBLIC_API_URL` with your backend URL
- Change default passwords for production

**Build and start services:**
```bash
docker-compose up -d
```

**Run database migrations:**
```bash
docker-compose exec backend php artisan migrate --force
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:3306

#### 3. Production Deployment

**Update for production:**

1. Edit `.env`:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api
   ```

2. Use strong passwords:
   ```env
   DB_ROOT_PASSWORD=strong_random_password
   DB_PASSWORD=strong_random_password
   ```

3. Configure SSL/TLS:
   - Add reverse proxy (Nginx/Traefik) with SSL for secure connections

---

## ⚙️ Environment Configuration

### Required Environment Variables

#### Backend (Laravel)

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_NAME` | Application name | `AdminPanel` |
| `APP_ENV` | Environment | `production` |
| `APP_KEY` | Encryption key | `base64:...` |
| `APP_DEBUG` | Debug mode | `false` |
| `APP_URL` | Backend URL | `https://api.yourdomain.com` |
| `DB_CONNECTION` | Database driver | `mysql` |
| `DB_HOST` | Database host | `db` or `${db.HOSTNAME}` |
| `DB_PORT` | Database port | `3306` |
| `DB_DATABASE` | Database name | `admin_panel` |
| `DB_USERNAME` | Database user | `admin_user` |
| `DB_PASSWORD` | Database password | `[SECRET]` |
| `LOG_CHANNEL` | Logging channel | `stderr` |
| `SESSION_DRIVER` | Session storage | `database` |
| `CACHE_STORE` | Cache storage | `database` |

#### Frontend (Next.js)

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://api.yourdomain.com/api` |

---

## 🔧 Post-Deployment Steps

### 1. Verify Services

**Check backend health:**
```bash
curl https://your-backend-url/api/health
```

**Check frontend:**
```bash
curl https://your-frontend-url
```

### 2. Run Database Migrations

**Docker Compose:**
```bash
docker-compose exec backend php artisan migrate --force
```

Note: Migrations run automatically when the backend container starts, so manual execution is only needed if you want to run them again.

### 3. Create Admin User (Optional)

```bash
docker-compose exec backend php artisan tinker
```

Then run:
```php
User::create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => Hash::make('secure_password')
]);
```

### 4. Monitor Logs

**Docker Compose:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 5. Set Up Backups

**Docker Compose Database Backups:**
```bash
# Backup database
docker-compose exec db mysqldump -u admin_user -p admin_panel > backup.sql

# Restore database
docker-compose exec -T db mysql -u admin_user -p admin_panel < backup.sql
```

---

## 🔄 CI/CD Pipeline

The repository includes GitHub Actions workflow that:

1. **Builds Docker images** for backend and frontend
2. **Pushes to Docker Hub** when merged to main
3. **Tags images** with branch name and `latest`

### Setup GitHub Secrets

Add to your repository settings:
- `DOCKER_USERNAME`: Docker Hub username
- `DOCKER_PASSWORD`: Docker Hub password/token

---

## 🚀 Scaling

### Docker Compose

```bash
# Scale specific service
docker-compose up -d --scale backend=3 --scale frontend=2
```

**Note:** Requires load balancer setup for multiple instances.

---

## 🐛 Troubleshooting

### Common Issues

**1. Database Connection Failed**
- Check database credentials
- Verify database service is running
- Check network connectivity

**2. Frontend Can't Connect to Backend**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in Laravel
- Ensure backend is accessible

**3. 500 Internal Server Error**
- Check backend logs
- Verify `APP_KEY` is set (or allow auto-generation)
- Check database connection
- Review startup logs for migration errors

**4. Build Failures**
- Check Dockerfile syntax
- Verify all dependencies are installable
- Review build logs

### Getting Help

1. Check logs first
2. Review environment variables
3. Verify service health
4. Check GitHub Issues
5. Contact support

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Need help?** Open an issue on [GitHub](https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/issues)
