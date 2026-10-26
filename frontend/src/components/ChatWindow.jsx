
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Code2,
  Image,
  MessageSquareText,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

const suggestions = [
  {
    title: "Image Generator",
    description: "Create stunning visuals from your imagination.",
    prompt: "Help me create an image idea for my next project.",
    icon: Image,
    iconClass: "bg-violet-100 text-violet-600",
  },
  {
    title: "Write Copy",
    description: "Write engaging content for any purpose.",
    prompt: "Help me write engaging copy for my project.",
    icon: MessageSquareText,
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    title: "Write Code",
    description: "Build, debug and improve your code.",
    prompt: "Help me write clean, responsive React and Tailwind CSS code.",
    icon: Code2,
    iconClass: "bg-emerald-100 text-emerald-700",
  },
];

function ChatWindow({ messages = [], isLoading, onSend }) {
  const bottomRef = useRef(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col">
      <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto">
        {!hasMessages ? (
          <div className="flex min-h-full flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-10">
            <div className="relative mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-[26px] border border-lime-200 bg-gradient-to-br from-lime-300 via-lime-400 to-green-500 shadow-[0_10px_35px_rgba(132,204,22,0.25)] sm:h-[88px] sm:w-[88px] sm:rounded-[30px]">
              <div className="absolute inset-2 rounded-[20px] border border-white/40 sm:rounded-[23px]" />
              <WandSparkles
                size={37}
                strokeWidth={1.7}
                className="relative text-white drop-shadow-sm sm:h-11 sm:w-11"
              />
              <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#f5f5f2] bg-white text-lime-600 shadow-sm">
                <Sparkles size={13} />
              </span>
            </div>

            <div className="mb-3 flex items-center gap-2 rounded-full border border-lime-200/80 bg-white/80 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              <span className="text-[10px] font-medium uppercase tracking-[1.6px] text-gray-500">
                Your creative AI assistant
              </span>
            </div>

            <h1 className="max-w-2xl text-center text-3xl font-semibold leading-tight tracking-[-1.5px] text-gray-900 sm:text-4xl lg:text-[42px]">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-lime-600 to-green-500 bg-clip-text text-transparent">
                XorelAI
              </span>
            </h1>

            <p className="mt-3 max-w-md text-center text-sm leading-6 text-gray-500 sm:text-[15px]">
              What would you like to create today? Explore ideas, write
              something amazing, or bring your next project to life.
            </p>

            <div className="mt-8 grid w-full max-w-[850px] grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
              {suggestions.map((suggestion) => {
                const Icon = suggestion.icon;

                return (
                  <button
                    key={suggestion.title}
                    type="button"
                    onClick={() => onSend(suggestion.prompt)}
                    disabled={isLoading}
                    className="group flex min-h-[140px] flex-col rounded-2xl border border-gray-200/90 bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition duration-200 hover:-translate-y-1 hover:border-lime-300 hover:shadow-[0_10px_28px_rgba(132,204,22,0.10)] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[155px] sm:p-5"
                  >
                    <div className="flex w-full items-start justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${suggestion.iconClass}`}
                      >
                        <Icon size={20} strokeWidth={1.8} />
                      </span>

                      <ArrowUpRight
                        size={17}
                        className="text-gray-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-600"
                      />
                    </div>

                    <span className="mt-4 text-sm font-semibold text-gray-800">
                      {suggestion.title}
                    </span>

                    <span className="mt-1 text-xs leading-5 text-gray-500">
                      {suggestion.description}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 text-[11px] text-gray-400">
              <Sparkles size={13} className="text-lime-600" />
              Choose a suggestion or start a conversation below
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-3 py-6 sm:gap-6 sm:px-6 sm:py-8">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-green-500 text-white">
                  <Sparkles size={18} />
                </div>

                <div className="flex items-center gap-1.5 rounded-2xl border border-gray-200 bg-white px-5 py-4">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-lime-500 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-lime-500 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-lime-500" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="shrink-0 px-3 pb-3 pt-2 sm:px-6 sm:pb-5">
        <div className="mx-auto w-full max-w-3xl">
          <ChatInput onSend={onSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
