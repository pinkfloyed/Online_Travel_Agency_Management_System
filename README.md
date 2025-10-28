# 🌍 Online_Travel_Agency_Management_System — Full-Stack Travel Management System

**TravelTales** is a comprehensive travel and tour management platform built with **React + TypeScript (frontend)** and **ASP.NET Core Web API + MySQL (backend)**.  
It supports **JWT authentication**, **role-based access control**, and **full CRUD functionality** for destinations, packages, bookings, reviews, and payments.  

The system features **Admin** and **Customer** roles with distinct access levels, allowing seamless management of the entire travel booking and review experience.

---

## 🚀 Features

### 👑 Admin Features
- **Dashboard Overview** — view total destinations, packages, bookings, reviews, and payments.  
- **Destination Management (CRUD)** — add, edit, delete, and view destinations.  
- **Package Management (CRUD)** — create, update, and remove travel packages.  
- **Booking Management** — view all bookings, and change status (`Pending`, `Confirmed`, `Cancelled`).  
- **Payment Management** — update payment statuses (`Paid`, `Unpaid`, `Failed`).  
- **Review Management** — view and manage all customer reviews.  
- **User Management** — view all registered users and manage their information.  
- **Profile & Settings** — view profile and update personal information.  
- **JWT Authentication + Authorization** — secure admin-only routes.

### 👤 Customer Features
- **View Destinations & Packages** — browse available travel options.  
- **Create Bookings** — book desired packages.  
- **Manage Own Bookings** — view and cancel personal bookings.  
- **Make Payments** — complete and view payments.  
- **Add & View Reviews** — share travel experiences.  
- **Profile & Settings** — manage account details.  
- **JWT Authentication** — login, register, and logout securely.


## 🔐 Authentication & Authorization

- **JWT Authentication** — each login generates a secure JWT access token and refresh token.  
- **Role-Based Access Control (RBAC)** —  
  - Admins can access and manage all entities.  
  - Customers can only view and modify their own records.  
- **Protected API routes** ensure that unauthorized users cannot access admin resources.  
- **Token validation middleware** in backend for verifying requests.  

---

## 🧱 Folder Structure

```text
ONLINE_TRAVEL_AGENCY_MANAGEMENT_SYSTEM/
│
├── otams-frontend/                 # React + TypeScript frontend
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── api/                    # API service functions
│   │   ├── components/             # Reusable UI components
│   │   ├── context/                # Auth and global context
│   │   ├── pages/                  # Main pages (Home, About, Destinations, etc.)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
└── server/                         # ASP.NET Core backend
    ├── Controllers/                # API controllers
    ├── Data/                       # Database context
    ├── DTOs/                       # Data transfer objects
    ├── Migrations/                 # EF Core migrations
    ├── Models/                     # Entity models
    ├── Security/                   # JWT & role-based security
    ├── Services/                   # Business logic
    ├── appsettings.json
    ├── Otams.Api.csproj
    └── Program.cs
```

---

## 🛠️ Technologies Used

### 🖥️ Frontend
- ⚛️ **React 19 (Vite + TypeScript)**
- 💨 **Tailwind CSS**
- 🔗 **React Router DOM**
- 🔐 **JWT Authentication**
- 🌐 **Axios** (for API requests)

### 🧩 Backend
- 🧱 **ASP.NET Core 8 Web API**
- 🗄️ **Entity Framework Core (Code-First)**
- 🪪 **JWT Authentication**
- 👮 **Role-Based Authorization**
- 💽 **SQL Server / XAMPP (MySQL optional)**
- 🔄 **RESTful API architecture**

---

## ⚙️ Installation & Setup

### 🧱 Prerequisites
Ensure you have the following installed:
- **Node.js** >= 18  
- **.NET 8 SDK**  
- **SQL Server** or **MySQL (via XAMPP)**  
- **Visual Studio / VS Code**

---

### 🖥️ Backend Setup

```bash
cd server
dotnet restore
dotnet ef database update
dotnet run
```
The API will start at:

