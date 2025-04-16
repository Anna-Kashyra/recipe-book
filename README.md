# Recipe Book

## Project Structure

root/:
- backend/ (Nest.js)
- frontend/ (Next.js)
- README.md

## How to start a project

### 1. Clone the repository

```bash
git clone ...
cd recipe-book
```

### 2. Configure .env files
- frontend/.env
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

- backend/.env
```bash
RECIPE_API_BASE_URL=https://www.themealdb.com/api/json/v1/1
PORT=5000
```


### 3. Dependency settings

```bash
cd ../backend
npm install

cd ../frontend
npm install
```

### 4. Run both services in parallel terminals

```bash
# Frontend
cd frontend
npm run dev
```

```bash
# Backend
cd backend
npm run start:dev
```
