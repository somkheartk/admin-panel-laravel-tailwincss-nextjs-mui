# Digital Ocean App Platform Configuration

This directory contains the configuration for deploying to Digital Ocean App Platform.

## Files

- **app.yaml**: The complete app specification that defines all components (backend, frontend, database, workers, and jobs)

## How to Deploy

### Option 1: One-Click Deploy (Recommended)

Click the "Deploy to DigitalOcean" button in the main README.md:

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/tree/main)

### Option 2: Import App Spec

1. Go to [Digital Ocean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub account and select this repository
4. Choose branch: `main`
5. Click "Edit App Spec"
6. Copy the contents of `app.yaml` from this directory
7. Paste into the spec editor
8. Click "Next"
9. Configure secrets (especially `APP_KEY`)
10. Click "Create Resources"

### Option 3: Manual Component Configuration

If Digital Ocean auto-detects components, you can configure them manually:

**Backend Service:**
- Source Directory: `backend`
- Dockerfile Path: `backend/Dockerfile`
- HTTP Port: 80
- Route: `/api`

**Frontend Service:**
- Source Directory: `frontend`
- Dockerfile Path: `frontend/Dockerfile`
- HTTP Port: 3000
- Route: `/`

**Database:**
- Engine: MySQL 8
- Name: `db`

## Components Defined

The app.yaml defines:

1. **Backend Service** (Laravel API)
   - Dockerfile-based build from `backend/Dockerfile`
   - Connects to MySQL database
   - Serves API endpoints at `/api` route

2. **Frontend Service** (Next.js)
   - Dockerfile-based build from `frontend/Dockerfile`
   - Consumes backend API
   - Serves main application at `/` route

3. **Database** (MySQL 8)
   - Managed MySQL database
   - Automatic backups
   - Connects to backend and worker

4. **Queue Worker** (Optional)
   - Processes Laravel queue jobs
   - Runs `php artisan queue:work`

5. **Pre-Deploy Migration Job**
   - Runs database migrations before deployment
   - Executes `php artisan migrate --force`

## Environment Variables

### Required Secrets

You must configure these secrets in Digital Ocean:

- `APP_KEY`: Laravel application encryption key
  - Generate with: `php artisan key:generate --show`
  - Format: `base64:...`

### Automatically Configured

These are automatically set by Digital Ocean:

- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`: Database connection from managed database
- `NEXT_PUBLIC_API_URL`: Frontend API URL (points to backend service)

## Post-Deployment

1. Verify all services are running
2. Check the "Runtime Logs" for each service
3. Database migrations run automatically via pre-deploy job
4. Access your application via the provided URL

## Troubleshooting

If components are not detected:

1. Ensure repository permissions are granted to Digital Ocean
2. Verify the `.do/app.yaml` file is present in the main branch
3. Check that both `backend/Dockerfile` and `frontend/Dockerfile` exist
4. Try using the "Edit App Spec" option to manually import the configuration

For more help, see the main [DEPLOYMENT.md](../DEPLOYMENT.md) file.
