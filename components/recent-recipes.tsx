'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, Star, Eye } from 'lucide-react'

interface RecentRecipe {
  id: string;
  title: string;
  thumbnail: string;
  cookingTime: number;
  servings: number;
  rating: number;
  viewedAt: string;
}

const RecentRecipes = () => {
  const [recentRecipes, setRecentRecipes] = useState<RecentRecipe[]>([])

  // 샘플 데이터
  const sampleRecipes: RecentRecipe[] = [
    {
      id: "sample",
      title: "김치볶음밥 🍛",
      thumbnail: "/placeholder.jpg",
      cookingTime: 15,
      servings: 2,
      rating: 4.5,
      viewedAt: new Date().toISOString()
    },
    {
      id: "sample2",
      title: "된장찌개 🍲",
      thumbnail: "/placeholder.jpg",
      cookingTime: 20,
      servings: 4,
      rating: 4.8,
      viewedAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: "sample3", 
      title: "불고기 🥩",
      thumbnail: "/placeholder.jpg",
      cookingTime: 30,
      servings: 3,
      rating: 4.7,
      viewedAt: new Date(Date.now() - 7200000).toISOString()
    }
  ]

  useEffect(() => {
    // localStorage에서 최근 본 레시피 ID 가져오기
    const getRecentRecipeIds = (): string[] => {
      if (typeof window === 'undefined') return []
      return JSON.parse(localStorage.getItem('recentRecipes') || '[]')
    }

    const recentIds = getRecentRecipeIds()
    
    // 실제로는 API에서 레시피 정보를 가져와야 함
    // 여기서는 샘플 데이터 사용
    const filteredRecipes = sampleRecipes.filter(recipe => 
      recentIds.includes(recipe.id)
    ).slice(0, 5)

    setRecentRecipes(filteredRecipes.length > 0 ? filteredRecipes : sampleRecipes.slice(0, 3))
  }, [])

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}시간 전`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}일 전`
    }
  }

  if (recentRecipes.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          최근 본 레시피
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentRecipes.map((recipe) => (
            <div key={recipe.id} className="flex gap-3 p-3 border rounded-lg hover:shadow-sm transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                <img 
                  src={recipe.thumbnail} 
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg'
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{recipe.title}</h3>
                
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{recipe.cookingTime}분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{recipe.servings}인분</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  {formatTimeAgo(recipe.viewedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-3">
          모든 최근 레시피 보기
        </Button>
      </CardContent>
    </Card>
  )
}

export default RecentRecipes
