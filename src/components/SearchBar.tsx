"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  initialValue?: string;
  className?: string;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: "recent" | "popular" | "category";
  count?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "레시피를 검색해보세요...",
  showFilters = true,
  showSuggestions = true,
  initialValue = "",
  className = "",
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isActive, setIsActive] = useState(false);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample suggestions - in a real app, these would come from an API
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([
    { id: "1", text: "김치찌개", type: "recent" },
    { id: "2", text: "불고기", type: "recent" },
    { id: "3", text: "된장찌개", type: "recent" },
    { id: "4", text: "비빔밥", type: "popular", count: 1250 },
    { id: "5", text: "갈비찜", type: "popular", count: 980 },
    { id: "6", text: "삼겹살 구이", type: "popular", count: 876 },
    { id: "7", text: "한식", type: "category" },
    { id: "8", text: "중식", type: "category" },
    { id: "9", text: "일식", type: "category" },
  ]);

  const recentSearches = suggestions.filter(s => s.type === "recent");
  const popularSearches = suggestions.filter(s => s.type === "popular");
  const categories = suggestions.filter(s => s.type === "category");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestionsList(false);
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim() && showSuggestions) {
      setShowSuggestionsList(true);
    } else {
      setShowSuggestionsList(false);
    }
  };

  const handleInputFocus = () => {
    setIsActive(true);
    if (showSuggestions && (query.trim() || recentSearches.length > 0)) {
      setShowSuggestionsList(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      addToRecentSearches(query.trim());
      setShowSuggestionsList(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    onSearch(suggestion.text);
    addToRecentSearches(suggestion.text);
    setShowSuggestionsList(false);
    inputRef.current?.blur();
  };

  const addToRecentSearches = (searchTerm: string) => {
    const newRecent: SearchSuggestion = {
      id: Date.now().toString(),
      text: searchTerm,
      type: "recent",
    };
    
    setSuggestions(prev => [
      newRecent,
      ...prev.filter(s => s.text !== searchTerm && s.type !== "recent").slice(0, 7),
      ...prev.filter(s => s.type !== "recent")
    ]);
  };

  const clearQuery = () => {
    setQuery("");
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setSuggestions(prev => prev.filter(s => s.type !== "recent"));
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "recent":
        return <Clock className="w-4 h-4 text-gray-400" />;
      case "popular":
        return <TrendingUp className="w-4 h-4 text-orange-500" />;
      case "category":
        return <Filter className="w-4 h-4 text-blue-500" />;
      default:
        return <Search className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`
            relative flex items-center bg-white border-2 rounded-xl transition-all duration-200
            ${isActive 
              ? "border-orange-300 shadow-lg shadow-orange-100" 
              : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          {/* Search Icon */}
          <div className="pl-4">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          
          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
            autoComplete="off"
          />
          
          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearQuery}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          {/* Filters Button */}
          {showFilters && (
            <button
              type="button"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`
                p-2 mr-2 rounded-lg transition-colors
                ${showFiltersPanel 
                  ? "text-orange-600 bg-orange-50" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">최근 검색</h3>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  전체 삭제
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-sm text-gray-700">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Searches */}
          {popularSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">인기 검색어</h3>
              <div className="space-y-1">
                {popularSearches.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getSuggestionIcon(suggestion.type)}
                      <span className="text-sm text-gray-700">{suggestion.text}</span>
                    </div>
                    {suggestion.count && (
                      <span className="text-xs text-gray-500">{suggestion.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {getSuggestionIcon(suggestion.type)}
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No suggestions */}
          {recentSearches.length === 0 && popularSearches.length === 0 && categories.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">검색어를 입력해보세요</p>
            </div>
          )}
        </div>
      )}

      {/* Filters Panel */}
      {showFiltersPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">필터</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">요리 시간</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">전체</option>
                <option value="15">15분 이하</option>
                <option value="30">30분 이하</option>
                <option value="60">1시간 이하</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">난이도</label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                <option value="">전체</option>
                <option value="easy">쉬움</option>
                <option value="medium">보통</option>
                <option value="hard">어려움</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
              적용
            </button>
            <button 
              onClick={() => setShowFiltersPanel(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
