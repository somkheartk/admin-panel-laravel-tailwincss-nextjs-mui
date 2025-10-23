# Admin Panel - Laravel + Next.js + Tailwind CSS + MUI

A beautiful and modern admin panel built with Laravel backend and Next.js frontend, featuring Material-UI components and Tailwind CSS styling.

![Admin Panel](https://img.shields.io/badge/Stack-Laravel%20%2B%20Next.js-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/tree/main)

## 🚀 Features

- **Modern Tech Stack**: Laravel 12 + Next.js 16 + TypeScript
- **Beautiful UI**: Material-UI components with Tailwind CSS styling
- **Responsive Design**: Mobile-first approach with responsive sidebar
- **Docker Support**: Full Docker containerization for easy deployment
- **Digital Ocean Ready**: One-click deployment to Digital Ocean App Platform
- **CI/CD Pipeline**: Automated Docker image builds and pushes to Docker Hub
- **API Ready**: RESTful API endpoints with Laravel backend
- **Production Ready**: Optimized for production with health checks and monitoring

## ⚡ Quick Start

### 🌊 Deploy to Digital Ocean (Recommended)

Deploy in minutes with Digital Ocean App Platform:

1. Click the "Deploy to DigitalOcean" button above
2. Select your GitHub repository: `somkheartk/admin-panel-laravel-tailwincss-nextjs-mui`
3. Branch: `main`
4. Digital Ocean will automatically detect components using the `.do/app.yaml` spec
5. Add your `APP_KEY` secret (generate with: `php artisan key:generate --show`)
6. Click "Deploy"

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### 🐳 Docker Quick Start

Want to run locally? Check out our [Quick Start Guide](QUICKSTART.md)!

**TL;DR:**
```bash
git clone https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui.git
cd admin-panel-laravel-tailwincss-nextjs-mui
cp .env.docker.example .env
# Add APP_KEY to .env
./deploy.sh up && ./deploy.sh migrate
```

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- PHP 8.3+ (for local development)
- Composer (for local development)

## 🏗️ Project Structure

```
.
├── backend/              # Laravel backend API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── Dockerfile
├── frontend/             # Next.js frontend
│   ├── app/
│   ├── components/
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── docker-publish.yml
├── docker-compose.yml
└── nginx.conf
```

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. Clone the repository:
```bash
git clone https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui.git
cd admin-panel-laravel-tailwincss-nextjs-mui
```

2. Configure environment:
```bash
cp .env.docker.example .env
# Edit .env and add your APP_KEY (generate with: php artisan key:generate --show)
```

3. Start all services:
```bash
docker-compose up -d
```

4. Run database migrations:
```bash
docker-compose exec backend php artisan migrate --force
```

5. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:3306

### Digital Ocean Deployment

Deploy the entire stack on Digital Ocean App Platform with a single click!

1. **Prerequisites:**
   - Digital Ocean account
   - GitHub repository connected

2. **Deploy Steps:**
   - Use the app spec at `.do/app.yaml`
   - Or follow detailed instructions in [DEPLOYMENT.md](DEPLOYMENT.md)

3. **Features:**
   - ✅ Automatic deployments from `main` branch
   - ✅ Managed MySQL database
   - ✅ Auto-scaling capabilities
   - ✅ Built-in SSL/TLS certificates
   - ✅ Health checks and monitoring

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

### Individual Docker Builds

Build and run Backend:
```bash
cd backend
docker build -t admin-panel-backend .
docker run -p 8000:80 admin-panel-backend
```

Build and run Frontend:
```bash
cd frontend
docker build -t admin-panel-frontend .
docker run -p 3000:3000 admin-panel-frontend
```

## 💻 Local Development

### Backend Setup (Laravel)

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Set up environment:
```bash
cp .env.example .env
php artisan key:generate
```

4. Configure database in `.env` file

5. Run migrations:
```bash
php artisan migrate
```

6. Start development server:
```bash
php artisan serve
```

### Frontend Setup (Next.js)

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 🔄 CI/CD Pipeline

The project includes a GitHub Actions workflow that automatically:

1. Builds Docker images for both backend and frontend
2. Pushes images to Docker Hub when code is merged to `main` branch
3. Tags images with branch name and `latest` tag

### Setup GitHub Secrets

Add these secrets to your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password or access token

## 🎨 Tech Stack

### Backend
- **Framework**: Laravel 12
- **Database**: MySQL 8.0
- **Server**: PHP-FPM + Nginx

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Material-UI (MUI)
- **Icons**: Material Icons

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub

## 📱 Features Overview

### Dashboard
- Overview statistics cards
- Recent orders table
- Responsive design
- Beautiful gradients and animations

### Navigation
- Collapsible sidebar
- Mobile-friendly menu
- Icon-based navigation
- User profile section

### Pages (To be implemented)
- Users management
- Products catalog
- Orders tracking
- Analytics & reports
- Settings

## 🔐 Environment Variables

### Backend (.env)
```env
APP_NAME=AdminPanel
APP_ENV=production
APP_KEY=base64:...
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=admin_panel
DB_USERNAME=admin_user
DB_PASSWORD=admin_password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 📝 API Endpoints

- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/orders` - Get recent orders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- **Somkheartk** - [GitHub Profile](https://github.com/somkheartk)

## 🙏 Acknowledgments

- Laravel Framework
- Next.js Team
- Material-UI
- Tailwind CSS
- All contributors

---

Made with ❤️ using Laravel, Next.js, Tailwind CSS, and Material-UI