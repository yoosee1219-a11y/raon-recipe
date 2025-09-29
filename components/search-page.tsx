'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Clock, Users, Star, Search, Filter, TrendingUp } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface SearchRecipe {
  id: string;
  title: string;
  thumbnail: string;
  cookingTime: number;
  servings: number;
  rating: number;
  difficulty: string;
  isPremium?: boolean;
  tags: string[];
}

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchRecipe[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [popularSearches] = useState(['김치볶음밥', '된장찌개', '불고기', '떡볶이', '비빔밥'])
  const { toast } = useToast()

  // 샘플 검색 결과 데이터
  const sampleResults: SearchRecipe[] = [
    {
      id: "1",
      title: "김치볶음밥 🍛",
      thumbnail: "/placeholder.jpg",
      cookingTime: 15,
      servings: 2,
      rating: 4.5,
      difficulty: "쉬움",
      isPremium: false,
      tags: ['김치', '볶음밥', '한식', '간단요리']
    },
    {
      id: "2",
      title: "된장찌개 🍲",
      thumbnail: "/placeholder.jpg",
      cookingTime: 20,
      servings: 4,
      rating: 4.8,
      difficulty: "보통",
      isPremium: true,
      tags: ['된장', '찌개', '한식', '국물요리']
    },
    {
      id: "3",
      title: "불고기 🥩",
      thumbnail: "/placeholder.jpg",
      cookingTime: 30,
      servings: 3,
      rating: 4.7,
      difficulty: "보통",
      isPremium: false,
      tags: ['불고기', '고기', '한식', '구이']
    },
    {
      id: "4",
      title: "떡볶이 🌶️",
      thumbnail: "/placeholder.jpg",
      cookingTime: 25,
      servings: 2,
      rating: 4.6,
      difficulty: "쉬움",
      isPremium: false,
      tags: ['떡볶이', '분식', '매운맛', '간식']
    }
  ]

  const handleSearch = async (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 500)) // 검색 시뮬레이션
      
      const filtered = sampleResults.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        recipe.difficulty.toLowerCase().includes(query.toLowerCase())
      )
      
      setSearchResults(filtered)
      
      toast({
        title: "검색 완료",
        description: `"${query}"에 대한 ${filtered.length}개의 결과를 찾았습니다.`
      })
    } catch (error) {
      toast({
        title: "검색 오류",
        description: "검색 중 오류가 발생했습니다.",
        variant: "destructive"
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handlePopularSearch = (term: string) => {
    handleSearch(term)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        {/* 검색 헤더 */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            <Search className="w-8 h-8 text-orange-500" />
            레시피 검색
          </h1>
          
          {/* 메인 검색창 */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="레시피 이름이나 재료를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearch(searchQuery.trim())
                  }
                }}
                className="pl-12 text-lg h-12"
              />
            </div>
            <Button 
              onClick={() => searchQuery.trim() && handleSearch(searchQuery.trim())}
              disabled={isSearching || !searchQuery.trim()}
              className="h-12 px-6"
            >
              {isSearching ? '검색 중...' : '검색'}
            </Button>
          </div>

          {/* 인기 검색어 */}
          {!searchResults.length && !searchQuery && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5" />
                  인기 검색어
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePopularSearch(term)}
                      className="hover:bg-orange-50 hover:border-orange-300"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 검색 결과 */}
        {searchQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                "{searchQuery}" 검색 결과 ({searchResults.length}개)
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>

            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-200" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchResults.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">
                    다른 검색어로 시도해보거나 인기 검색어를 참고해보세요
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {popularSearches.slice(0, 3).map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePopularSearch(term)}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                      
                      {recipe.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            ⭐ 프리미엄
                          </Badge>
                        </div>
                      )}
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
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {recipe.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {recipe.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full">
                        레시피 보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage
