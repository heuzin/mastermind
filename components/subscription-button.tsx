"use client";

import React, { useState } from "react";
import axios from "axios";
import { Zap } from "lucide-react";

import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface SubsctriptionButtonProps {
  isPro: boolean;
}

const SubsctriptionButton: React.FC<SubsctriptionButtonProps> = ({
  isPro = false,
}) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {isPro ? "Menage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubsctriptionButton;
