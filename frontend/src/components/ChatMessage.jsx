import { useState } from "react";
import {
  Bot,
  Check,
  Copy,
  Sparkles,
  UserRound,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CopyButton({ text, label = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-gray-500 transition hover:bg-gray-200/70 hover:text-gray-800"
      aria-label={label}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? "" : label}
    </button>
  );
}function CodeBlock({ language, children }) {
  const code = String(children).replace(/\n$/, "");

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-100 px-3 py-2.5 sm:px-4">
        <span className="text-xs font-medium text-gray-600">
          {language || "Code"}
        </span>
        <CopyButton text={code} label="Copy code" />
      </div>

      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language || "javascript"}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "#fafafa",
            fontSize: "13px",
            lineHeight: "1.75",
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function MarkdownContent({ content, darkMode }) {
  return (
    <div
      className={`break-words text-sm leading-7 ${
        darkMode
          ? "text-gray-300 [&_a]:text-lime-400 [&_strong]:text-white [&_hr]:border-gray-700"
          : "text-gray-700 [&_a]:text-green-700 [&_strong]:text-gray-900 [&_hr]:border-gray-200"
      } [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_p]:my-2 [&_strong]:font-bold [&_hr]:my-4`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }) {
            return (
              <h1 className={`mb-3 mt-5 text-xl font-bold leading-snug ${darkMode ? "text-white" : "text-gray-900"}`}>
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className={`mb-2 mt-5 text-lg font-bold leading-snug ${darkMode ? "text-white" : "text-gray-900"}`}>
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className={`mb-2 mt-4 text-base font-semibold ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                {children}
              </h3>
            );
          },
          ul({ children }) {
            return <ul className="my-3 list-disc space-y-1 pl-6">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-3 list-decimal space-y-1 pl-6">{children}</ol>;
          },
          li({ children }) {
            return <li className="pl-1">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className={`my-4 border-l-4 border-lime-400 pl-4 italic ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {children}
              </blockquote>
            );
          },
          code({ className, children, ...props }) {
            const match = /language-([\w-]+)/.exec(className || "");

            if (match) {
              return (
                <CodeBlock language={match[1]} darkMode={darkMode}>
                  {children}
                </CodeBlock>
              );
            }

            return (
              <code
                className={`rounded-md px-1.5 py-0.5 font-mono text-xs ${
                  darkMode
                    ? "bg-gray-800 text-lime-300"
                    : "bg-gray-100 text-green-800"
                }`}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre({ children }) {
            return <>{children}</>;
          },
          a({ href, children }) {
            const safeHref = /^(https?:|mailto:|\/|#)/i.test(href || "")
              ? href
              : undefined;

            return (
              <a
                href={safeHref}
                target={safeHref?.startsWith("http") ? "_blank" : undefined}
                rel={safeHref?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <div className="my-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full min-w-[360px] border-collapse text-left text-xs">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className={darkMode ? "bg-gray-800" : "bg-gray-50"}>{children}</thead>;
          },
          th({ children }) {
            return (
              <th className={`border-b px-3 py-2.5 font-semibold ${darkMode ? "border-gray-700 text-gray-100" : "border-gray-200 text-gray-800"}`}>
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className={`border-b px-3 py-2.5 ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
                {children}
              </td>
            );
          },
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );

}

function ChatMessage({ message, darkMode = false }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex w-full justify-end gap-3">
        <div className={`max-w-[88%] rounded-2xl rounded-br-md border px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[78%] sm:px-5 ${
          darkMode
            ? "border-lime-700/60 bg-gradient-to-br from-lime-900/60 to-green-900/60 text-gray-100"
            : "border-lime-300/70 bg-gradient-to-br from-lime-100 to-lime-200/80 text-gray-800"
        }`}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          darkMode ? "bg-gray-700 text-gray-200" : "bg-gray-200 text-gray-600"
        }`}>
          <UserRound size={17} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start gap-3 sm:gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-400 to-green-600 text-white shadow-sm">
        <Bot size={19} />
      </div>

      <div className="min-w-0 max-w-[calc(100%-48px)] flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`text-xs font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
            XorelAI
          </span>

          <span className="flex items-center gap-1 rounded-full bg-lime-100 px-2 py-0.5 text-[9px] font-medium text-green-800 dark:bg-lime-400/10 dark:text-lime-300">
            <Sparkles size={10} />
            AI Assistant
          </span>
        </div>

        <div className={`overflow-hidden rounded-2xl rounded-tl-md border px-4 py-3.5 shadow-sm sm:px-5 sm:py-4 ${
          darkMode
            ? "border-gray-700 bg-[#202520]"
            : "border-gray-200/90 bg-white"
        }`}>
          <MarkdownContent content={message.content} darkMode={darkMode} />

          <div className={`mt-3 flex items-center justify-end border-t pt-2 ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}>
            <CopyButton text={message.content || ""} label="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;

