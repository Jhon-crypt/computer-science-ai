import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ChatThread } from "@/components/chat-thread";
import { InputForm } from "@/components/input-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DeploymentStatus } from "@/components/deployment-status";

export default function Home() {
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const { toast } = useToast();

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["/api/messages"],
  });

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await apiRequest("POST", "/api/chat", { message });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setSuggestedTopics(data.suggestedTopics);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const clearMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/messages/clear");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      setSuggestedTopics([]);
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              CS Learning Assistant
            </h1>
            <DeploymentStatus />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-4 min-h-[600px] flex flex-col">
          <ChatThread 
            messages={messages} 
            isLoading={isLoading} 
          />

          {suggestedTopics.length > 0 && (
            <div className="flex gap-2 my-4 flex-wrap">
              {suggestedTopics.map((topic) => (
                <Button
                  key={topic}
                  variant="secondary"
                  size="sm"
                  onClick={() => chatMutation.mutate(topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          )}

          <InputForm
            onSubmit={(message) => chatMutation.mutate(message)}
            isLoading={chatMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}