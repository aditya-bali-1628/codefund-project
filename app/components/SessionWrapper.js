// app/components/SessionWrapper.js
"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children }) {
  return (
    // session provder for make session data use globaly for app
    <SessionProvider
      refetchInterval={5 * 60} // Refresh session every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}