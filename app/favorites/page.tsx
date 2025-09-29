// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import RecipeCard from '@/components/RecipeCard';
import VideoSkeleton from '@/components/VideoSkeleton';
import SearchBar from '@/components/SearchBar';
import MobileNavigation from '@/components/MobileNavigation';  // ← 이 줄 추가!
import { recipes } from '@/data/recipes';
import { Recipe } from '@/types/recipe';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [recentSearches] = useState(['김치찌개', '된장찌개', '불고기']);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const handleSearch = (query: string) => {
    const filtered = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* 검색 섹션 */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
          
          {/* 인기 검색어 */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-gray-600">인기 검색어:</span>
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleSearch(search)}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* 레시피 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
              <VideoSkeleton />
            </>
          ) : (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          )}
        </div>

        {!loading && filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      
      {/* 모바일 네비게이션 */}
      <MobileNavigation />
    </>
  );
}
