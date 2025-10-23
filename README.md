# Admin Panel - Laravel + Next.js + Tailwind CSS + MUI

A beautiful and modern admin panel built with Laravel backend and Next.js frontend, featuring Material-UI components and Tailwind CSS styling.

![Admin Panel](https://img.shields.io/badge/Stack-Laravel%20%2B%20Next.js-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)

## 🚀 Features

- **Modern Tech Stack**: Laravel 12 + Next.js 16 + TypeScript
- **Beautiful UI**: Material-UI components with Tailwind CSS styling
- **Responsive Design**: Mobile-first approach with responsive sidebar
- **Docker Support**: Full Docker containerization for easy deployment
- **CI/CD Pipeline**: Automated Docker image builds and pushes to Docker Hub
- **API Ready**: RESTful API endpoints with Laravel backend

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

2. Start all services:
```bash
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Database: localhost:3306

### Individual Docker Builds

Build and run Backend:
```bash
cd backend
docker build -t admin-panel-backend .
docker run -p 8000:9000 admin-panel-backend
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