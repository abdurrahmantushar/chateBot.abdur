XorelAI — AI Chat Application
XorelAI is a modern, responsive AI chat application built with React, Vite, and Tailwind CSS. It provides a clean and user-friendly interface for interacting with an AI assistant, managing conversations, and viewing formatted AI responses.

✨ Features
AI-Powered Chat — Send messages and receive AI-generated responses through an API.
Interactive Chat Input — Write and send messages using a responsive chat input interface.
Keyboard Shortcuts — Press Enter to send a message and Shift+Enter to create a new line.
Chat History — Save and revisit previous conversations using browser local storage.
Conversation Management — Create new chats and manage existing conversations.
Markdown Support — Display formatted text, headings, lists, links, tables, and other Markdown content in AI responses.
Code Syntax Highlighting — Display code snippets with syntax highlighting for improved readability.
Copy Code — Copy code snippets directly from AI responses.
Dark Mode — Switch between light and dark themes, with the selected theme saved locally.
Responsive Design — Optimized for desktop, tablet, and mobile devices.
Modern UI — Clean interface with Lucide icons, subtle styling, and Tailwind CSS.
Persistent Preferences — Remember the selected theme using browser local storage.
🛠️ Technologies Used
React
Vite
JavaScript
Tailwind CSS
Lucide React
React Markdown
Remark GFM
React Syntax Highlighter
Browser Local Storage
REST API
📦 Installation
1. Clone the Repository
git clone YOUR_REPOSITORY_URL
2. Navigate to the Project Directory
cd xorelai
3. Install Dependencies
npm install
4. Install Markdown and Syntax Highlighting Packages
npm install react-markdown remark-gfm react-syntax-highlighter
⚙️ Environment Variables
Create a .env file in the root directory and configure your API base URL:

VITE_API_URL=YOUR_API_BASE_URL
The application sends chat requests to the following endpoint:

${VITE_API_URL}/ask
The API is expected to accept a POST request with a JSON body:

{
  "message": "Hello, XorelAI!"
}
The expected response format is:

{
  "reply": "Hello! How can I help you today?"
}
Replace YOUR_API_BASE_URL with your actual backend API URL.

🚀 Run the Project Locally
Start the development server:

npm run dev
Open the local URL displayed in your terminal to use XorelAI.

🏗️ Build for Production
Generate the production build:

npm run build
Preview the production build locally:

npm run preview
📁 Project Structure
xorelai/
├── public/
├── src/
│   ├── components/
│   │   ├── ChateSidebar.jsx
│   │   ├── ChatMessage.jsx
│   │   └── ChatWindow.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
└── README.md
This is an example project structure. Update it to match your actual files and folders.

💬 Chat Experience
XorelAI provides a convenient messaging experience with:

A dedicated chat input area.
Keyboard shortcuts for sending messages and adding new lines.
AI-generated responses.
Markdown-formatted content.
Readable code blocks with syntax highlighting.
Copy functionality for code snippets.
A conversation sidebar for accessing chat history.
🎨 Theme & Interface
Light and dark theme support.
Responsive layout for different screen sizes.
Modern typography and clean spacing.
Interactive buttons and Lucide icons.
Consistent styling with Tailwind CSS.
🔐 Data & Privacy
Chat history is stored in browser local storage.
Theme preference is saved locally.
AI responses are retrieved through the configured backend API.
Never expose private API keys or backend secrets in frontend environment variables.
📱 Responsive Design
XorelAI is designed to work across desktop, tablet, and mobile devices, providing a consistent experience on different screen sizes.

📄 License
This project is intended for educational and personal development purposes. Add a license file if you plan to distribute the project publicly.

Built with React, Vite, and Tailwind CSS.
