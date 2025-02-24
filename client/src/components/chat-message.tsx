import { Message } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { User, Bot } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const Icon = message.isAi ? Bot : User;

  // Parse markdown code blocks
  const parts = message.content.split(/(```[a-z]*\n[\s\S]*?\n```)/g);

  return (
    <Card className={`p-4 ${message.isAi ? "bg-muted" : ""}`}>
      <div className="flex gap-3">
        <Icon className="h-6 w-6 mt-1 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          {parts.map((part, index) => {
            if (part.startsWith("```")) {
              // Extract language and code
              const [_, language, ...codeLines] = part
                .replace(/```/g, "")
                .split("\n");
              const code = codeLines.slice(0, -1).join("\n");

              return (
                <SyntaxHighlighter
                  key={index}
                  language={language || "javascript"}
                  style={vs2015}
                  className="rounded-md"
                >
                  {code}
                </SyntaxHighlighter>
              );
            }
            // Regular text
            return <p key={index} className="whitespace-pre-wrap">{part}</p>;
          })}
        </div>
      </div>
    </Card>
  );
}