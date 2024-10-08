"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("16cce002-8ad3-431c-b3ff-3bf2b7cff01a");
  }, []);
  return null;
};

export default CrispChat;
