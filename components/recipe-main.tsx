"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Heart,
  HeartOff,
  Share2,
  Printer,
  Star,
  Timer,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Mic,
  MicOff,
  ShoppingCart,
  Search,
  Home,
  BookOpen,
  User,
  Clock,
  Users,
  BarChart3,
  Volume2,
  Plus,
  Minus,
  X,
} from "lucide-react";
import RecentRecipes from "./recent-recipes";

// YouTube 컴포넌트를 동적으로 로드 (SSR 방지)
const YouTube = dynamic(() => import("react-youtube"), { ssr: false });

interface Recipe {
  id: string;
  title: string;
  videoUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
  servings: number;
  cookingTime: number;
  difficulty: string;
  rating?: number;
  ratingCount?: number;
  isPremium?: boolean;
  thumbnail?: string;
}

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  coupangLink?: string;
  checked?: boolean;
}

interface Step {
  order: number;
  description: string;
  timestamp: number;
  duration?: number;
  tips?: string;
}

interface Timer {
  id: string;
  duration: number;
  remaining: number;
  label: string;
  isRunning: boolean;
}

// 유틸리티 함수들
function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  return match ? match[1] : "";
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// 로딩 스켈레톤 컴포넌트
const VideoSkeleton = () => (
  <div className="w-full aspect-video">
    <Skeleton className="w-full h-full rounded-lg" />
  </div>
);