🔗 http://localhost:5255

### 💻 Frontend Setup

```bash
cd otams-frontend
npm install
npm run dev
```
The app will run at:
🌐 http://localhost:5173

---

### 🔑 Authentication & Authorization

- JWT-based authentication for secure API access.
- Roles:
  - 🧑‍💼 Admin: Full CRUD access
  - 👤 Customer: Restricted to personal data and read-only operations

---

## 📡 API Endpoints

### 🧑‍💼 Admin
| Method | Endpoint                | Description                         |
| ------ | ----------------------- | ----------------------------------- |
| GET    | `/api/Admin/users`      | Get all users (Admin only)          |
| DELETE | `/api/Admin/users/{id}` | Delete a specific user (Admin only) |

### 🔐 Auth

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| POST   | `/api/Auth/register`        | Register a new user          |
| POST   | `/api/Auth/login`           | User login and get JWT token |
| POST   | `/api/Auth/forgot-password` | Request password reset       |
| POST   | `/api/Auth/reset-password`  | Reset user password          |
| GET    | `/api/Auth/profile`         | Get logged-in user profile   |
| PUT    | `/api/Auth/profile`         | Update user profile          |
| GET    | `/api/Auth/users`           | Get all users (Admin)        |

### 🧾 Bookings

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| GET    | `/api/Bookings`      | Get all bookings (Admin only)       |
| GET    | `/api/Bookings/my`   | Get bookings for logged-in customer |
| GET    | `/api/Bookings/{id}` | Get booking by ID                   |
| POST   | `/api/Bookings`      | Create a new booking                |
| PUT    | `/api/Bookings/{id}` | Update a booking (Admin only)       |
| DELETE | `/api/Bookings/{id}` | Delete a booking (Admin only)       |

### 📊 Dashboard

| Method | Endpoint         | Description                           |
| ------ | ---------------- | ------------------------------------- |
| GET    | `/api/Dashboard` | Get dashboard statistics (Admin only) |


### 🌍 Destinations

| Method | Endpoint                 | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | `/api/Destinations`      | Get all destinations               |
| GET    | `/api/Destinations/{id}` | Get destination by ID              |
| POST   | `/api/Destinations`      | Add a new destination (Admin only) |
| PUT    | `/api/Destinations/{id}` | Update a destination (Admin only)  |
| DELETE | `/api/Destinations/{id}` | Delete a destination (Admin only)  |

### 📦 Packages

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| GET    | `/api/Packages`      | Get all travel packages             |
| GET    | `/api/Packages/{id}` | Get package by ID                   |
| POST   | `/api/Packages`      | Create new package (Admin only)     |
| PUT    | `/api/Packages/{id}` | Update package details (Admin only) |
| DELETE | `/api/Packages/{id}` | Delete a package (Admin only)       |


### 💳 Payments

| Method | Endpoint                             | Description                   |
| ------ | ------------------------------------ | ----------------------------- |
| GET    | `/api/Payments`                      | Get all payments (Admin only) |
| GET    | `/api/Payments/booking/{id}`         | Get payment by booking ID     |
| POST   | `/api/Payments`                      | Make a new payment            |
| POST   | `/api/Payments/booking/{id}/payment` | Process payment for booking   |

### 💬 Reviews

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| GET    | `/api/Reviews`              | Get all reviews           |
| GET    | `/api/Reviews/{id}`         | Get review by ID          |
| GET    | `/api/Reviews/package/{id}` | Get reviews by package ID |
| POST   | `/api/Reviews`              | Add a new review          |


---

## 🖼️ Screenshots






---


## 📜 License
- This project is licensed under the Apache-2.0 license


---

## 👩‍💻 Author

**Pinki Akter**

---

## 🌟 Future Enhancements

- 📧 Email notifications for bookings and payments
- 💳 Stripe or SSLCommerz payment gateway integration
- 📊 Advanced analytics in admin dashboard
- 🧠 AI-based travel package recommendations
- 🌐 Multi-language support

---



