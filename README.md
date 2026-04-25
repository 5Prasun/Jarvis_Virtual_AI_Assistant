🤖 Jarvis – AI Voice Assistant

Jarvis is an interactive AI-powered voice assistant that listens, understands, and executes commands in real time.
It combines Speech Recognition, Natural Language Processing (NLP), and Generative AI (OpenAI + Gemini APIs) to provide intelligent and conversational assistance through a simple web interface.

🚀 Features

🎤 Voice Interaction: Understands and responds to user voice commands using the Web Speech API.

🧠 AI-Powered Responses: Uses OpenAI and Gemini APIs for natural, context-aware replies.

💬 Conversational Interface: Engages in smooth dialogue, not just one-time responses.

⚙️ Task Automation: Executes custom actions (e.g., opening YouTube, searching Google, etc.).

🔐 User Authentication: Sign-up, login, and persistent user sessions with MongoDB.

💾 Command History: Saves and retrieves user commands and responses from the database.

🌐 Full-Stack Integration: React + Node + Express + MongoDB architecture with CORS and secure API handling.

🧩 Project Structure
Jarvis_Virtual_AI_Assistant/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── userController.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   ├── gemini.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── ai.gif
│   │   │   └── user.gif
│   │   ├── components/
│   │   │   └── Home.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── LICENSE

⚙️ Tech Stack
Layer	Technology
Frontend	React.js (Vite), Speech Recognition API, Speech Synthesis API
Backend	Node.js, Express.js
Database	MongoDB (Mongoose)
AI Models	OpenAI GPT API, Google Gemini API
Others	CORS, dotenv, cookie-parser
🔧 Setup Instructions
🖥️ 1. Clone the Repository
git clone https://github.com/5Prasun/Jarvis_Virtual_AI_Assistant.git
cd Jarvis_Virtual_AI_Assistant

⚙️ 2. Backend Setup
cd backend
npm install


Create a .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
PORT=8000


Start the backend server:

npm run dev


✅ Server should run on https://virtual-ai-assistant-backend-re07.onrender.com

💻 3. Frontend Setup
cd ../frontend
npm install
npm run dev


✅ Open the app at the local URL displayed in the terminal https://animated-eclair-2d46b6.netlify.app/

🌍 Deployment

Backend hosted on Render

Frontend hosted on also Render

🧠 How It Works

The user speaks a command — Jarvis converts voice to text via the Web Speech API.

The text is processed by the backend, analyzed by OpenAI / Gemini APIs, and a contextual reply is generated.

The assistant executes simple web commands (like opening apps or websites).

Responses are converted back to voice and played to the user using Speech Synthesis API.

All interactions are saved in MongoDB for personalization and history tracking.

📸 Demo Preview

(Add screenshots or demo GIFs here — e.g., interface, voice interaction, command logs)

📂 GitHub Repository

🔗 Jarvis – AI Voice Assistant

🧑‍💻 Author

Prasun
AI & Full-Stack Developer
📧 prasun57dhn@gmail.com
🌐 https://github.com/5Prasun
