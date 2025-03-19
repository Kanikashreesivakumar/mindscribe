"use client"; // Ensure this runs only on the client side
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensures correct theme is loaded on client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-900">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mindscribe</h1>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded text-black dark:text-white"
      >
        Toggle Theme (Current: {theme})
      </button>
    </nav>
  );
}
