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

Figure 1: Home Page Display
<img width="1365" height="609" alt="home1" src="https://github.com/user-attachments/assets/15b8be27-d780-425b-84e5-e7f558ad3d1d" /> <img width="1365" height="612" alt="home3" src="https://github.com/user-attachments/assets/d15df570-b765-4ab3-8007-e43a644f54f0" /> <img width="1365" height="612" alt="home2" src="https://github.com/user-attachments/assets/bfdd2d2c-b54a-412d-acb3-8ae06ff27ad1" />

Figure 2: About Page Display
<img width="1365" height="551" alt="about" src="https://github.com/user-attachments/assets/1380cd16-8aa5-4282-91a4-93a33a0908f7" />

Figure 3: Registration Page
<img width="1365" height="610" alt="register" src="https://github.com/user-attachments/assets/8cb29d9a-65f4-4674-92d8-10f3ac1d93ef" />

Figure 4: Login Page
<img width="1365" height="616" alt="login" src="https://github.com/user-attachments/assets/906344fa-1642-41b0-82d6-f4748a35624b" />

Figure 5: Admin Profile Information
<img width="1050" height="471" alt="adminprofile" src="https://github.com/user-attachments/assets/253158b0-fa42-4785-b32e-a9439e403a8c" />

Figure 6: Admin Settings Page
<img width="1055" height="470" alt="adminsettings" src="https://github.com/user-attachments/assets/ec280687-4075-401b-9166-b3f01cac1bc9" />

Figure 7: Admin – User Management
<img width="1051" height="415" alt="adminusers" src="https://github.com/user-attachments/assets/e7bf5e72-080f-4376-a545-d082beb4fe81" />

Figure 8: Admin – Destination Page
<img width="1365" height="607" alt="admindest" src="https://github.com/user-attachments/assets/91ebd101-da80-4da6-8aef-99e73847903a" />

Figure 9: Admin – Create Destination
<img width="664" height="609" alt="createdest" src="https://github.com/user-attachments/assets/4b04f005-1d91-413e-9d6a-e518d6893daa" />

Figure 10: Admin – Edit Destination
<img width="520" height="538" alt="editdest" src="https://github.com/user-attachments/assets/b15bc680-1ddc-4d4e-ac1c-afdd0c03d873" />

Figure 11: User – View Destination Details
<img width="814" height="417" alt="viewdest" src="https://github.com/user-attachments/assets/e4fca468-be5c-49c9-8058-ac97f6156982" />

Figure 12: Destination Page (All Users)
<img width="1365" height="611" alt="desthome" src="https://github.com/user-attachments/assets/f052f97f-fc4f-45d5-bd64-05cc44e2ab71" />

Figure 13: Admin – Package Management Page
<img width="1365" height="608" alt="adminpackage" src="https://github.com/user-attachments/assets/8f08f555-bb09-40fa-a25d-6444e41401f4" />

Figure 14: Admin – Create Package
<img width="718" height="607" alt="createpackage" src="https://github.com/user-attachments/assets/2953b59c-49be-4cf7-aaa3-118eb0220252" />

Figure 15: User – View Package Details
<img width="807" height="524" alt="viewpackage" src="https://github.com/user-attachments/assets/f7b6ff78-e90c-461d-9b35-132f4c1c118f" />

Figure 16: Admin – Booking Management
<img width="1365" height="579" alt="adminbookings" src="https://github.com/user-attachments/assets/6eb1501a-d4a4-467d-b93e-5741ee51bc9f" />

Figure 17: Admin – Payment Management
<img width="1365" height="515" alt="adminpayments" src="https://github.com/user-attachments/assets/a917dcb0-1f9e-44bd-8fa3-d0e05d2ad074" />

Figure 18: Admin Dashboard
<img width="1365" height="608" alt="dashboard" src="https://github.com/user-attachments/assets/bc20851b-6a88-416c-bb93-10fccd41e7d5" />

Figure 19: Customer – Create Booking
<img width="400" height="435" alt="custeditbooking" src="https://github.com/user-attachments/assets/3c36218d-d716-48e2-981c-eb9d533a9046" />

Figure 20: Customer – View Own Bookings
<img width="1056" height="465" alt="customerbookings" src="https://github.com/user-attachments/assets/0429356f-91ec-4814-8355-2c1e76c19a70" />

Figure 21: Customer – Edit Booking
<img width="400" height="435" alt="custeditbooking" src="https://github.com/user-attachments/assets/e6437467-276c-49c4-a786-2d0e58c48e8a" />

Figure 22: Customer – Create Payment
<img width="1365" height="449" alt="createpayment" src="https://github.com/user-attachments/assets/4a12a044-fddf-4c75-a579-5688301a0c2d" />

Figure 23: Customer – View Own Payments
<img width="779" height="599" alt="viewpayments" src="https://github.com/user-attachments/assets/297eeed6-632d-4311-a886-59b31b21dccd" />

Figure 24: Customer – Add Review for Package
<img width="1365" height="337" alt="customerview" src="https://github.com/user-attachments/assets/27325540-3d56-4519-93cb-6a96fb186038" />

Figure 25: Admin – View All Reviews
<img width="1365" height="498" alt="reviewslist" src="https://github.com/user-attachments/assets/3592671a-636f-46b1-b3ed-36b2e1327f4d" />

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



