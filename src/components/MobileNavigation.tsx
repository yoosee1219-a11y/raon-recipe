"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Heart,
  User,
  Plus,
  BookOpen,
  Clock,
  Settings,
  X,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
}

interface MobileNavigationProps {
  className?: string;
  showFAB?: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  className = "",
  showFAB = true,
}) => {
  const pathname = usePathname();
  const [showFABMenu, setShowFABMenu] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      id: "home",
      label: "홈",
      icon: <Home className="w-5 h-5" />,
      href: "/",
    },
    {
      id: "search",
      label: "검색",
      icon: <Search className="w-5 h-5" />,
      href: "/search",
    },
    {
      id: "favorites",
      label: "즐겨찾기",
      icon: <Heart className="w-5 h-5" />,
      href: "/favorites",
    },
    {
      id: "profile",
      label: "프로필",
      icon: <User className="w-5 h-5" />,
      href: "/profile",
    },
  ];

  const fabMenuItems = [
    {
      id: "recipe",
      label: "레시피 추가",
      icon: <BookOpen className="w-5 h-5" />,
      href: "/recipe/create",
      color: "bg-blue-500",
    },
    {
      id: "timer",
      label: "타이머",
      icon: <Clock className="w-5 h-5" />,
      href: "/timer",
      color: "bg-green-500",
    },
    {
      id: "settings",
      label: "설정",
      icon: <Settings className="w-5 h-5" />,
      href: "/settings",
      color: "bg-purple-500",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleFABClick = () => {
    setShowFABMenu(!showFABMenu);
  };

  const closeFABMenu = () => {
    setShowFABMenu(false);
  };

  return (
    <>
      {/* Backdrop for FAB menu */}
      {showFABMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeFABMenu}
        />
      )}

      {/* FAB Menu */}
      {showFAB && showFABMenu && (
        <div className="fixed bottom-24 right-4 z-50 md:hidden">
          <div className="flex flex-col gap-3">
            {fabMenuItems.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeFABMenu}
                className={`
                  flex items-center justify-center w-12 h-12 ${item.color} text-white rounded-full shadow-lg
                  transform transition-all duration-300 hover:scale-110
                  animate-[fadeInUp_0.3s_ease-out_${index * 0.1}s_both]
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                title={item.label}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {showFAB && (
        <button
          onClick={handleFABClick}
          className={`
            fixed bottom-20 right-4 z-50 md:hidden
            w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg
            flex items-center justify-center transition-all duration-300 hover:scale-110
            ${showFABMenu ? "rotate-45" : ""}
          `}
          aria-label="메뉴 열기"
        >
          {showFABMenu ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </button>
      )}

      {/* Bottom Navigation */}
      <nav
        className={`
          fixed bottom-0 left-0 right-0 z-30 md:hidden
          bg-white border-t border-gray-200 px-2 py-2
          ${className}
        `}
      >
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  relative flex flex-col items-center justify-center px-3 py-2 rounded-lg
                  transition-all duration-200 min-w-0 flex-1
                  ${
                    active
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                  }
                `}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 font-medium truncate w-full text-center">
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {active && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Safe area for devices with home indicator */}
        <div className="h-safe-area-inset-bottom" />
      </nav>

      {/* Content padding for mobile navigation */}
      <div className="h-16 md:hidden" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .h-safe-area-inset-bottom {
          height: env(safe-area-inset-bottom);
        }
      `}</style>
    </>
  );
};

export default MobileNavigation;
