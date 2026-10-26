
import {
  Bot,
  ChevronDown,
  Clock3,
  MessageSquare,
  Plus,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

function ChatSidebar({
  chats = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  isOpen,
  onToggle,
}) {
  return (
    <aside
      className={`absolute inset-y-0 left-0 z-40 flex w-[260px] shrink-0 flex-col overflow-hidden rounded-2xl border transition-colors duration-300 lg:relative lg:inset-auto lg:z-0 lg:w-[230px] lg:translate-x-0 ${
        isOpen
          ? "translate-x-0 shadow-2xl"
          : "-translate-x-[110%] lg:translate-x-0"
      } dark:border-gray-700 dark:bg-[#1b201b] ${
        "border-gray-200 bg-[#f7f7f4]"
      }`}
      style={{
        backgroundColor: undefined,
      }}
    >
      <div className="flex h-[54px] shrink-0 items-center justify-between border-b border-gray-200/80 px-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-lime-500 text-white">
            <Bot size={17} />
          </div>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Workspace
          </span>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={17} />
        </button>
      </div>

      <div className="px-3 pt-4">
        <button
          type="button"
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-lime-300 px-3 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:brightness-95 active:scale-[0.98]"
        >
          <Plus size={17} />
          New Chat
        </button>
      </div>

      <div className="space-y-1 px-3 pt-5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-400">
          Menu
        </p>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg bg-lime-100/80 px-3 py-2.5 text-left text-xs font-medium text-gray-900 dark:bg-lime-400/10 dark:text-lime-300"
        >
          <MessageSquare size={16} className="text-green-700 dark:text-lime-400" />
          Chat
        </button>
      </div>

      <div className="mx-4 mt-5 border-t border-gray-200 dark:border-gray-700" />

      <div className="flex min-h-0 flex-1 flex-col px-3 pt-4">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-400">
            Recent Chats
          </p>
          <span className="rounded-md bg-gray-200/70 px-1.5 py-0.5 text-[10px] text-gray-500 dark:bg-gray-700 dark:text-gray-300">
            {chats.length}
          </span>
        </div>

        <div className="sidebar-scroll min-h-0 flex-1 space-y-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center px-3 py-8 text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm dark:bg-[#252b25]">
                <MessageSquare size={18} />
              </div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-200">
                No chats yet
              </p>
              <p className="mt-1 text-[11px] leading-5 text-gray-400">
                Start a new conversation to see it here.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-1 rounded-lg border px-2 py-2 transition ${
                  activeChatId === chat.id
                    ? "border-lime-200 bg-lime-100/70 dark:border-lime-700 dark:bg-lime-400/10"
                    : "border-transparent hover:border-gray-200 hover:bg-white dark:hover:border-gray-700 dark:hover:bg-[#252b25]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <MessageSquare
                    size={14}
                    className={`shrink-0 ${
                      activeChatId === chat.id
                        ? "text-green-700 dark:text-lime-400"
                        : "text-gray-400"
                    }`}
                  />
                  <span className="truncate text-xs text-gray-700 dark:text-gray-200">
                    {chat.title || "New Chat"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteChat(chat.id)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 opacity-100 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Delete chat"
                  title="Delete chat"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mx-4 border-t border-gray-200 dark:border-gray-700" />

      <div className="flex shrink-0 items-center gap-3 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-green-600 text-xs font-bold text-white">
          X
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-gray-800 dark:text-gray-100">
            Xorel User
          </p>
          <p className="mt-0.5 text-[10px] text-gray-500 dark:text-gray-400">
            Free plan
          </p>
        </div>

        <div className="flex items-center gap-1 text-gray-400">
          <Clock3 size={14} />
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-gray-200/80 px-4 py-3 dark:border-gray-700">
        <Sparkles size={14} className="text-green-600 dark:text-lime-400" />
        <p className="text-[10px] text-gray-500 dark:text-gray-400">
          Powered by{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            XorelAI
          </span>
        </p>
      </div>
    </aside>
  );
}

export default ChatSidebar;
