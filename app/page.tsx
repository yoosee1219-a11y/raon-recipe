"use client";

import { useState } from "react";
import RecipeCard from "@/src/components/RecipeCard";
import VideoSkeleton from "@/src/components/VideoSkeleton";
import SearchBar from "@/src/components/SearchBar";
import MobileNavigation from "@/src/components/MobileNavigation";
import { recipes } from "@/src/data/recipes";
import { Recipe } from "@/src/types/recipe";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<Recipe[]>(recipes);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(recipes);
      return;
    }

    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        )
    );
    setSearchResults(filtered);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">한국 레시피 플랫폼</h1>
          <p className="text-gray-600">맛있는 한식 레시피를 찾아보세요</p>
        </div>

        {/* 검색바 */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* 레시피 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h2>
            <p className="text-gray-600">다른 검색어로 시도해보세요</p>
          </div>
        )}
      </div>

      <MobileNavigation />
    </>
  );
}
