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
if [ -f /var/www/html/.env ]; then\n\
    php artisan config:cache || echo "Config cache skipped"\n\
    php artisan route:cache || echo "Route cache skipped"\n\
    php artisan view:cache || echo "View cache skipped"\n\
fi\n\
echo "Starting nginx..."\n\
service nginx start\n\
echo "Starting PHP-FPM..."\n\
php-fpm' > /start.sh && chmod +x /start.sh

# Expose port 80 for nginx
EXPOSE 80

CMD ["/start.sh"]
