"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Heart,
  Home,
  BookOpen,
  User,
  Menu,
  Bell,
  Settings,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AppLayoutProps {
  children: React.ReactNode;
  currentPage?: "home" | "search" | "recipes" | "favorites" | "profile";
}

const AppLayout = ({ children, currentPage = "home" }: AppLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "검색 실행",
        description: `"${searchQuery}"에 대한 검색을 시작합니다.`,
      });
      // 실제로는 검색 페이지로 이동
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* 데스크톱 헤더 */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* 로고 */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                라온레시피
              </h1>
            </div>

            {/* 데스크톱 검색 */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="flex w-full gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="레시피, 재료를 검색하세요..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit">검색</Button>
              </form>
            </div>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className={currentPage === "home" ? "bg-orange-100" : ""}
              >
                <Home className="w-4 h-4 mr-2" />홈
              </Button>
              <Button
                variant="ghost"
                className={currentPage === "recipes" ? "bg-orange-100" : ""}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                레시피
              </Button>
              <Button
                variant="ghost"
                className={currentPage === "favorites" ? "bg-orange-100" : ""}
              >
                <Heart className="w-4 h-4 mr-2" />
                즐겨찾기
              </Button>
              <Button
                variant="ghost"
                className={currentPage === "profile" ? "bg-orange-100" : ""}
              >
                <User className="w-4 h-4 mr-2" />
                마이페이지
              </Button>

              {/* 알림 */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">
                  3
                </Badge>
              </Button>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* 모바일 검색 */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="레시피, 재료를 검색하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" size="sm">
                검색
              </Button>
            </form>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden border-t pt-4 pb-4">
              <nav className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    currentPage === "home" ? "bg-orange-100" : ""
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />홈
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    currentPage === "recipes" ? "bg-orange-100" : ""
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  레시피
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    currentPage === "favorites" ? "bg-orange-100" : ""
                  }`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  즐겨찾기
                </Button>
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    currentPage === "profile" ? "bg-orange-100" : ""
                  }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  마이페이지
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  설정
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1">{children}</main>

      {/* 모바일 하단 네비게이션 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-50">
        <div className="flex justify-around py-2">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${
              currentPage === "home" ? "text-orange-500" : ""
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">홈</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${
              currentPage === "search" ? "text-orange-500" : ""
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs">검색</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${
              currentPage === "recipes" ? "text-orange-500" : ""
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">레시피</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 relative ${
              currentPage === "favorites" ? "text-orange-500" : ""
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">즐겨찾기</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 ${
              currentPage === "profile" ? "text-orange-500" : ""
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">마이페이지</span>
          </Button>
        </div>
      </div>

      {/* 푸터 (데스크톱만) */}
      <footer className="hidden md:block bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold">라온레시피</h3>
              </div>
              <p className="text-sm text-gray-600">
                한국인을 위한 최고의 레시피 플랫폼
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    레시피 검색
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    인기 레시피
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    신규 레시피
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    프리미엄
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">고객지원</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    자주 묻는 질문
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    문의하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    이용약관
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    개인정보처리방침
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">파트너</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-orange-500">
                    쿠팡 파트너스
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    광고 문의
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-500">
                    제휴 문의
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 mt-6 text-center text-sm text-gray-600">
            <p>&copy; 2024 라온레시피. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
