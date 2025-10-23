# Architecture Overview

This document describes the architecture and deployment structure of the Admin Panel application.

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Digital Ocean                             │
│                                                                   │
│  ┌─────────────────┐         ┌─────────────────┐                │
│  │   Frontend      │         │    Backend      │                │
│  │   (Next.js)     │────────▶│   (Laravel)     │                │
│  │   Port: 3000    │   API   │   Port: 80      │                │
│  │                 │         │   + Nginx       │                │
│  └─────────────────┘         └────────┬────────┘                │
│          │                             │                         │
│          │                             ▼                         │
│          │                    ┌─────────────────┐                │
│          │                    │  MySQL 8.0      │                │
│          │                    │  Database       │                │
│          │                    └─────────────────┘                │
│          │                                                        │
│          ▼                                                        │
│  ┌─────────────────┐                                             │
│  │   End Users     │                                             │
│  │   (Browser)     │                                             │
│  └─────────────────┘                                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🏗️ Directory Structure

```
admin-panel-laravel-tailwincss-nextjs-mui/
├── .do/
│   └── app.yaml                 # Digital Ocean app specification
├── .github/
│   └── workflows/
│       └── docker-publish.yml   # CI/CD pipeline
├── backend/                     # Laravel Backend
│   ├── app/                     # Application code
│   ├── routes/
│   │   └── api.php             # API routes + health check
│   ├── public/                  # Public assets
│   ├── storage/                 # Storage directory
│   ├── Dockerfile              # Production Dockerfile
│   ├── nginx.conf              # Nginx configuration
│   ├── .dockerignore           # Docker ignore rules
│   ├── composer.json           # PHP dependencies
│   └── package.json            # Node dependencies (Vite)
├── frontend/                    # Next.js Frontend
│   ├── app/                     # Next.js App Router
│   ├── components/              # React components
│   ├── public/                  # Static assets
│   ├── Dockerfile              # Production Dockerfile
│   ├── .dockerignore           # Docker ignore rules
│   ├── next.config.ts          # Next.js config (standalone)
│   ├── package.json            # Dependencies
│   └── tsconfig.json           # TypeScript config
├── docker-compose.yml          # Development compose
├── docker-compose.prod.yml     # Production compose
├── .env.docker.example         # Environment template
├── deploy.sh                   # Deployment helper script
├── DEPLOYMENT.md               # Deployment guide
├── QUICKSTART.md               # Quick start guide
└── README.md                   # Main documentation
```

## 🔄 Request Flow

### Frontend Request Flow
```
User Browser
    │
    ▼
Next.js Server (SSR/SSG)
    │
    ▼
React Components
    │
    ▼
API Calls
    │
    ▼
Laravel Backend
```

### API Request Flow
```
Client
    │
    ▼
Nginx (Port 80)
    │
    ▼
FastCGI → PHP-FPM
    │
    ▼
Laravel Router
    │
    ▼
Controller
    │
    ▼
Model → Database
    │
    ▼
JSON Response
```

## 🐳 Docker Architecture

### Development Mode

```
┌─────────────────────────────────────────────────────────────────┐
│ Docker Network: admin-panel-network                              │
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐         │
│  │  Frontend   │    │   Backend   │    │   MySQL     │         │
│  │  Container  │    │  Container  │    │  Container  │         │
│  │             │    │             │    │             │         │
│  │  Next.js    │───▶│  Laravel    │───▶│  Database   │         │
│  │  Port: 3000 │    │  + Nginx    │    │  Port: 3306 │         │
│  │             │    │  Port: 80   │    │             │         │
│  └─────────────┘    └─────────────┘    └─────────────┘         │
│       │                    │                   │                 │
│       ▼                    ▼                   ▼                 │
│  Mapped to         Mapped to           Volume Mounted           │
│  localhost:3000    localhost:8000      db_data                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Production Mode (Digital Ocean)

```
┌─────────────────────────────────────────────────────────────────┐
│ Digital Ocean App Platform                                       │
│                                                                   │
│  ┌─────────────┐                                                 │
│  │   Load      │                                                 │
│  │  Balancer   │                                                 │
│  └──────┬──────┘                                                 │
│         │                                                         │
│    ┌────┴────┐                                                   │
│    ▼         ▼                                                   │
│  ┌─────┐  ┌─────┐    Frontend Service (Auto-scaled)             │
│  │     │  │     │                                                │
│  └─────┘  └─────┘                                                │
│                                                                   │
│  ┌─────────────┐    Backend Service (Auto-scaled)               │
│  │   Backend   │                                                 │
│  │  + Nginx    │                                                 │
│  └──────┬──────┘                                                 │
│         │                                                         │
│         ▼                                                         │
│  ┌─────────────┐    Managed Database                            │
│  │   MySQL 8   │    (Automatic Backups)                         │
│  └─────────────┘                                                 │
│                                                                   │
│  ┌─────────────┐    Worker (Optional)                           │
│  │Queue Worker │                                                 │
│  └─────────────┘                                                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI Library**: Material-UI (MUI) 7
- **Styling**: Tailwind CSS 4
- **State**: React 19
- **Build**: Standalone output for Docker

