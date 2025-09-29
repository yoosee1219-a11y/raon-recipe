export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  cookingTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  rating: number;
  author: string;
  ingredients: Ingredient[];
  steps: Step[];
  tips?: string[];
  nutritionInfo?: NutritionInfo;
  isPremium?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: string;
  coupangLink?: string;
  essential: boolean;
}

export interface Step {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  duration?: number;
  temperature?: number;
  tips?: string[];
  timer?: Timer;
}

export interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  isActive: boolean;
  remainingTime: number;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface VideoInfo {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  quality: 'HD' | 'FHD' | '4K';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favoriteRecipes: string[];
  recentlyViewed: string[];
  isPremium: boolean;
}

export interface SearchResult {
  recipes: Recipe[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface FilterOptions {
  category?: string;
  difficulty?: string;
  maxCookingTime?: number;
  tags?: string[];
  isPremium?: boolean;
}
