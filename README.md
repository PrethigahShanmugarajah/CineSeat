Sure! Here's a professional **README.md** for your **CineSeat** project in the same style as your DailyDrop README:

---

# 🎬 CineSeat – Full Stack Movie Ticket Booking App (React + Node + Express + MongoDB)

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey?logo=express)](https://expressjs.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?logo=clerk)](https://clerk.com/)
[![Inngest](https://img.shields.io/badge/Inngest-BackgroundJobs-orange)](https://inngest.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-yellow?logo=stripe)](https://stripe.com/)

**CineSeat** is a **Full Stack Movie Ticket Booking App** built using **React, Node.js, Express, and MongoDB**.
The app allows **users** to browse movies, book tickets, select seats, and manage favorites.
**Admins** can manage movies, shows, bookings, and view analytics.
It integrates **Clerk for authentication**, **Inngest for background jobs**, and **Stripe for payments**.

---

## ✨ Features

### 🍿 User Portal

- Sign up and log in with **Clerk** (Email, Social, Phone number)
- Browse movies and shows
- Book tickets with seat selection
- Make payments via **Stripe** (payment retries handled)
- Add favorite movies
- View booking history
- Real-time notifications via **Inngest**

### 👨‍💼 Admin Portal

- Add, update, and delete movies and shows
- Manage bookings and view all reservations
- Dashboard with analytics (bookings, seats, revenue)
- Send email notifications to users on new movie additions
- Secure **admin authentication**

---

## 🛠️ Technologies Used

### ⚛️ Frontend

- React.js (Vite)
- Tailwind CSS / Custom CSS
- Axios (API communication)
- React Router DOM
- Framer Motion (animations)

### 🧩 Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Clerk (authentication & multi-session profiles)
- Inngest (background jobs & emails)
- Stripe (payment integration)
- dotenv (environment configuration)

---

## ⚙️ How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PrethigahShanmugarajah/CineSeat.git
cd CineSeat
```

---

### 2️⃣ Backend Setup

```bash
cd Server
npm install
npm run server
```

### 3️⃣ Frontend Setup

```bash
cd Client
npm install
npm run dev
```

## 🔑 Environment Variables Setup

### 📂 Backend `.env`

Create a `.env` file inside the **Server/** directory:

```
MONGODB_URI=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
TMDB_API_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SENDER_EMAIL=
SMTP_USER=
SMTP_PASS=
```

### 📂 Frontend `.env`

Create a `.env` file inside the **Client/** directory:

```
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CURRENCY =
VITE_BASE_URL =
VITE_TMBD_IMAGE_BASE_URL =
```

---

## 🧠 References

This project is based on the YouTube tutorial:
**Full Stack Movie Ticket Booking App Using MERN Stack**
[https://youtu.be/Pez37wmUaQM?si=N1o8XC7eMfnrZpM3](https://youtu.be/Pez37wmUaQM?si=N1o8XC7eMfnrZpM3)

---

## 📎 Project Link

[GitHub Repository](https://github.com/PrethigahShanmugarajah/CineSeat.git)

---

## 👨‍💻 Author

**Prethigah Shanmugarajah (2020/2021)**
Department of Software Engineering, Faculty of Computing
Sabaragamuwa University of Sri Lanka

---
