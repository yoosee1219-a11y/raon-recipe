"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  Bell,
  Settings,
  ChefHat,
  BookOpen,
  Clock,
  Crown,
  Home,
} from "lucide-react";

interface HeaderProps {
  variant?: "default" | "minimal" | "transparent";
  showSearch?: boolean;
  showNotifications?: boolean;
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
  isPremium?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  variant = "default",
  showSearch = true,
  showNotifications = true,
  className = "",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { label: "홈", href: "/", icon: <Home className="w-4 h-4" /> },
    {
      label: "레시피",
      href: "/recipes",
      icon: <ChefHat className="w-4 h-4" />,
    },
    {
      label: "카테고리",
      href: "/categories",
      icon: <BookOpen className="w-4 h-4" />,
    },
    { label: "타이머", href: "/timer", icon: <Clock className="w-4 h-4" /> },
    {
      label: "프리미엄",
      href: "/premium",
      icon: <Crown className="w-4 h-4" />,
      isPremium: true,
    },
  ];

  const userMenuItems = [
    {
      label: "내 프로필",
      href: "/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "즐겨찾기",
      href: "/favorites",
      icon: <Heart className="w-4 h-4" />,
      badge: 5,
    },
    {
      label: "설정",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const getHeaderStyle = () => {
    switch (variant) {
      case "transparent":
        return "bg-transparent backdrop-blur-sm";
      case "minimal":
        return "bg-white shadow-sm";
      default:
        return "bg-white shadow-sm";
    }
  };

  return (
    <header className={`relative z-40 ${getHeaderStyle()} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                라온레시피
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive(item.href)
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }
                  ${
                    item.isPremium
                      ? "text-yellow-600 hover:text-yellow-700"
                      : ""
                  }
                `}
              >
                {item.icon}
                {item.label}
                {item.isPremium && <Crown className="w-3 h-3" />}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search Button (Mobile) */}
            {showSearch && (
              <Link
                href="/search"
                className="md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
            )}

            {/* Search Bar (Desktop) */}
            {showSearch && (
              <div className="hidden md:block">
                <Link
                  href="/search"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">레시피 검색...</span>
                </Link>
              </div>
            )}

            {/* Notifications */}
            {showNotifications && (
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            )}

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  사용자
                </span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-40">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">김라온</p>
                          <p className="text-sm text-gray-600">요리 초보자</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {item.icon}
                            <span className="text-sm text-gray-700">
                              {item.label}
                            </span>
                          </div>
                          {item.badge && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="p-2 border-t border-gray-100">
                      <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        로그아웃
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40 md:hidden">
            <nav className="p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                      ${
                        isActive(item.href)
                          ? "text-orange-600 bg-orange-50"
                          : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                      }
                      ${
                        item.isPremium
                          ? "text-yellow-600 hover:text-yellow-700"
                          : ""
                      }
                    `}
                  >
                    {item.icon}
                    {item.label}
                    {item.isPremium && <Crown className="w-4 h-4" />}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="space-y-2">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
