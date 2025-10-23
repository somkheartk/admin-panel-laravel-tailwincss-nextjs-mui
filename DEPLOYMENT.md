# Deployment Guide

This guide explains how to deploy the Admin Panel application on Digital Ocean or any other Docker-compatible platform.

## 📋 Table of Contents

- [Digital Ocean App Platform](#digital-ocean-app-platform)
- [Component Detection](#component-detection)
- [Docker Compose Deployment](#docker-compose-deployment)
- [Environment Configuration](#environment-configuration)
- [Post-Deployment Steps](#post-deployment-steps)

---

## 🌊 Digital Ocean App Platform

### Prerequisites

1. A Digital Ocean account
2. GitHub repository access
3. Required secrets configured

### 🎯 Component Detection

This repository is configured to be automatically detected by Digital Ocean App Platform:

**Detection Files:**
- ✅ Root-level `package.json` - For Node.js/Next.js detection
- ✅ Root-level `composer.json` - For PHP/Laravel detection
- ✅ `.do/app.yaml` - Complete app specification
- ✅ Backend Dockerfile at `backend/Dockerfile`
- ✅ Frontend Dockerfile at `frontend/Dockerfile`

When you connect this repository to Digital Ocean:
1. The platform will detect both package.json and composer.json
2. It will automatically use the `.do/app.yaml` specification
3. Components will be configured with proper source directories
4. All services (backend, frontend, database, workers) will be set up automatically

### Deployment Steps

#### Option 1: One-Click Deploy (Fastest)

Click the deploy button in the main README or use this link:

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/tree/main)

Digital Ocean will:
- Automatically detect the repository components
- Import the `.do/app.yaml` specification
- Configure all services with correct settings
- You only need to add the `APP_KEY` secret

#### Option 2: Using App Spec (Recommended)

1. **Login to Digital Ocean**
   - Navigate to [Digital Ocean App Platform](https://cloud.digitalocean.com/apps)

2. **Create New App**
   - Click "Create App"
   - Select "GitHub" as source
   - Authorize Digital Ocean to access your repository
   - Select: `somkheartk/admin-panel-laravel-tailwincss-nextjs-mui`
   - Branch: `main`

3. **Import App Spec**
   - Select "Edit App Spec"
   - Copy the contents of `.do/app.yaml`
   - Paste into the spec editor
   - Click "Next"

4. **Configure Environment Variables**
   - Add `APP_KEY` secret:
     ```bash
     # Generate locally:
     php artisan key:generate --show
     ```
   - Copy the generated key (e.g., `base64:...`)
   - Add as a secret in Digital Ocean

5. **Review & Deploy**
   - Review the configuration
   - Click "Create Resources"
   - Wait for deployment to complete (5-10 minutes)

#### Option 2: Manual Configuration

1. **Create Database**
   - Name: `admin-panel-db`
   - Engine: MySQL 8
   - Plan: Choose based on your needs

2. **Add Backend Service**
   - Name: `backend`
   - Source: GitHub repository
   - Source Directory: `backend`
   - Dockerfile: `backend/Dockerfile`
   - HTTP Port: 80
   - Route: `/api`
   - Environment Variables:
     ```
     APP_NAME=AdminPanel
     APP_ENV=production
     APP_DEBUG=false
     APP_KEY=[SECRET]
     DB_CONNECTION=mysql
     DB_HOST=${db.HOSTNAME}
     DB_PORT=${db.PORT}
     DB_DATABASE=${db.DATABASE}
     DB_USERNAME=${db.USERNAME}
     DB_PASSWORD=${db.PASSWORD}
     LOG_CHANNEL=stderr
     SESSION_DRIVER=database
     CACHE_STORE=database
     ```

3. **Add Frontend Service**
   - Name: `frontend`
   - Source: GitHub repository
   - Source Directory: `frontend`
   - Dockerfile: `frontend/Dockerfile`
   - HTTP Port: 3000
   - Route: `/`
   - Environment Variables:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_API_URL=${backend.PUBLIC_URL}/api
     ```

4. **Add Pre-Deploy Job (Migrations)**
   - Name: `migrate`
   - Type: Pre-Deploy Job
   - Source Directory: `backend`
   - Command: `php artisan migrate --force`
   - Use same environment variables as backend

### Auto-Deploy Configuration

The app will automatically redeploy when:
- Changes are pushed to the `main` branch
- Manual trigger from Digital Ocean dashboard

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
   - Add reverse proxy (Nginx/Traefik) with SSL
   - Or use Digital Ocean's built-in SSL

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

**Digital Ocean:**
- Migrations run automatically via pre-deploy job
- Check job logs in Digital Ocean dashboard

**Docker Compose:**
```bash
docker-compose exec backend php artisan migrate --force
```

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

**Digital Ocean:**
- View logs in the Digital Ocean dashboard
- Runtime Logs → Select service → View logs

**Docker Compose:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 5. Set Up Backups

**Database Backups (Digital Ocean):**
- Automatic daily backups are included with managed databases
- Configure retention period in database settings

**Docker Compose:**
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

### Digital Ocean

1. **Horizontal Scaling:**
   - Increase instance count in app spec
   - Each service scales independently

2. **Vertical Scaling:**
   - Upgrade instance size in settings
   - Options: basic-xxs, basic-xs, basic-s, etc.

3. **Database Scaling:**
   - Upgrade database plan as needed
   - Add read replicas for read-heavy workloads

### Docker Compose

```bash
# Scale specific service
docker-compose up -d --scale backend=3 --scale frontend=2
```

**Note:** Requires load balancer setup for multiple instances.

---

## 🐛 Troubleshooting

### Common Issues

**0. No Components Detected (Digital Ocean)**
- ✅ **FIXED**: Root-level `package.json` and `composer.json` added for auto-detection
- Verify you're connected to the correct repository
- Ensure the `main` branch is selected
- Check that `.do/app.yaml` exists in the repository
- Try manually importing the app spec using "Edit App Spec" option
- Verify GitHub permissions allow Digital Ocean to read the repository
- If auto-detection still fails, use Option 2 (Manual Configuration) from deployment steps

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
- Verify `APP_KEY` is set
- Run `php artisan config:cache`

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

- [Digital Ocean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [Docker Documentation](https://docs.docker.com/)
- [Laravel Deployment](https://laravel.com/docs/deployment)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Need help?** Open an issue on [GitHub](https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/issues)
