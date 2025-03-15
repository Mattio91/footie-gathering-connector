
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";
import './i18n';

// Use the provided Clerk publishable key
const PUBLISHABLE_KEY = "pk_test_ZGVlcC1sb2N1c3QtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA";

// Only use ClerkProvider if we have a valid key
const shouldUseClerk = PUBLISHABLE_KEY && PUBLISHABLE_KEY.startsWith('pk_');

// Render the app with or without Clerk based on key availability
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {shouldUseClerk ? (
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        clerkJSVersion="5.56.0-snapshot.v20250312225817"
        signInUrl="/login"
        signUpUrl="/login"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        afterSignOutUrl="/">
        <App />
      </ClerkProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
