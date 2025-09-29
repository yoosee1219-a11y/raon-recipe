"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Users, Star, Crown, Play } from "lucide-react";
import { Recipe } from "../src/types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "compact" | "featured" | "grid";
  showFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  variant = "default",
  showFavorite = true,
  onFavoriteToggle,
  className = "",
}) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return favorites.includes(recipe.id);
    }
    return false;
  });

  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const updatedFavorites = newFavoriteState
        ? [...favorites, recipe.id]
        : favorites.filter((id: string) => id !== recipe.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }

    onFavoriteToggle?.(recipe.id);
  };

  return (
    <Link href={`/recipe/${recipe.id}`} className={`block group ${className}`}>
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
        <div className="relative h-48">
          <Image
            src={imageError ? "/placeholder.svg" : recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />

          {recipe.isPremium && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
              <Crown className="w-3 h-3" />
              프리미엄
            </div>
          )}

          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite
                    ? "text-red-500 fill-current"
                    : "text-gray-600 hover:text-red-500"
                }`}
              />
            </button>
          )}

          {recipe.youtubeId && (
            <div className="absolute bottom-3 right-3 p-1 bg-white/90 backdrop-blur-sm rounded-full">
              <Play className="w-4 h-4 text-red-600" />
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                {recipe.cookingTime}분
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {recipe.servings}인분
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-900">
                {recipe.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                recipe.difficulty === "easy"
                  ? "text-green-600 bg-green-50"
                  : recipe.difficulty === "medium"
                  ? "text-yellow-600 bg-yellow-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {recipe.difficulty === "easy"
                ? "쉬움"
                : recipe.difficulty === "medium"
                ? "보통"
                : "어려움"}
            </span>

            <div className="flex flex-wrap gap-1">
              {recipe.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
