# Admin Panel - NestJS + Next.js + MongoDB + Tailwind CSS + MUI

A beautiful and modern admin panel built with NestJS backend, MongoDB database, and Next.js frontend, featuring Material-UI components and Tailwind CSS styling.

![Admin Panel](https://img.shields.io/badge/Stack-NestJS%20%2B%20MongoDB%20%2B%20Next.js-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-green)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)

## 🚀 Features

- **Modern Tech Stack**: NestJS 11 + MongoDB 8 + Next.js 16 + TypeScript
- **Beautiful UI**: Material-UI components with Tailwind CSS styling
- **Responsive Design**: Mobile-first approach with responsive sidebar
- **Docker Support**: Full Docker containerization for easy deployment
- **CI/CD Pipeline**: Automated Docker image builds and pushes to Docker Hub
- **API Ready**: RESTful API endpoints with NestJS backend
- **Production Ready**: Optimized for production with health checks and monitoring
- **NoSQL Database**: MongoDB with Mongoose ODM for flexible data modeling

## 📋 Use as Template

This repository is configured as a template for easy project creation:

1. Click the "Use this template" button at the top of the repository page
2. Create your new repository
3. Clone and customize for your needs

The repository includes:
- `.github/template.yml` - GitHub template configuration
- Docker Compose configuration for easy deployment

## ⚡ Quick Start

### 🐳 Docker Quick Start (Recommended)

Want to run locally? Check out our [Quick Start Guide](QUICKSTART.md)!

**TL;DR:**
```bash
git clone https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui.git
cd admin-panel-laravel-tailwincss-nextjs-mui
cp .env.docker.example .env
docker-compose up -d
# Backend starts automatically and connects to MongoDB!
```

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)
- MongoDB 8+ (for local development)

## 🏗️ Project Structure

```
.
├── backend/              # NestJS backend API
│   ├── src/
│   │   ├── dashboard/   # Dashboard module
│   │   ├── health/      # Health check module
│   │   └── main.ts
│   └── Dockerfile
├── frontend/             # Next.js frontend
│   ├── app/
│   ├── components/
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── docker-publish.yml
├── docker-compose.yml
└── README.md
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
# Optionally edit .env and add your APP_KEY
# If not provided, APP_KEY will be auto-generated on first startup
```

3. Start all services:
```bash
docker compose up -d
```

4. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MongoDB: localhost:27017

**Note:** The backend container automatically:
- Connects to MongoDB on startup
- No manual migration step needed for NoSQL!

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

### Individual Docker Builds

Build and run Backend:
```bash
cd backend
docker build -t admin-panel-backend .
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://admin:admin_password@db:27017/admin_panel?authSource=admin \
  admin-panel-backend
```

Build and run Frontend:
```bash
cd frontend
docker build -t admin-panel-frontend .
docker run -p 3000:3000 admin-panel-frontend
```

## 💻 Local Development

### Backend Setup (NestJS)

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
```bash
cp .env.example .env
```

4. Configure MongoDB in `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/admin_panel
```

5. Start development server:
```bash
npm run start:dev
```

The backend API will be available at http://localhost:3001

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
NEXT_PUBLIC_API_URL=http://localhost:3001/api
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
- **Framework**: NestJS 11
- **Database**: MongoDB 8.0
- **ODM**: Mongoose
- **Language**: TypeScript

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
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin_password@db:27017/admin_panel?authSource=admin
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 📝 API Endpoints

- `GET /api/health` - Health check endpoint
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

- NestJS Framework
- MongoDB
- Next.js Team
- Material-UI
- Tailwind CSS
- All contributors

---

Made with ❤️ using NestJS, MongoDB, Next.js, Tailwind CSS, and Material-UI