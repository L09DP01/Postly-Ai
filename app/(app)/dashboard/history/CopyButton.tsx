"use client";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Erreur copie:", error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`mt-2 text-xs transition-colors ${
        copied 
          ? "text-green-600" 
          : "text-blue-600 hover:text-blue-800"
      }`}
      disabled={copied}
    >
      {copied ? "✅ Copié !" : "📋 Copier"}
    </button>
  );
}

