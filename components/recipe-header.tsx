import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, ChefHat } from "lucide-react"

export function RecipeHeader() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">한식 레시피</h1>
          </div>

          <Button variant="outline" size="sm">
            레시피 저장
          </Button>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-balance">김치찌개 만들기 - 집에서 쉽게 따라하는 정통 레시피</h2>

          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>30분</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>2-4인분</span>
            </div>
            <Badge variant="secondary">한식</Badge>
            <Badge variant="secondary">찌개</Badge>
          </div>

          <p className="text-muted-foreground text-pretty">
            집에서 쉽게 만들 수 있는 정통 김치찌개 레시피입니다. 신김치와 돼지고기를 사용해 깊은 맛을 내는 비법을
            알려드립니다.
          </p>
        </div>
      </div>
    </header>
  )
}
