# 🎫 Event Booking Frontend

This is the **frontend** of the Event Booking web application, built using **React.js** and **Tailwind CSS**. It allows users to browse events, book tickets, and view their bookings, while admins can add and manage events.

> 🔗 Paired with: [Event Booking Backend](https://github.com/AnsifMkr/event-booking-backend)

---

## 🌟 Features

- 👤 User Login & JWT Authentication
- 🗓️ Browse All Events
- 📥 Book Events (with available seat count check)
- 📋 My Bookings Page
- 🛠️ Admin Panel: Add New Event with Image, Time & Date

---

## 🛠️ Tech Stack

- **React.js** (Vite/CRA)
- **Tailwind CSS**
- **Axios** (for API calls)
- **JWT** Auth (with localStorage)
- **React Router**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AnsifMkr/event-booking-frontend.git
cd event-booking-frontend
```
### 2.Install dependencies
```bash
npm install
```
### 3.Start the development server
```bash
npm run dev
```
App will be running on http://localhost:5173


---

### 🔐 Authentication
- *Login credentials are stored via JWT in localStorage.*
- *Auth header is automatically included using Axios instance.*
```js
Authorization: Bearer <access_token>
```

---


### Backend API Connection
Make sure to set the correct API base URL inside src/api.js:

```js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // or your deployed backend URL
});

export default API;
```


---


### 🖌️ UI Highlights
- 📱 Responsive design with Tailwind
- ✨ Smooth hover effects and transitions
- 🗂️ Clean card layout for events


---


### 📄 License
This project is licensed under the MIT License.


---

### ✨ Author
Developed by Ansif
