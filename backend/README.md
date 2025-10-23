# Admin Panel Backend - NestJS + MongoDB

A modern, scalable backend API built with NestJS and MongoDB.

## 🚀 Features

- **Framework**: NestJS 11
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **API**: RESTful endpoints
- **Validation**: Class-validator for input validation
- **Configuration**: Environment-based configuration with @nestjs/config
- **Docker**: Production-ready containerization

## 📋 Prerequisites

- Node.js 20+
- MongoDB 8.0+
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your `.env` file:
```env
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/admin_panel
FRONTEND_URL=http://localhost:3000
```

## 💻 Development

Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

## 🏗️ Building

Build for production:
```bash
npm run build
```

## 🚀 Production

Start the production server:
```bash
npm run start:prod
```

## 🐳 Docker

Build the Docker image:
```bash
docker build -t admin-panel-backend .
```

Run the container:
```bash
docker run -p 3001:3001 \
  -e MONGODB_URI=mongodb://your-mongodb-host:27017/admin_panel \
  admin-panel-backend
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Health check endpoint

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/orders` - Get recent orders

## 🧪 Testing

Run unit tests:
```bash
npm run test
```

Run e2e tests:
```bash
npm run test:e2e
```

Run test coverage:
```bash
npm run test:cov
```

## 📁 Project Structure

```
src/
├── dashboard/           # Dashboard module
│   ├── dashboard.controller.ts
│   ├── dashboard.service.ts
│   └── dashboard.module.ts
├── health/             # Health check module
│   ├── health.controller.ts
│   └── health.module.ts
├── app.module.ts       # Root module
└── main.ts            # Application entry point
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/admin_panel` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

## 📝 License

MIT
