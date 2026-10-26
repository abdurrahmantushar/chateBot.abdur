
import { useState } from "react";
import {ArrowUp,} from "lucide-react";

function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = value.trim();

    if (!message || isLoading) return;

    onSend(message);
    setValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-gray-200 bg-white p-3 shadow-[0_5px_24px_rgba(0,0,0,0.045)] transition focus-within:border-lime-300 focus-within:shadow-[0_5px_25px_rgba(132,204,22,0.09)] sm:rounded-[24px] sm:p-4"
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message XorelAI..."
        rows={2}
        disabled={isLoading}
        className="max-h-36 min-h-[48px] w-full resize-none border-0 bg-transparent px-1 py-2 text-sm leading-6 text-gray-800 outline-none placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
      />

      <div className="mt-2 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">


        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden text-[10px] text-gray-400 sm:inline">
            Shift + Enter for new line
          </span>

          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-green-500 text-white shadow-sm transition hover:brightness-95 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10"
          >
            <ArrowUp size={19} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