// 별점 컴포넌트
const StarRating = ({
  rating,
  onRate,
  readonly = false,
}: {
  rating: number;
  onRate?: (rating: number) => void;
  readonly?: boolean;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onRate?.(star)}
          disabled={readonly}
          className={`${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } transition-transform`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

// 타이머 패널 컴포넌트
const TimerPanel = ({
  timers,
  setTimers,
}: {
  timers: Timer[];
  setTimers: React.Dispatch<React.SetStateAction<Timer[]>>;
}) => {
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isRunning && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1;
            if (newRemaining === 0) {
              // 타이머 완료 알림
              toast({
                title: "타이머 완료! 🔔",
                description: `${timer.label}이(가) 완료되었습니다.`,
                duration: 5000,
              });

              // 알림음 재생
              if (typeof window !== "undefined") {
                const audio = new Audio(
                  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaAC2E0fPTdSMFl"
                );
                audio.play().catch(() => {});
              }

              return { ...timer, isRunning: false };
            }
            return { ...timer, remaining: newRemaining };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimers, toast]);

  const toggleTimer = (id: string) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
      )
    );
  };

  const removeTimer = (id: string) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  if (timers.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          요리 타이머
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {timers.map((timer) => (
            <div
              key={timer.id}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <div className="font-medium">{timer.label}</div>
                <div
                  className={`text-lg font-mono ${
                    timer.remaining <= 10 ? "text-red-500" : ""
                  }`}
                >
                  {formatTime(timer.remaining)}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleTimer(timer.id)}
                >
                  {timer.isRunning ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTimer(timer.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// 음성 명령 패널
const VoiceCommandPanel = ({
  isListening,
  setIsListening,
  onCommand,
}: {
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onCommand: (command: string) => void;
}) => {
  const [transcript, setTranscript] = useState("");

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // 음성 인식 시작 시뮬레이션
      setTranscript("음성 인식을 기다리는 중...");
    } else {
      setTranscript("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="w-5 h-5" />
          음성 명령
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-gray-600">
            "다음 단계", "이전 단계", "타이머 시작" 등을 말해보세요
          </div>

          <Button
            onClick={toggleListening}
            className={`w-full ${
              isListening ? "bg-red-500 hover:bg-red-600" : ""
            }`}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 mr-2" />
            ) : (
              <Mic className="w-4 h-4 mr-2" />
            )}
            {isListening ? "음성 인식 중단" : "음성 인식 시작"}
          </Button>

          {transcript && (
            <div className="p-2 bg-gray-50 rounded text-sm">{transcript}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// 검색 컴포넌트
const RecipeSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="레시피 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// 메인 레시피 컴포넌트
export default function RecipeView({
  recipeId = "sample",
}: {
  recipeId?: string;
}) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [servingMultiplier, setServingMultiplier] = useState([1]);
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  // 샘플 레시피 데이터
  const sampleRecipe: Recipe = {
    id: "sample",
    title: "김치볶음밥 🍛",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ingredients: [
      { name: "김치", amount: "200", unit: "g", coupangLink: "#" },
      { name: "밥", amount: "2", unit: "공기", coupangLink: "#" },
      { name: "돼지고기", amount: "100", unit: "g", coupangLink: "#" },
      { name: "대파", amount: "1", unit: "대", coupangLink: "#" },
      { name: "참기름", amount: "1", unit: "큰술", coupangLink: "#" },
      { name: "간장", amount: "2", unit: "큰술", coupangLink: "#" },
    ],
    steps: [
      {
        order: 1,
        description: "김치를 적당한 크기로 썰어주세요",
        timestamp: 30,
        duration: 120,
        tips: "김치 국물도 함께 사용하면 더 맛있어요",
      },
      {
        order: 2,
        description: "돼지고기를 볶아주세요",
        timestamp: 90,
        duration: 180,
      },
      {
        order: 3,
        description: "김치를 넣고 볶아주세요",
        timestamp: 180,
        duration: 240,
      },
      {
        order: 4,
        description: "밥을 넣고 볶아주세요",
        timestamp: 300,
        duration: 300,
      },
      {
        order: 5,
        description: "양념과 대파를 넣어 마무리하세요",
        timestamp: 420,
        duration: 120,
      },
    ],
    servings: 2,
    cookingTime: 15,
    difficulty: "쉬움",
    rating: 4.5,
    ratingCount: 1234,
    isPremium: false,
  };

  // localStorage 관련 유틸리티
  const getFavorites = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("favoriteRecipes") || "[]");
  };

  const getRecentRecipes = (): string[] => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("recentRecipes") || "[]");
  };

  const addToRecent = (recipeId: string) => {
    if (typeof window === "undefined") return;
    const recent = getRecentRecipes();
    const filtered = recent.filter((id) => id !== recipeId);
    const updated = [recipeId, ...filtered].slice(0, 10);
    localStorage.setItem("recentRecipes", JSON.stringify(updated));
  };

  // 레시피 데이터 로드
  useEffect(() => {
    const loadRecipe = async () => {
      setIsLoading(true);
      try {
        // 실제로는 API에서 가져옴
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
        setRecipe(sampleRecipe);
        addToRecent(recipeId);

        // 즐겨찾기 상태 확인
        const favorites = getFavorites();
        setIsFavorite(favorites.includes(recipeId));
      } catch (error) {
        toast({
          title: "오류",
          description: "레시피를 불러오는데 실패했습니다.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId, toast]);

  // YouTube 플레이어 준비
  const onPlayerReady = (event: any) => {
    setPlayer(event.target);
    setVideoLoading(false);
  };

  // 타임스탬프로 이동
  const jumpToTimestamp = (timestamp: number) => {
    if (player) {
      player.seekTo(timestamp, true);
      player.playVideo();
    }
  };

  // 재료 계산
  const calculateIngredients = (ingredient: Ingredient) => {
    const amount = parseFloat(ingredient.amount) * servingMultiplier[0];
    return `${amount}${ingredient.unit}`;
  };

  // 타이머 추가
  const addTimer = (duration: number, label: string) => {
    const newTimer: Timer = {
      id: Date.now().toString(),
      duration,
      remaining: duration,
      label,
      isRunning: false,
    };
    setTimers([...timers, newTimer]);
    toast({
      title: "타이머 추가됨",
      description: `${label} - ${Math.floor(duration / 60)}분 ${
        duration % 60
      }초`,
    });
  };

  // 즐겨찾기 토글
  const toggleFavorite = () => {
    const favorites = getFavorites();
    let updated: string[];

    if (isFavorite) {
      updated = favorites.filter((id) => id !== recipeId);
      toast({
        title: "즐겨찾기에서 제거",
        description: "레시피가 즐겨찾기에서 제거되었습니다.",
      });
    } else {
      updated = [...favorites, recipeId];
      toast({
        title: "즐겨찾기에 추가",
        description: "레시피가 즐겨찾기에 추가되었습니다.",
      });
    }

    localStorage.setItem("favoriteRecipes", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  // 공유하기
  const shareRecipe = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사됨",
        description: "레시피 링크가 클립보드에 복사되었습니다.",
      });
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "링크 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  // 인쇄하기
  const printRecipe = () => {
    window.print();
  };

  // 평점 매기기
  const rateRecipe = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "평점 등록",
      description: `${rating}점으로 평점을 등록했습니다.`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 pb-20">
        <VideoSkeleton />
        <Skeleton className="h-8 w-3/4 mt-6" />
        <div className="flex gap-4 mt-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-32 w-full mt-6" />
        <MobileNavigation />
      </div>
    );
  }

  if (!recipe)
    return <div className="text-center py-20">레시피를 찾을 수 없습니다.</div>;

  return (
    <div className="container mx-auto p-4">
      <Toaster />

      {/* 검색 기능 */}
      <RecipeSearch
        onSearch={(query) => {
          toast({
            title: "검색",
            description: `"${query}"에 대한 검색 결과를 찾고 있습니다.`,
          });
        }}
      />

      {/* Google AdSense 플레이스홀더 */}
      <div className="bg-gray-100 h-20 flex items-center justify-center mb-6 rounded-lg border-2 border-dashed border-gray-300">
        <span className="text-gray-500 font-medium">
          📢 Google AdSense 광고 영역
        </span>
      </div>

      {/* 비디오 플레이어 */}
      <Card className="mb-6">
        <CardContent className="p-0">
          {videoLoading && <VideoSkeleton />}
          <div className={videoLoading ? "hidden" : "block"}>
            <YouTube
              videoId={getYouTubeId(recipe.videoUrl)}
              onReady={onPlayerReady}
              opts={{
                width: "100%",
                height: "400",
                playerVars: {
                  autoplay: 0,
                  modestbranding: 1,
                },
              }}
              className="w-full aspect-video"
            />
          </div>
        </CardContent>
      </Card>

      {/* 레시피 헤더 */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{recipe.title}</h1>
              {recipe.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  ⭐ 프리미엄
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookingTime}분</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}인분</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={recipe.rating || 0} readonly />
              <span className="text-sm text-gray-600">
                {recipe.rating?.toFixed(1)} (
                {recipe.ratingCount?.toLocaleString()}명)
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorite}
              className="flex items-center gap-1"
            >
              {isFavorite ? (
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
              ) : (
                <HeartOff className="w-4 h-4" />
              )}
              즐겨찾기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareRecipe}
              className="flex items-center gap-1"
            >
              <Share2 className="w-4 h-4" />
              공유
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={printRecipe}
              className="flex items-center gap-1 print:hidden"
            >
              <Printer className="w-4 h-4" />
              인쇄
            </Button>
          </div>
        </div>

        {/* 평점 매기기 */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <span className="font-medium">이 레시피는 어떠셨나요?</span>
            <StarRating rating={userRating} onRate={rateRecipe} />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* 인분 조절 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                인분 조절
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>기본: {recipe.servings}인분</span>
                  <span className="font-bold">
                    조절: {(recipe.servings * servingMultiplier[0]).toFixed(1)}
                    인분
                  </span>
                </div>
                <Slider
                  value={servingMultiplier}
                  onValueChange={setServingMultiplier}
                  max={4}
                  min={0.5}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* 재료 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>🥬 재료</span>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  재료 일괄구매 (쿠팡)
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recipe.ingredients.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="font-medium">{ing.name}</span>
                      <span className="text-orange-600 font-bold">
                        {calculateIngredients(ing)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-orange-600 border-orange-200 hover:bg-orange-50"
                    >
                      🛒 쿠팡에서 구매
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Google AdSense 플레이스홀더 */}
          <div className="bg-gray-100 h-32 flex items-center justify-center mb-6 rounded-lg border-2 border-dashed border-gray-300">
            <span className="text-gray-500 font-medium">
              📢 Google AdSense 배너 광고
            </span>
          </div>

          {/* 조리 순서 */}
          <Card>
            <CardHeader>
              <CardTitle>👩‍🍳 조리 순서</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg transition-all ${
                      currentStep === idx
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "hover:shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="font-bold">
                            {step.order}단계
                          </Badge>
                          {step.duration && (
                            <Badge variant="secondary">
                              <Timer className="w-3 h-3 mr-1" />
                              {Math.floor(step.duration / 60)}분
                            </Badge>
                          )}
                        </div>
                        <p className="mb-2">{step.description}</p>
                        {step.tips && (
                          <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                            💡 {step.tips}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => jumpToTimestamp(step.timestamp)}
                          className="flex items-center gap-1"
                        >
                          <Play className="w-3 h-3" />
                          {formatTime(step.timestamp)}
                        </Button>
                        {step.duration && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              addTimer(step.duration!, `${step.order}단계`)
                            }
                            className="flex items-center gap-1"
                          >
                            <Timer className="w-3 h-3" />
                            타이머
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 */}
        <div className="space-y-6">
          {/* 최근 본 레시피 */}
          <RecentRecipes />

          {/* 타이머 패널 */}
          <TimerPanel timers={timers} setTimers={setTimers} />

          {/* 음성 명령 */}
          <VoiceCommandPanel
            isListening={isListening}
            setIsListening={setIsListening}
            onCommand={(command) => {
              if (command.includes("다음")) {
                setCurrentStep(
                  Math.min(currentStep + 1, recipe.steps.length - 1)
                );
              } else if (command.includes("이전")) {
                setCurrentStep(Math.max(currentStep - 1, 0));
              }
            }}
          />

          {/* Google AdSense 사이드바 */}
          <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <span className="text-gray-500 text-center font-medium">
              📢 Google AdSense
              <br />
              사이드바 광고
            </span>
          </div>
        </div>
      </div>

      {/* 인쇄용 스타일 */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }

          body {
            -webkit-print-color-adjust: exact;
          }

          .container {
            max-width: none !important;
            padding: 0 !important;
          }

          .grid {
            display: block !important;
          }

          .space-y-6 > * + * {
            margin-top: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
