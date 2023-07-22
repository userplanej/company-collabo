"use client";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <div className="mt-4 mb-4">{children}</div>;
}