### Backend
- **Framework**: Laravel 12
- **Language**: PHP 8.3
- **Database**: MySQL 8.0
- **Server**: Nginx + PHP-FPM
- **Cache**: Database-based
- **Session**: Database-based
- **Queue**: Database-based

### DevOps
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub
- **Platform**: Digital Ocean App Platform

## 🔐 Security Features

### Application Security
- Laravel's built-in security features
- CSRF protection
- XSS prevention
- SQL injection prevention
- Encrypted sessions
- Secure password hashing (bcrypt)

### Infrastructure Security
- Health checks for all services
- Private networking between containers
- Environment variable management
- SSL/TLS certificates (Digital Ocean)
- Database connection pooling
- Rate limiting (configurable)

## 📊 Monitoring & Health Checks

### Health Check Endpoints

**Backend Health Check**
```
GET /api/health
Response: {"status":"ok","timestamp":"...","service":"backend"}
```

**Docker Health Checks**
- Frontend: HTTP GET to `http://localhost:3000`
- Backend: HTTP GET to `http://localhost/api/health`
- Database: MySQL ping command

### Logging

**Docker Logs**
```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

**Digital Ocean Logs**
- Available in dashboard under each service
- Real-time log streaming
- Log retention per plan

## 🚀 Deployment Methods

### 1. Digital Ocean App Platform (Recommended)
- Managed infrastructure
- Auto-scaling
- Built-in SSL
- Automatic backups
- Zero-downtime deployments
- $5-10/month per service

### 2. Docker Compose (Self-Hosted)
- Full control
- Cost-effective
- Requires server management
- Manual scaling
- Custom SSL setup

### 3. Kubernetes (Advanced)
- Maximum scalability
- Complex setup
- Enterprise-grade
- Requires K8s expertise

## 📈 Scaling Strategy

### Horizontal Scaling (Digital Ocean)
```yaml
# In .do/app.yaml
instance_count: 3  # Run 3 instances
instance_size_slug: basic-s  # Increase size
```

### Vertical Scaling
- Upgrade instance size
- Increase database resources
- Add read replicas

### Caching Strategy
1. **Application Cache**: Database-backed
2. **Session Cache**: Database-backed
3. **Future**: Redis for improved performance

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```
Trigger: Push to main branch
    │
    ▼
Checkout Code
    │
    ▼
Build Backend Image
    │
    ▼
Build Frontend Image
    │
    ▼
Push to Docker Hub
    │
    ▼
Tag with: latest, branch name
```

### Digital Ocean Auto-Deploy
```
GitHub Push → main branch
    │
    ▼
Digital Ocean Detects Change
    │
    ▼
Build New Images
    │
    ▼
Run Pre-Deploy Job (migrations)
    │
    ▼
Deploy New Version
    │
    ▼
Health Check
    │
    ▼
Live! (Zero Downtime)
```

## 🛠️ Development Workflow

1. **Local Development**
   ```bash
   docker-compose up -d
   ```

2. **Make Changes**
   - Edit code
   - Changes auto-reflect (with volumes)

3. **Test**
   ```bash
   docker-compose exec backend php artisan test
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Feature: ..."
   git push origin main
   ```

5. **Automatic Deployment**
   - GitHub Actions builds images
   - Digital Ocean deploys automatically

## 🎯 Performance Optimization

### Frontend
- Next.js standalone output (smaller image)
- Static generation where possible
- Image optimization
- Code splitting
- Lazy loading

### Backend
- OPcache enabled
- Composer autoloader optimization
- Route/config/view caching
- Database indexing
- Query optimization

### Infrastructure
- CDN for static assets (configurable)
- Database connection pooling
- Nginx caching headers
- Gzip compression

## 📦 Environment Variables

### Critical Variables
- `APP_KEY`: Laravel encryption key (required)
- `DB_*`: Database credentials
- `NEXT_PUBLIC_API_URL`: Frontend API endpoint

### Optional Variables
- `APP_DEBUG`: Enable debug mode (dev only)
- `LOG_LEVEL`: Logging verbosity
- `CACHE_STORE`: Cache driver
- `QUEUE_CONNECTION`: Queue driver

See `.env.docker.example` for complete list.

## 🔍 Troubleshooting

### Common Issues

**Build Failures**
- Check Dockerfile syntax
- Verify dependencies are available
- Review build logs

**Connection Issues**
- Verify network configuration
- Check environment variables
- Ensure services are healthy

**Performance Issues**
- Enable caching
- Optimize database queries
- Scale resources

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed troubleshooting.

---

## 📚 Additional Resources

- [Deployment Guide](DEPLOYMENT.md)
- [Quick Start](QUICKSTART.md)
- [README](README.md)
- [Laravel Docs](https://laravel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Digital Ocean Docs](https://docs.digitalocean.com/products/app-platform/)

---

**Questions?** Open an issue on [GitHub](https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/issues)
