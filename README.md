# 🏥 Clinikk 

A full-stack healthcare media-sharing platform inspired by Clinikk, providing features like user authentication, media posting, video viewing, and liking functionality.

---

### 🚀 Features

- User Registration and Login (JWT & Cookie Auth)
- Secure Media Upload and Viewing
- Like/Unlike Media (toggle with count)
- Protected Routes using Auth
- Responsive and user-friendly UI
- Deployed on Render (Frontend & Backend)

---

### 🛠 Tech Stack

#### Frontend:
- React.js
- React Router DOM
- CSS Modules / Custom CSS

#### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Cookies for session management

---

### 🔐 Authentication

- On login, a JWT is issued and stored as a cookie (`HttpOnly` and `Secure` for production).
- For media routes, `Authorization: Bearer <token>` is used on secure fetch requests.
- Session persists unless manually logged out or cookie expires.

---

### 📁 Project Structure (Frontend)

`client``
src/
│
├── components/
│   └── Layout.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── VideoPage.jsx
│   └── Createpost.jsx
├── styles/
│   └── *.css
├── App.jsx
└── index.js
```

---

### ⚙️ Environment Variables

Create a `.env` file in both frontend and backend:

#### `.env` (Frontend)

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

#### `.env` (Backend)

```
URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.onrender.com
```

---

### 📦 Installation

#### Frontend

```bash
cd client
npm install
npm start
```

#### Backend

```bash
npm install
npm run dev
```

---

### 🌐 Live Demo

- **Frontend**: [https://health-care-website-frontend.onrender.com](https://health-care-website-frontend.onrender.com)
- **Backend**: Hosted on Render (auto-sleep delay expected)

---

### 📸 Screenshots

> Add screenshots here showing login, media list, video playback, and like feature.

---

### 🧪 Testing Tips

- Clear cookies/localStorage to test fresh sessions.
- Use browser dev tools → "Application" → "Cookies" to inspect JWT storage.

---

### 📍 Known Issues

- Render free tier can take 20–30s to spin up backend after inactivity.

---

### 🙌 Contributions

Feel free to fork, raise issues, or submit PRs to improve the platform!

