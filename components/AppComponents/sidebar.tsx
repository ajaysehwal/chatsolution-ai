"use client";
import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { AccountMenu } from "./AccountMenu";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "@/components/ui/button";
import { Plus, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-72 flex-col transform transition-transform duration-300 ease-in-out",
          "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95",
          "border-r border-gray-200 dark:border-gray-800",
          "lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo and Brand */}
        <div className="relative px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25" />
              <Image
                src={logo}
                width={40}
                height={40}
                className="relative rounded-lg"
                alt="COS AI Logo"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                COS AI
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI-Powered Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-1 flex-col min-h-0">
          {/* New Chat Button */}
          <div className="px-4 mb-4">
            <Link href="/" shallow={true} className="block">
              <Button
                variant="default"
                size="default"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200 gap-2"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>

          {/* Chat History Section */}
          <div className="px-3 mb-2">
            <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Chat History
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto px-3 space-y-2 pb-2">
            <div className="space-y-1">
              <ChatHistory />
            </div>
          </div>

          {/* Account Section */}
          <div className="mt-auto p-4 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <AccountMenu />
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
