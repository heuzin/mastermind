"use client";

import React, { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";

import { MAX_FREE_COUNTS } from "@/constants";

interface FreeCounterProps {
  apiLimiCount: number;
}

const FreeCounter: React.FC<FreeCounterProps> = ({ apiLimiCount = 0 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimiCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className="h-3 bg-white"
              value={(apiLimiCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button variant={"premium"} className="w-full">
            Upgrade
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
