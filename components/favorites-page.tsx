'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Clock, Users, Star, Search, Trash2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface FavoriteRecipe {
  id: string;
  title: string;
  thumbnail: string;
  cookingTime: number;
  servings: number;
  rating: number;
  difficulty: string;
  isPremium?: boolean;
  addedAt: string;
}

const FavoritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRecipes, setFilteredRecipes] = useState<FavoriteRecipe[]>([])
  const { toast } = useToast()

  // 샘플 즐겨찾기 레시피 데이터
  const sampleFavorites: FavoriteRecipe[] = [
    {
      id: "sample",
      title: "김치볶음밥 🍛",
      thumbnail: "/placeholder.jpg",
      cookingTime: 15,
      servings: 2,
      rating: 4.5,
      difficulty: "쉬움",
      isPremium: false,
      addedAt: new Date().toISOString()
    },
    {
      id: "sample2",
      title: "된장찌개 🍲",
      thumbnail: "/placeholder.jpg",
      cookingTime: 20,
      servings: 4,
      rating: 4.8,
      difficulty: "보통",
      isPremium: true,
      addedAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "sample3",
      title: "불고기 🥩",
      thumbnail: "/placeholder.jpg",
      cookingTime: 30,
      servings: 3,
      rating: 4.7,
      difficulty: "어려움",
      isPremium: false,
      addedAt: new Date(Date.now() - 172800000).toISOString()
    }
  ]

  useEffect(() => {
    // localStorage에서 즐겨찾기 레시피 가져오기
    const getFavoriteRecipeIds = (): string[] => {
      if (typeof window === 'undefined') return []
      return JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
    }

    const favoriteIds = getFavoriteRecipeIds()
    
    // 실제로는 API에서 레시피 정보를 가져와야 함
    const favorites = sampleFavorites.filter(recipe => 
      favoriteIds.includes(recipe.id)
    )

    setFavoriteRecipes(favorites.length > 0 ? favorites : sampleFavorites)
  }, [])

  useEffect(() => {
    // 검색 필터링
    const filtered = favoriteRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredRecipes(filtered)
  }, [favoriteRecipes, searchQuery])

  const removeFavorite = (recipeId: string) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]')
    const updated = favorites.filter((id: string) => id !== recipeId)
    localStorage.setItem('favoriteRecipes', JSON.stringify(updated))
    
    setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
    
    toast({
      title: "즐겨찾기에서 제거됨",
      description: "레시피가 즐겨찾기에서 제거되었습니다."
    })
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
          <Heart className="w-8 h-8 fill-red-500 text-red-500" />
          즐겨찾기한 레시피
        </h1>
        
        {/* 검색 */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="즐겨찾기한 레시피 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          총 {filteredRecipes.length}개의 즐겨찾기한 레시피
        </div>
      </div>

      {filteredRecipes.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? '검색 결과가 없습니다' : '즐겨찾기한 레시피가 없습니다'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? '다른 검색어로 시도해보세요' 
                : '마음에 드는 레시피를 즐겨찾기에 추가해보세요'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={recipe.thumbnail} 
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg'
                    }}
                  />
                </div>
                
                <div className="absolute top-2 right-2 flex gap-1">
                  {recipe.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                      ⭐ 프리미엄
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFavorite(recipe.id)}
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{recipe.title}</h3>
                
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookingTime}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}인분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {recipe.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {formatDate(recipe.addedAt)}
                  </span>
                </div>
                
                <Button className="w-full mt-3">
                  레시피 보기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
