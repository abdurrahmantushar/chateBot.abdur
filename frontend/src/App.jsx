
import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import ChatSidebar from "./components/ChateSidebar";
import ChatWindow from "./components/ChatWindow";

function createChat() {
  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
  };
}

function App() {
  const [chats, setChats] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("portfolio-chats") || "[]");
    } catch {
      return [];
    }
  });

  const [activeChatId, setActiveChatId] = useState(
    () => localStorage.getItem("portfolio-active-chat") || null
  );

  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("xorelai-theme") === "dark"
  );

  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const messages = activeChat?.messages || [];

  useEffect(() => {
    localStorage.setItem("portfolio-chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChatId) {
      localStorage.setItem("portfolio-active-chat", activeChatId);
    } else {
      localStorage.removeItem("portfolio-active-chat");
    }
  }, [activeChatId]);

  useEffect(() => {
    localStorage.setItem("xorelai-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (activeChatId && !chats.some((chat) => chat.id === activeChatId)) {
      setActiveChatId(chats[0]?.id || null);
    }
  }, [chats, activeChatId]);

  const handleNewChat = () => {
    const chat = createChat();
    setChats((previous) => [chat, ...previous]);
    setActiveChatId(chat.id);
    setSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (id) => {
    const remaining = chats.filter((chat) => chat.id !== id);
    setChats(remaining);

    if (activeChatId === id) {
      setActiveChatId(remaining[0]?.id || null);
    }
  };

  const handleSend = async (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    let chatId = activeChatId;

    if (!chatId || !chats.some((chat) => chat.id === chatId)) {
      const newChat = createChat();
      chatId = newChat.id;
      setActiveChatId(chatId);
      setChats((previous) => [newChat, ...previous]);
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setChats((previous) =>
      previous.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title:
                chat.messages.length === 0
                  ? trimmedMessage.slice(0, 35)
                  : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/ask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmedMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to get a response");
      }

      const data = await response.json();

      setChats((previous) =>
        previous.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                      data.reply || "Sorry, I couldn't generate a response.",
                  },
                ],
              }
            : chat
        )
      );
    } catch {
      setChats((previous) =>
        previous.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                  },
                ],
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-dvh items-center justify-center overflow-hidden p-0 transition-colors duration-300 sm:p-4 lg:p-8 ${
        darkMode
          ? "dark bg-[#111411]"
          : "bg-gradient-to-br from-lime-100 via-yellow-50 to-emerald-100"
      }`}
    >
      <div
        className={`flex h-dvh w-full flex-col overflow-hidden transition-colors duration-300 sm:h-[94dvh] sm:max-h-[1000px] sm:rounded-2xl sm:border sm:shadow-2xl ${
          darkMode
            ? "border-gray-700 bg-[#191d19] sm:shadow-black/30"
            : "bg-white sm:border-white/80"
        }`}
      >
        <div
          className={`hidden h-10 shrink-0 items-center justify-between border-b px-4 sm:flex ${
            darkMode
              ? "border-gray-700 bg-[#202520]"
              : "border-gray-100 bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </div>

          <div
            className={`flex h-6 w-2/5 items-center justify-center gap-2 rounded-md border text-[10px] ${
              darkMode
                ? "border-gray-700 bg-[#191d19] text-gray-400"
                : "border-gray-100 bg-white text-gray-500"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-sm border border-gray-400" />
            xorel.ai
          </div>

          <div className={darkMode ? "text-sm text-gray-400" : "text-sm text-gray-500"}>
            ↗　＋　▢
          </div>
        </div>

        <header
          className={`flex min-h-[66px] shrink-0 items-center justify-between gap-3 border-b px-3 transition-colors duration-300 sm:px-5 ${
            darkMode
              ? "border-gray-700 bg-[#191d19]"
              : "border-gray-100 bg-white"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSidebarOpen((previous) => !previous)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition lg:hidden ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-green-600 text-white">
              <Sparkles size={21} />
            </div>

            <span
              className={`text-lg font-semibold tracking-tight ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              XorelAI
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setDarkMode(false)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                !darkMode
                  ? "bg-amber-100 text-amber-700"
                  : "text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              aria-label="Light mode"
              title="Light mode"
            >
              <Sun size={17} />
            </button>

            <button
              type="button"
              onClick={() => setDarkMode(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                darkMode
                  ? "bg-lime-400/15 text-lime-400"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              aria-label="Dark mode"
              title="Dark mode"
            >
              <Moon size={17} />
            </button>

            <button
              type="button"
              className={`hidden h-8 w-8 items-center justify-center rounded-full transition sm:flex ${
                darkMode
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-lime-100 bg-lime-500 text-sm font-semibold text-white"
              aria-label="Profile"
            >
              X
              <ChevronDown size={11} className="hidden" />
            </button>
          </div>
        </header>

        <div
          className={`relative flex min-h-0 flex-1 gap-2.5 p-2.5 transition-colors duration-300 ${
            darkMode ? "bg-[#141814]" : "bg-white"
          }`}
        >
          {sidebarOpen && (
            <button
              type="button"
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            />
          )}

          <ChatSidebar
            chats={chats}
            activeChatId={activeChatId}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(false)}
          />

          <section
            className={`relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ${
              darkMode
                ? "border-gray-700 bg-[#1b201b]"
                : "border-gray-200 bg-[#f5f5f2]"
            }`}
          >
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl ${
                darkMode ? "bg-green-900/20" : "bg-lime-200/50"
              }`}
            />

            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              onSend={handleSend}
              darkMode={darkMode}
            />

            <footer
              className={`relative z-10 shrink-0 px-2 pb-2 pt-1 text-center text-[9px] sm:text-[10px] ${
                darkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              XorelAI may make errors. Check important information.
            </footer>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
