"use client";

import { useState } from "react";
import SearchBar from "@/src/components/SearchBar";
import RecipeCard from "@/src/components/RecipeCard";
import MobileNavigation from "@/src/components/MobileNavigation";
import { recipes } from "@/src/data/recipes";
import { Recipe } from "@/src/types/recipe";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setHasSearched(true);

    if (!query.trim()) {
      setSearchResults([]);
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
          <h1 className="text-3xl font-bold mb-2">레시피 검색</h1>
          <p className="text-gray-600">원하는 레시피를 검색해보세요</p>
        </div>

        {/* 검색바 */}
        <div className="mb-8">
          <SearchBar
            onSearch={handleSearch}
            placeholder="요리명, 재료, 태그로 검색..."
          />
        </div>

        {/* 검색 결과 */}
        {hasSearched ? (
          <>
            {searchResults.length > 0 ? (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    검색 결과 {searchResults.length}개
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold mb-2">
                  검색 결과가 없습니다
                </h2>
                <p className="text-gray-600">다른 검색어로 시도해보세요</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h2 className="text-xl font-semibold mb-2">
              레시피를 검색해보세요
            </h2>
            <p className="text-gray-600">
              요리명, 재료, 또는 태그로 검색할 수 있습니다
            </p>
          </div>
        )}
      </div>

      <MobileNavigation />
    </>
  );
}
