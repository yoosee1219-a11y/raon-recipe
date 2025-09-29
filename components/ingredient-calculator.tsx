"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Users, ShoppingCart, ExternalLink } from "lucide-react"

interface Ingredient {
  id: string
  name: string
  baseAmount: number
  unit: string
  category: "main" | "seasoning" | "garnish"
  coupangLink?: string
  essential: boolean
}

const baseIngredients: Ingredient[] = [
  {
    id: "kimchi",
    name: "신김치",
    baseAmount: 200,
    unit: "g",
    category: "main",
    coupangLink: "https://coupang.com/kimchi",
    essential: true,
  },
  {
    id: "pork",
    name: "돼지고기 (목살)",
    baseAmount: 150,
    unit: "g",
    category: "main",
    coupangLink: "https://coupang.com/pork",
    essential: true,
  },
  {
    id: "tofu",
    name: "두부",
    baseAmount: 0.5,
    unit: "모",
    category: "main",
    coupangLink: "https://coupang.com/tofu",
    essential: false,
  },
  {
    id: "onion",
    name: "양파",
    baseAmount: 0.5,
    unit: "개",
    category: "main",
    essential: false,
  },
  {
    id: "scallion",
    name: "대파",
    baseAmount: 1,
    unit: "대",
    category: "garnish",
    essential: false,
  },
  {
    id: "garlic",
    name: "마늘",
    baseAmount: 3,
    unit: "쪽",
    category: "seasoning",
    essential: true,
  },
  {
    id: "gochugaru",
    name: "고춧가루",
    baseAmount: 1,
    unit: "큰술",
    category: "seasoning",
    coupangLink: "https://coupang.com/gochugaru",
    essential: true,
  },
  {
    id: "soy-sauce",
    name: "국간장",
    baseAmount: 1,
    unit: "큰술",
    category: "seasoning",
    coupangLink: "https://coupang.com/soy-sauce",
    essential: true,
  },
  {
    id: "sesame-oil",
    name: "참기름",
    baseAmount: 1,
    unit: "작은술",
    category: "seasoning",
    coupangLink: "https://coupang.com/sesame-oil",
    essential: false,
  },
  {
    id: "water",
    name: "물 (또는 육수)",
    baseAmount: 400,
    unit: "ml",
    category: "main",
    essential: true,
  },
]

export function IngredientCalculator() {
  const [servings, setServings] = useState(2)
  const [showOptional, setShowOptional] = useState(true)

  const calculateAmount = (baseAmount: number, servings: number): string => {
    const calculated = (baseAmount * servings) / 2 // Base recipe is for 2 servings

    // Handle different units appropriately
    if (calculated < 1 && calculated > 0) {
      return (calculated * 10) % 10 === 0 ? calculated.toString() : calculated.toFixed(1)
    }
    return Math.round(calculated * 10) / 10 === Math.round(calculated)
      ? Math.round(calculated).toString()
      : (Math.round(calculated * 10) / 10).toString()
  }

  const filteredIngredients = showOptional
    ? baseIngredients
    : baseIngredients.filter((ingredient) => ingredient.essential)

  const groupedIngredients = {
    main: filteredIngredients.filter((ing) => ing.category === "main"),
    seasoning: filteredIngredients.filter((ing) => ing.category === "seasoning"),
    garnish: filteredIngredients.filter((ing) => ing.category === "garnish"),
  }

  const categoryNames = {
    main: "주재료",
    seasoning: "양념",
    garnish: "고명",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          재료 계산기
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Serving Size Selector */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4" />
            <span className="font-medium">인분 선택</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((size) => (
              <Button
                key={size}
                variant={servings === size ? "default" : "outline"}
                size="sm"
                onClick={() => setServings(size)}
                className="h-12 flex flex-col"
              >
                <span className="text-lg font-bold">{size}</span>
                <span className="text-xs">인분</span>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Toggle Optional Ingredients */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">선택 재료 포함</span>
          <Button variant="ghost" size="sm" onClick={() => setShowOptional(!showOptional)} className="text-xs">
            {showOptional ? "필수만 보기" : "전체 보기"}
          </Button>
        </div>

        {/* Ingredients List */}
        <div className="space-y-4">
          {Object.entries(groupedIngredients).map(([category, ingredients]) => {
            if (ingredients.length === 0) return null

            return (
              <div key={category}>
                <h4 className="font-semibold text-sm mb-2 text-muted-foreground">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h4>
                <div className="space-y-2">
                  {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ingredient.name}</span>
                          {!ingredient.essential && (
                            <Badge variant="secondary" className="text-xs">
                              선택
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-mono font-semibold text-primary">
                            {calculateAmount(ingredient.baseAmount, servings)}
                          </span>
                          <span className="ml-1">{ingredient.unit}</span>
                        </div>
                      </div>

                      {ingredient.coupangLink && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => window.open(ingredient.coupangLink, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <Separator />

        {/* Shopping List Button */}
        <div className="space-y-2">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            onClick={() => window.open("https://coupang.com/recipe-ingredients", "_blank")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            쿠팡에서 한번에 주문하기
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => window.open("https://coupang.com/fresh-ingredients", "_blank")}
            >
              신선식품 주문
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => window.open("https://coupang.com/cooking-tools", "_blank")}
            >
              조리도구 보기
            </Button>
          </div>
        </div>

        {/* Recipe Summary */}
        <div className="bg-primary/5 p-3 rounded-lg">
          <div className="text-sm">
            <div className="font-semibold mb-1">{servings}인분 기준</div>
            <div className="text-muted-foreground">
              • 조리시간: 약 30분
              <br />• 난이도: 쉬움
              <br />• 칼로리: 약 {Math.round((320 * servings) / 2)}kcal
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center p-2 bg-muted/20 rounded">
          쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
        </div>
      </CardContent>
    </Card>
  )
}
