FROM php:8.3-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    nginx \
    ca-certificates \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Install PHP dependencies with better error handling
RUN composer install --optimize-autoloader --no-dev --prefer-dist --no-interaction || \
    composer install --optimize-autoloader --no-dev --no-interaction

# Create storage directories and set permissions
RUN mkdir -p storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy nginx configuration
COPY nginx.conf /etc/nginx/sites-available/default

# Create startup script
RUN echo '#!/bin/bash\n\
set -e\n\
echo "Starting application..."\n\
\n\
# Check if APP_KEY is set, if not generate one\n\
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then\n\
    echo "APP_KEY not set. Generating a new one..."\n\
    export APP_KEY=$(php artisan key:generate --show)\n\
    echo "Generated APP_KEY: $APP_KEY"\n\
fi\n\
\n\
# Create .env file if it does not exist\n\
if [ ! -f /var/www/html/.env ]; then\n\
    echo "Creating .env file..."\n\
    echo "APP_KEY=$APP_KEY" > /var/www/html/.env\n\
    echo "APP_ENV=${APP_ENV:-production}" >> /var/www/html/.env\n\
    echo "APP_DEBUG=${APP_DEBUG:-false}" >> /var/www/html/.env\n\
    echo "DB_CONNECTION=${DB_CONNECTION:-mysql}" >> /var/www/html/.env\n\
    echo "DB_HOST=${DB_HOST:-db}" >> /var/www/html/.env\n\
    echo "DB_PORT=${DB_PORT:-3306}" >> /var/www/html/.env\n\
    echo "DB_DATABASE=${DB_DATABASE}" >> /var/www/html/.env\n\
    echo "DB_USERNAME=${DB_USERNAME}" >> /var/www/html/.env\n\
    echo "DB_PASSWORD=${DB_PASSWORD}" >> /var/www/html/.env\n\
    echo "LOG_CHANNEL=${LOG_CHANNEL:-stderr}" >> /var/www/html/.env\n\
    echo "SESSION_DRIVER=${SESSION_DRIVER:-database}" >> /var/www/html/.env\n\
    echo "CACHE_STORE=${CACHE_STORE:-database}" >> /var/www/html/.env\n\
fi\n\
\n\
# Wait for database to be ready\n\
echo "Waiting for database to be ready..."\n\
for i in {1..30}; do\n\
    if php artisan db:show 2>/dev/null; then\n\
        echo "Database is ready!"\n\
        break\n\
    fi\n\
    echo "Waiting for database... ($i/30)"\n\
    sleep 2\n\
done\n\
\n\
# Run database migrations\n\
echo "Running database migrations..."\n\
php artisan migrate --force || echo "Migrations failed or already up to date"\n\
\n\
# Cache configuration\n\
echo "Caching configuration..."\n\
php artisan config:cache || echo "Config cache skipped"\n\
php artisan route:cache || echo "Route cache skipped"\n\
php artisan view:cache || echo "View cache skipped"\n\
\n\
echo "Starting nginx..."\n\
service nginx start\n\
echo "Starting PHP-FPM..."\n\
php-fpm' > /start.sh && chmod +x /start.sh

# Expose port 80 for nginx
EXPOSE 80

CMD ["/start.sh"]
