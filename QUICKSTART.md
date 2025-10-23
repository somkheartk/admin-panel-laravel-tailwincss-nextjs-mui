# Quick Start Guide

Get your Admin Panel up and running in minutes!

## 🐳 Docker Compose Deployment

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- 2GB RAM minimum

### Quick Deploy

```bash
# 1. Clone repository
git clone https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui.git
cd admin-panel-laravel-tailwincss-nextjs-mui

# 2. Setup environment
cp .env.docker.example .env

# 3. Generate APP_KEY
docker run --rm -v $(pwd)/backend:/app php:8.3-cli php /app/artisan key:generate --show

# 4. Update .env with the generated APP_KEY

# 5. Deploy with our helper script
chmod +x deploy.sh
./deploy.sh up

# 6. Run migrations
./deploy.sh migrate
```

### Access Your App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:3306

### Useful Commands

```bash
# View logs
./deploy.sh logs

# Check status
./deploy.sh status

# Stop services
./deploy.sh down

# Restart services
./deploy.sh restart

# Production mode
./deploy.sh up prod
```

---

## 🔧 Manual Configuration

### Development Mode

```bash
# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend php artisan migrate --force

# View logs
docker-compose logs -f
```

### Production Mode

```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend php artisan migrate --force
```

---

## 🎯 What's Next?

After deployment:

1. **Access the Dashboard**
   - Open frontend URL
   - Explore the admin interface

2. **Check API Health**
   - Visit: `http://your-backend-url/api/health`
   - Should return: `{"status":"ok"}`

3. **Create Admin User** (Optional)
   ```bash
   docker-compose exec backend php artisan tinker
   ```
   Then:
   ```php
   User::create([
       'name' => 'Admin',
       'email' => 'admin@example.com',
       'password' => Hash::make('your-secure-password')
   ]);
   ```

4. **Monitor Services**
   - Docker: `./deploy.sh status` or `docker-compose ps`

---

## 🆘 Troubleshooting

### Common Issues

**Services won't start?**
- Check: `docker-compose logs`
- Verify: `.env` file exists with `APP_KEY`

**Can't connect to database?**
- Wait 30s for MySQL to initialize
- Check: `docker-compose exec db mysql -u admin_user -p`

**Can't connect to database?**
- Wait 30s for MySQL to initialize
- Check: `docker-compose exec db mysql -u admin_user -p`

**Frontend can't reach backend?**
- Verify `NEXT_PUBLIC_API_URL` in `.env`
- Check backend is running: `curl http://localhost:8000/api/health`

**Need more help?**
- See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide
- Open issue on [GitHub](https://github.com/somkheartk/admin-panel-laravel-tailwincss-nextjs-mui/issues)

---

## 📚 Additional Resources

- [Full Deployment Guide](DEPLOYMENT.md) - Detailed deployment instructions
- [README](README.md) - Project overview and features
- [Docker Hub](https://hub.docker.com/) - Pre-built images (coming soon)

---

**Ready to build something amazing?** 🚀

Made with ❤️ using Laravel + Next.js
