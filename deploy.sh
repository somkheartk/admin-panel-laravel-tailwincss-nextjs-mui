#!/bin/bash

# Admin Panel Deployment Script
# This script helps deploy the application using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check for .env file
if [ ! -f .env ]; then
    print_warn ".env file not found!"
    if [ -f .env.docker.example ]; then
        print_info "Copying .env.docker.example to .env"
        cp .env.docker.example .env
        print_warn "Please edit .env file and add your APP_KEY"
        print_info "Generate APP_KEY with: docker run --rm -v \$(pwd)/backend:/app composer/composer require laravel/framework && docker run --rm -v \$(pwd)/backend:/app php:8.3-cli php /app/artisan key:generate --show"
        exit 1
    else
        print_error ".env.docker.example not found!"
        exit 1
    fi
fi

# Check if APP_KEY is set
if ! grep -q "APP_KEY=base64:" .env; then
    print_error "APP_KEY is not set in .env file!"
    print_info "Generate APP_KEY with: docker run --rm -v \$(pwd)/backend:/app php:8.3-cli php /app/artisan key:generate --show"
    exit 1
fi

# Parse command
COMMAND=${1:-up}
ENV=${2:-dev}

case $COMMAND in
    up)
        print_info "Starting services in $ENV mode..."
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml up -d
        else
            docker-compose up -d
        fi
        print_info "Services started successfully!"
        print_info "Frontend: http://localhost:${FRONTEND_PORT:-3000}"
        print_info "Backend: http://localhost:${BACKEND_PORT:-8000}"
        ;;
    down)
        print_info "Stopping services..."
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml down
        else
            docker-compose down
        fi
        print_info "Services stopped successfully!"
        ;;
    restart)
        print_info "Restarting services..."
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml restart
        else
            docker-compose restart
        fi
        print_info "Services restarted successfully!"
        ;;
    build)
        print_info "Building images..."
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml build --no-cache
        else
            docker-compose build --no-cache
        fi
        print_info "Images built successfully!"
        ;;
    logs)
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml logs -f
        else
            docker-compose logs -f
        fi
        ;;
    migrate)
        print_info "Running database migrations..."
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml exec backend php artisan migrate --force
        else
            docker-compose exec backend php artisan migrate --force
        fi
        print_info "Migrations completed successfully!"
        ;;
    status)
        print_info "Service status:"
        if [ "$ENV" = "prod" ]; then
            docker-compose -f docker-compose.prod.yml ps
        else
            docker-compose ps
        fi
        ;;
    *)
        echo "Usage: $0 {up|down|restart|build|logs|migrate|status} [dev|prod]"
        echo ""
        echo "Commands:"
        echo "  up       - Start all services"
        echo "  down     - Stop all services"
        echo "  restart  - Restart all services"
        echo "  build    - Rebuild Docker images"
        echo "  logs     - View service logs"
        echo "  migrate  - Run database migrations"
        echo "  status   - Show service status"
        echo ""
        echo "Environment:"
        echo "  dev      - Development mode (default)"
        echo "  prod     - Production mode"
        exit 1
        ;;
esac
