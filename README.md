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
```
Base URL: http://localhost:8000/api
```

### Frontend Setup
```bash
cd leaderboard-frontend

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

### User Management

| Method | Endpoint                      | Description                          | Request Body                                                                 |
|--------|-------------------------------|--------------------------------------|------------------------------------------------------------------------------|
| GET    | `/api/users`                  | Get all users                        | -                                                                           |
| POST   | `/api/users`                  | Create new user                      | `{"name":"string", "age":int, "address":"string"}`                          |
| PATCH  | `/api/users/{id}/points`      | Update user points                   | `{"operation":"increment"}` or `{"operation":"decrement"}`                  |
| DELETE | `/api/users/{id}`             | Delete user                          | -                                                                           |
| GET    | `/api/users/grouped-by-score` | Get users grouped by score           | -                                                                           |

### Winners

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/winners`         | List all historical winners         |
| GET    | `/api/winners/stats`   | Get winner statistics (wins, highscores) |

### Debug Endpoints

| Method | Endpoint                     | Description                          |
|--------|------------------------------|--------------------------------------|
| POST   | `/api/generate-qr/{user_id}` | Manually generate QR code for user  |
| POST   | `/api/jobs/determine-winner` | Manually trigger winner determination |

---

## Example Requests

### Create User
```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Emma", "age":28, "address":"123 Main St"}'




- **Port**: Runs on `http://localhost:3000` by default (Create React App)
- **Proxy**: API requests are forwarded to `http://localhost:8000` (Laravel backend)


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



![Leaderboard](https://i.postimg.cc/VL6fvqc0/Screenshot-2025-03-31-at-7-16-01-PM.png)
