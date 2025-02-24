import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function DeploymentStatus() {
  const [isDeployed, setIsDeployed] = useState(true);
  const liveUrl = window.location.href;

  return (
    <div className="flex items-center gap-2">
      <Badge variant={isDeployed ? "success" : "destructive"}>
        {isDeployed ? "Deployed" : "Offline"}
      </Badge>
      {isDeployed && (
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={() => window.open(liveUrl, '_blank')}
        >
          Live Link
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
