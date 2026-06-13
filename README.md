# 🎓 Excellence LMS - Learning Management System

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A complete full-stack Learning Management System built using MERN Stack.  
It allows instructors to create courses, upload lectures, manage students, and accept online payments.


## 🚀 Features

### 👨‍🎓 Student Features

✔ User Authentication  
✔ Browse Courses  
✔ Purchase Courses  
✔ Razorpay Payment Integration  
✔ Watch Video Lectures  
✔ Track Course Progress  
✔ User Dashboard  
✔ Profile Management  


### 👨‍🏫 Instructor/Admin Features

✔ Admin Dashboard  
✔ Create Courses  
✔ Upload Video Lectures  
✔ Cloudinary Video Storage  
✔ Rich Text Course Editor  
✔ Manage Students  
✔ Sales Analytics


---

## 🛠 Tech Stack


### Frontend

- React JS
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Radix UI
- ShadCN UI
- Axios
- React Player
- Recharts


### Backend

- Node JS
- Express JS
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt Encryption
- Multer
- Cloudinary
- Razorpay


---

# Project Architecture


Frontend

React
 ↓
Redux Toolkit
 ↓
Axios API
 ↓
Express Backend


Backend

Express Server
 ↓
Controllers
 ↓
Models
 ↓
MongoDB


---


# Installation


Clone Repository


git clone https://github.com/username/lms-project.git


Install Frontend


cd client

npm install

npm run dev


Install Backend


cd server

npm install

npm run dev


---


# Environment Variables


Frontend .env


VITE_API_URL=

VITE_RAZORPAY_KEY=



Backend .env


PORT=

MONGO_URI=

JWT_SECRET=

CLOUDINARY_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_SECRET_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_SECRET=


---


# Database Models


## User

- name
- email
- password
- role
- enrolledCourses
- photoUrl


## Course

- title
- subtitle
- description
- category
- level
- price
- thumbnail
- lectures
- creator


## Lecture

- title
- videoUrl
- duration
- publicId



---

# API Endpoints


Authentication

POST /api/user/register

POST /api/user/login

GET /api/user/profile



Courses

POST /api/course/create

GET /api/course

PUT /api/course/update/:id

DELETE /api/course/:id



Payments

POST /api/payment/create-order

POST /api/payment/verify


---


# Future Improvements

- AI Course Recommendation
- Certificate Generator
- Live Classes
- Discussion Forum
- Chat System
- Mobile Application

---


# Developer

Developed By

Ankit Singh

Full Stack MERN Developer
