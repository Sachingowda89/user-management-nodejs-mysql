# 👤 User Management System - Node.js + MySQL

This is a simple **User Management Web Application** built using **Node.js**, **Express**, **MySQL**, and **EJS**. The application allows you to **add, view, edit, and update** user details using a web interface.

---

## 📁 Project Structure

```
project/
├── views/              # EJS templates (home.ejs, show.ejs, edit.ejs, new.ejs)
├── index.js            # Main server file
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

## 🛠️ Features

- Display total number of users on the home page
- View all users from the MySQL database
- Add a new user (username, email, password)
- Edit existing username after password verification
- Generate 100+ fake users using Faker.js
- Use of UUIDs for unique user IDs
- Clean UI rendered using EJS templates

---

## 📦 Technologies Used

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Templating Engine**: EJS
- **Other Packages**:
  - `@faker-js/faker` – for generating fake user data
  - `method-override` – to support PATCH/DELETE HTTP methods in HTML forms
  - `uuid` – to generate unique IDs

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-management-nodejs-mysql.git
cd user-management-nodejs-mysql
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure MySQL

Make sure MySQL is running on your system and update the connection details in `index.js`:

```js
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'delta_app',
  password: 'Sachin@123'
});
```

### 4. Create the Database & Table

Run the following SQL commands in your MySQL:

```sql
CREATE DATABASE delta_app;

USE delta_app;

CREATE TABLE user (
  id VARCHAR(100) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100)
);
```

### 5. Start the Server

```bash
node index.js
```

Open your browser and visit: [http://localhost:8080](http://localhost:8080)
---

## 🧪 Sample Routes

| Method | Route             | Description                  |
|--------|------------------|------------------------------|
| GET    | `/`              | Home - Shows user count      |
| GET    | `/user`          | List all users               |
| GET    | `/user/new`      | Form to add a new user       |
| POST   | `/user/new`      | Add a new user to database   |
| GET    | `/user/:id/edit` | Form to edit user (by ID)    |
| PATCH  | `/user/:id`      | Update username with password|

---

## 📚 Future Improvements

- Add user authentication & login/logout
- Implement delete user functionality
- Use dotenv for managing DB credentials
- Add validations and better error handling

---

## 📄 License

This project is licensed under the **ISC License**.
