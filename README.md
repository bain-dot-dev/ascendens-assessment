# Ascendens Laravel Assessment

This repository contains the submission for the Laravel assessment as part of the hiring process with Ascendens. The project includes:

- A new Laravel project built using the latest stable version.
- CRUD functionality for managing **Projects**.
- Custom front-end built with **TailwindCSS**.
- Full **Authentication System** including registration, login, logout, and password reset.
- Well-structured code with comments and best practices in place.

## 📂 Project Features

### ✅ CRUD Functionality
- You can **Create**, **Read**, **Update**, and **Delete** Projects.
- Each project includes:
  - Title
  - Description
  - Status (Active/Inactive)

### 🔐 Authentication
- User Registration
- Login and Logout
- Password Reset via Email
- Protected routes accessible only by authenticated users

### 🎨 UI
- Clean and responsive UI using **TailwindCSS**
- No use of Laravel Breeze, Jetstream, or any boilerplate packages

---

## 🚀 Getting Started

Follow the instructions below to set up and run the project locally.

### 🛠️ Prerequisites

Ensure your environment meets the following requirements:

- PHP >= 8.1
- Composer
- MySQL or compatible database
- Node.js & NPM
- Laravel CLI

---

### 📦 Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/bain-dot-dev/ascendens-assessment.git
   cd ascendens-assessment
   
2. **Install Dependencies**
   composer install
   npm install && npm run build
   
3. **Set Up Environment File**
   cp .env.example .env
   
4. **Configure Environment**
   DB_CONNECTION=your_database_connection
   DB_HOST=your_database_host_name
   DB_PORT=your_database_port
   DB_DATABASE=your_database_name
   DB_USERNAME=your_db_user
   DB_PASSWORD=your_db_password

   MAIL_MAILER=smtp
   MAIL_HOST=your_mail_host
   MAIL_PORT=your_port
   MAIL_USERNAME=your_username
   MAIL_PASSWORD=your_password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your_email@example.com
   MAIL_FROM_NAME="${APP_NAME}"

5. **Generate App Key**
   php artisan key:generate

6. **Run Migrations**
   php artisan migrate

7. **Start the Development Server**
   php artisan serve
   Visit the app at: http://localhost:8000

👥 Default Access
You may register a new user via the registration page to access the protected routes and features.

🧾 License
This project is submitted as part of a coding assessment and is not intended for production use.
