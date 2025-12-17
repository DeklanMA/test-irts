---

# 🛒 IRTS E-Commerce

Fullstack E-Commerce Application
**Backend:** Golang (Gin, GORM, JWT)
**Frontend:** React + Vite + TypeScript + Shadcn UI

---

## ✨ Features

### 👤 Authentication

* Register & Login (JWT)
* Role: `admin` & `customer`
* Profile & Update Profile

### 🛍️ Product

* Product listing (pagination)
* Product detail
* Admin CRUD Product
* Favorite product
* Cart 

### 👨‍💼 Admin Panel

* CRUD Products
* CRUD Users
* Pagination
* Validation & error handling

---

## 🧱 Tech Stack

### Backend

* Go (Gin)
* GORM
* PostgreSQL / SQLite
* JWT Authentication
* Cloudflare Tunnel (optional)

### Frontend

* React + Vite
* TypeScript
* Shadcn UI
* Axios
* React Router
* Context API

---

## 📂 Project Structure

```text
irts-ecommerce/
├── backend/
│   ├── cmd/server/main.go
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── dto/
│   ├── config/
│   ├── seeders/
│   ├── utils/
│   ├── data/
│   ├── .env.example
│   └── go.mod
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# 🚀 Backend Setup (Golang)

## 1️⃣ Masuk ke folder backend

```bash
cd backend
```

## 2️⃣ Copy environment file

```bash
cp .env.example .env
```

## 3️⃣ Edit `.env`

```env
APP_PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=irts_ecommerce
JWT_SECRET=super-secret-key
```

> Bisa pakai SQLite kalau mau (sesuaikan config DB)

---

## 4️⃣ Install dependencies

```bash
go mod tidy
```

---

## 5️⃣ Run server

```bash
go run cmd/server/main.go
```

Server jalan di:

```
http://localhost:8080
```

---

## 🌱 Seeder

* **Product seeder otomatis** dari CSV
* **Admin user seeder (jika ada)** hanya jalan kalau belum ada admin

---

## 🔑 Default Admin Account (Seeder)

```text
Email: admin@admin.com
Password: admin123
Role: admin
```

---

# 🎨 Frontend Setup (React)

## 1️⃣ Masuk ke folder frontend

```bash
cd frontend
```

## 2️⃣ Install dependencies

```bash
npm install
```

---

## 3️⃣ Jalankan frontend

```bash
npm run dev
```

Frontend jalan di:

```
http://localhost:5173
```

---

## 🌐 API Configuration (Frontend)

Pastikan Axios baseURL:

```ts
// src/api/axios.ts
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

export default api
```

---

# 🔐 Authentication Flow

1. Login → dapat JWT
2. Token disimpan di `localStorage`
3. Token dikirim via header:

```http
Authorization: Bearer <token>
```

---

# 🧪 API Example

### Login

```http
POST /api/login
```

```json
{
  "email": "admin@irts.com",
  "password": "admin123"
}
```

---

### Get Products

```http
GET /api/products?page=1&limit=10
```

---

### Admin Create Product

```http
POST /api/admin/products
Authorization: Bearer <admin_token>
```

---

# 🌍 Expose Backend 

Menggunakan Cloudflare Tunnel:

```bash
cloudflared tunnel --url http://localhost:8080
```

---

# 📦 Build (Production)

### Frontend

```bash
npm run build
```

### Backend

```bash
go build -o app cmd/server/main.go
```

---

# ❌ Files Ignored

* `.env`
* binary Go
* database lokal
* cloudflared cert

(Lihat `.gitignore`)


