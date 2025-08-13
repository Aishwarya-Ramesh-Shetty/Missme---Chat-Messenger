# 💌 Missme — Because Every Message Matters

[![Watch the video](https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg)](https://youtu.be/v1FAaUxF0kg?si=Tb-2s2bW4reGyDKE)


**Missme** is a MERN stack chat application with real-time messaging using **Socket.io**.  
It allows users to sign up, log in, send and receive instant messages, and share files.  
Messages are stored in MongoDB so that conversations remain available even after users go offline.

---

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/1ee093e5-c445-49be-b362-66abff2c1949" />
<img width="1364" height="685" alt="image" src="https://github.com/user-attachments/assets/81116939-a94c-4315-a5ba-928c153a4def" />
<img width="1363" height="685" alt="image" src="https://github.com/user-attachments/assets/53b04d86-cb25-486e-bb7e-046cce6d0f98" />



## 🎯 Why Missme?
- **Real-time Feels** — Messages appear instantly. No more “seen after 2 hours” drama.
- **Always Connected** — Works across devices like magic.
- **Share Everything** — Send images, files, or that *funny cat gif* you just found.
- **Sleek & Simple** — Clean UI, built with love (and Tailwind CSS 💙).
- **Safe & Secure** — Your chats stay private, always.

---
## ✨ Features
- 💬 **Real-time Messaging** – Powered by Socket.io for instant updates  
- 📁 **File Sharing** – Send images, videos, and documents easily  
- 🔐 **User Authentication** – Secure login/signup with JWT  
- 📜 **Chat History** – Messages are stored and accessible anytime  
- 🌐 **Responsive UI** – Works on desktop and mobile  

## 🛠️ Techy Stuff
| Frontend | Backend | Real-time | Styling | Deployment |
|----------|---------|-----------|---------|------------|
| React.js | Node.js | Socket.io | Tailwind | Vercel     |
| Vite     | Express |           |         | Render     |
|          | MongoDB |           |         |            |

---

## 📦 Installation

```bash
# 1️⃣ Clone the repo
git clone https://github.com/Aishwarya-Ramesh-Shetty/Missme---Chat-Messenger.git
cd Missme

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
# Create a .env file in the root directory:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

# 4️⃣ Run the application
npm run dev
