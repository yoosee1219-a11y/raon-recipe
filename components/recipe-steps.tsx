"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Circle, Clock, ChefHat, ShoppingCart, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecipeStep {
  id: number
  title: string
  description: string
  duration: string
  temperature?: string
  tips?: string
  ingredients?: string[]
  tools?: Array<{ name: string; coupangLink?: string }>
  videoTimestamp: number
}

const recipeSteps: RecipeStep[] = [
  {
    id: 1,
    title: "재료 준비하기",
    description: "모든 재료를 손질하고 준비합니다. 김치는 한 입 크기로 자르고, 돼지고기는 적당한 크기로 썰어주세요.",
    duration: "5분",
    videoTimestamp: 0,
    ingredients: ["신김치 200g", "돼지고기 150g", "양파 1/2개"],
    tools: [
      { name: "도마", coupangLink: "https://coupang.com/cutting-board" },
      { name: "칼", coupangLink: "https://coupang.com/knife" },
    ],
    tips: "김치는 너무 작게 자르지 마세요. 식감이 좋아집니다.",
  },
  {
    id: 2,
    title: "김치 볶기",
    description: "팬에 기름을 두르고 김치를 볶아 신맛을 날려줍니다. 중불에서 3-4분간 볶아주세요.",
    duration: "3-4분",
    temperature: "중불",
    videoTimestamp: 45,
    tools: [
      { name: "팬", coupangLink: "https://coupang.com/pan" },
      { name: "주걱", coupangLink: "https://coupang.com/spatula" },
    ],
    tips: "김치에서 수분이 어느 정도 날아가면 됩니다.",
  },
  {
    id: 3,
    title: "고기 넣고 볶기",
    description: "볶은 김치에 돼지고기를 넣고 함께 볶습니다. 고기가 익을 때까지 볶아주세요.",
    duration: "5분",
    temperature: "중불",
    videoTimestamp: 120,
    tips: "고기가 완전히 익을 때까지 충분히 볶아주세요.",
  },
  {
    id: 4,
    title: "물 넣고 끓이기",
    description: "육수나 물을 넣고 끓입니다. 물이 끓기 시작하면 중약불로 줄여주세요.",
    duration: "10분",
    temperature: "중약불",
    videoTimestamp: 180,
    ingredients: ["물 또는 육수 400ml"],
    tips: "육수를 사용하면 더 깊은 맛이 납니다.",
  },
  {
    id: 5,
    title: "양념 넣기",
    description: "고춧가루, 마늘, 국간장을 넣고 간을 맞춥니다. 기호에 따라 양을 조절하세요.",
    duration: "2분",
    videoTimestamp: 240,
    ingredients: ["고춧가루 1큰술", "마늘 3쪽", "국간장 1큰술"],
    tips: "간은 조금씩 넣어가며 맞춰주세요.",
  },
  {
    id: 6,
    title: "마무리하기",
    description: "두부와 대파를 넣고 2-3분 더 끓여 완성합니다. 참기름을 살짝 둘러주면 더 맛있어요.",
    duration: "3분",
    videoTimestamp: 300,
    ingredients: ["두부 1/2모", "대파 1대", "참기름 1작은술"],
    tips: "두부는 너무 오래 끓이면 부서지니 주의하세요.",
  },
]

export function RecipeSteps() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps((prev) => (prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]))
  }

  const jumpToVideoTimestamp = (timestamp: number) => {
    console.log(`[v0] Jumping to video timestamp: ${timestamp}s`)
    // In a real app, this would control the video player
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          조리 과정
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recipeSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Connection Line */}
              {index < recipeSteps.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />}

              <div
                className={cn(
                  "flex gap-4 p-4 rounded-lg border transition-all",
                  currentStep === step.id
                    ? "bg-primary/5 border-primary/20"
                    : completedSteps.includes(step.id)
                      ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                      : "bg-card border-border hover:bg-muted/30",
                )}
              >
                {/* Step Number & Completion */}
                <div className="flex flex-col items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-12 h-12 rounded-full p-0"
                    onClick={() => toggleStepCompletion(step.id)}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Circle
                        className={cn("w-6 h-6", currentStep === step.id ? "text-primary" : "text-muted-foreground")}
                      />
                    )}
                  </Button>
                  <Badge variant={currentStep === step.id ? "default" : "secondary"} className="text-xs">
                    {step.id}단계
                  </Badge>
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </div>
                        {step.temperature && (
                          <Badge variant="outline" className="text-xs">
                            {step.temperature}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => jumpToVideoTimestamp(step.videoTimestamp)}
                      className="text-primary hover:text-primary/80"
                    >
                      영상 보기
                    </Button>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                  {/* Ingredients for this step */}
                  {step.ingredients && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">이 단계 재료:</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.ingredients.map((ingredient, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Required Tools */}
                  {step.tools && (
                    <div>
                      <h5 className="font-medium text-sm mb-2">필요한 도구:</h5>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {tool.name}
                            </Badge>
                            {tool.coupangLink && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-primary hover:text-primary/80"
                                onClick={() => window.open(tool.coupangLink, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {step.tips && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="text-sm">
                        <span className="font-medium text-amber-800 dark:text-amber-200">💡 팁: </span>
                        <span className="text-amber-700 dark:text-amber-300">{step.tips}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Coupang Shopping Section */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-orange-600" />
              <h4 className="font-semibold text-orange-800 dark:text-orange-200">쿠팡에서 재료 주문하기</h4>
            </div>
            <Badge className="bg-orange-600 text-white">파트너스</Badge>
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
            이 레시피에 필요한 모든 재료와 도구를 쿠팡에서 한번에 주문하세요. 파트너스 활동으로 일정 수수료를 받을 수
            있습니다.
          </p>
          <div className="flex gap-2">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              전체 재료 주문
            </Button>
            <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              쿠팡 바로가기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
