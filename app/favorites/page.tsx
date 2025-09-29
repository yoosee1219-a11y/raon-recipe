'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import RecipeCard from '../../src/components/RecipeCard';
import MobileNavigation from '../../src/components/MobileNavigation';
import { Recipe } from '../../src/types/recipe';
import { recipes } from '../../src/data/recipes';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      const favoriteIds = JSON.parse(saved);
      setFavorites(favoriteIds);
      
      const favRecipes = recipes.filter(recipe => 
        favoriteIds.includes(recipe.id)
      );
      setFavoriteRecipes(favRecipes);
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(fav => fav !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.id !== id));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">즐겨찾기</h1>
          <p className="text-gray-600">
            저장한 레시피 {favoriteRecipes.length}개
          </p>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-xl font-semibold mb-2">
              즐겨찾기가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-6">
              마음에 드는 레시피를 저장해보세요!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              레시피 둘러보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <RecipeCard recipe={recipe} />
                <button
                  onClick={() => removeFavorite(recipe.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
                  aria-label="즐겨찾기 제거"
                >
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <MobileNavigation />
    </>
  );
}