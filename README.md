# Leaderboard Application

A full-stack leaderboard application with Laravel backend and React frontend.

## Features
- User management (add/edit/delete)
- Point tracking system
- Automatic winner determination
- QR code generation
- Real-time leaderboard updates

## Prerequisites
- PHP 8.0+
- Composer
- Node.js 14+
- MySQL
- Redis (optional for queues)

## Installation

### Backend Setup
```bash
# Clone repository
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-app

# Install dependencies
composer install

# Create environment file
cp .env.example .env

# Generate app key
php artisan key:generate

# Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=leaderboard
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php artisan migrate --seed

# Start development server
php artisan serve
```

### Frontend Setup
```bash
cd resources/js

# Install dependencies
npm install

# Start development server
npm run dev
```

### Queue Worker (for jobs)
```bash
php artisan queue:work
```

### Scheduler Setup
Add to crontab:
```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```

## API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | List all users |
| `/api/winners` | GET | List all winners |
| `/api/users/{id}/points` | PATCH | Update user points |

## Testing
```bash
php artisan test
```

## Deployment
For production deployment:
1. Set up a web server (Nginx/Apache)
2. Configure `.env` for production
3. Run:
```bash
npm run build
php artisan optimize
```

## Troubleshooting
- If jobs aren't running: `php artisan queue:work`
- If scheduler fails: check cron service status
- If QR codes fail: check storage permissions
