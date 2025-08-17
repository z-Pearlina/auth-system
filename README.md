# MERN-Stack Authentication System

A modern, secure, and full-featured user authentication system built with the MERN stack and styled with Tailwind CSS. Designed to be a robust starting point for any web application.


---

### ✨ Key Features

-   🔐 **Secure JWT Authentication** with `httpOnly` cookies.
-   🚀 **Full User Lifecycle:** Sign Up, Email Verification, Login, and Password Reset.
-   🛡️ **Protected Frontend Routes** for authenticated users.
-   🎨 **Modern UI** designed with Tailwind CSS and smooth animations via Framer Motion.
-   ⚡ **Efficient Global State** managed cleanly with Zustand.

---

### 🛠️ Tech Stack & Tools

**Frontend:**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white)

**Backend & Database:**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

### 🚀 Local Setup & Installation

Follow these steps to get the project running on your local machine.

#### 1. Prerequisites
-   Node.js (v18 or later)
-   npm or yarn
-   A MongoDB Atlas connection string (or a local MongoDB instance).

#### 2. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Environment Configuration
> Create a `.env` file in the `backend` directory. This file holds sensitive credentials and should **never** be committed to Git.

Fill in your `.env` file with the following:
```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_URI
JWT_SECRET=YOUR_SUPER_SECRET_KEY

# Your Gmail credentials for sending emails
# Note: You may need to create an "App Password" for this
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password```

#### 4. Run The Application
> You need two separate terminals to run both the client and the server.

-   **Run Backend Server:** (from the `backend` directory)
    ```bash
    npm run dev
    ```

-   **Run Frontend Server:** (from the `frontend` directory)
    ```bash
    npm run dev
    ```
The application will be available at `http://localhost:5173`.

