"use client";

import React from "react";
import Link from "next/link";
import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Heart,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  variant?: "default" | "minimal" | "detailed";
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  variant = "default",
  className = "",
}) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "회사 소개", href: "/about" },
      { label: "팀 소개", href: "/team" },
      { label: "채용 정보", href: "/careers" },
      { label: "보도자료", href: "/press" },
    ],
    service: [
      { label: "레시피 등록", href: "/recipe/create" },
      { label: "요리 클래스", href: "/classes" },
      { label: "프리미엄", href: "/premium" },
      { label: "파트너십", href: "/partnership" },
    ],
    support: [
      { label: "고객센터", href: "/support" },
      { label: "자주 묻는 질문", href: "/faq" },
      { label: "이용약관", href: "/terms" },
      { label: "개인정보처리방침", href: "/privacy" },
    ],
    community: [
      { label: "요리 팁", href: "/tips" },
      { label: "레시피 공유", href: "/community" },
      { label: "이벤트", href: "/events" },
      { label: "블로그", href: "/blog" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/laonrecipe",
      icon: <Facebook className="w-5 h-5" />,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/laonrecipe",
      icon: <Instagram className="w-5 h-5" />,
      color: "hover:text-pink-600",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/laonrecipe",
      icon: <Youtube className="w-5 h-5" />,
      color: "hover:text-red-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/laonrecipe",
      icon: <Twitter className="w-5 h-5" />,
      color: "hover:text-blue-400",
    },
  ];

  if (variant === "minimal") {
    return (
      <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                라온레시피
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/about"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                회사 소개
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                개인정보처리방침
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500">
              © {currentYear} 라온레시피. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }

  if (variant === "detailed") {
    return (
      <footer className={`bg-gray-900 text-white ${className}`}>
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">라온레시피</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                모든 사람이 맛있는 요리를 쉽게 만들 수 있도록 돕는 대한민국
                최고의 레시피 플랫폼입니다.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contact@laonrecipe.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">1588-1234</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">서울시 강남구 테헤란로 123</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">회사</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">서비스</h3>
              <ul className="space-y-3">
                {footerLinks.service.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">고객지원</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">뉴스레터 구독</h3>
                <p className="text-gray-300 text-sm">
                  새로운 레시피와 요리 팁을 가장 먼저 받아보세요.
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 w-64"
                />
                <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap">
                  구독하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm">
                © {currentYear} 라온레시피. All rights reserved.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              {/* Made with Love */}
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in Korea</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Default variant
  return (
    <footer className={`bg-gray-50 border-t border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                라온레시피
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              맛있는 요리를 쉽게 만들 수 있도록 돕는 레시피 플랫폼
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 bg-white border border-gray-200 rounded-lg text-gray-600 ${social.color} hover:border-gray-300 transition-colors`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">서비스</h3>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              커뮤니티
            </h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              고객지원
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} 라온레시피. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-orange-600 transition-colors"
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-orange-600 transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/support"
                className="text-gray-500 hover:text-orange-600 transition-colors"
              >
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
