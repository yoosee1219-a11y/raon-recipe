"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Users, Star, Crown, Play } from "lucide-react";
import { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
  variant?: "default" | "compact" | "featured" | "grid";
  showFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  className?: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600 bg-green-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "쉬움";
      case "medium":
        return "보통";
      case "hard":
        return "어려움";
      default:
        return difficulty;
    }
  };

  if (variant === "compact") {
    return (
      <Link href={`/recipe/${recipe.id}`} className={`block ${className}`}>
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={imageError ? "/placeholder.svg" : recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover rounded-lg"
              onError={() => setImageError(true)}
            />
            {recipe.youtubeId && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{recipe.title}</h3>
            <p className="text-sm text-gray-600 truncate">{recipe.description}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {recipe.cookingTime}분
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                {recipe.servings}인분
              </span>
            </div>
          </div>
          
          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite
                    ? "text-red-500 fill-current"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/recipe/${recipe.id}`} className={`block ${className}`}>
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="relative h-64">
            <Image
              src={imageError ? "/placeholder.svg" : recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
            
            {/* Overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Premium badge */}
            {recipe.isPremium && (
              <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                <Crown className="w-4 h-4" />
                프리미엄
              </div>
            )}
            
            {/* Favorite button */}
            {showFavorite && (
              <button
                onClick={handleFavoriteClick}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite
                      ? "text-red-500 fill-current"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </button>
            )}
            
            {/* Video indicator */}
            {recipe.youtubeId && (
              <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                <Play className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-gray-900">동영상</span>
              </div>
            )}
            
            {/* Content overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-2">{recipe.title}</h3>
              <p className="text-white/90 text-sm line-clamp-2">{recipe.description}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
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
                <span className="text-sm font-medium text-gray-900">{recipe.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                {getDifficultyText(recipe.difficulty)}
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
  }

  // Default variant
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
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{recipe.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
          
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
              <span className="text-sm font-medium text-gray-900">{recipe.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {getDifficultyText(recipe.difficulty)}
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
