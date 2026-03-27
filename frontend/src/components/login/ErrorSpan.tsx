import React from "react";
interface ErrorProps {
  children: React.ReactNode;
}
export function ErrorSpan({ children }: ErrorProps) {
  return <span className="text-red-500 font-semibold text-sm">{children}</span>;
}
