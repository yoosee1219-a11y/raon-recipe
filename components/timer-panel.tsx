"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Timer, Play, Pause, Square, Plus, Bell, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface CookingTimer {
  id: string
  name: string
  duration: number // in seconds
  remaining: number
  isActive: boolean
  isCompleted: boolean
  step?: number
}

const presetTimers = [
  { name: "김치 볶기", duration: 180, step: 2 }, // 3 minutes
  { name: "고기 익히기", duration: 300, step: 3 }, // 5 minutes
  { name: "끓이기", duration: 600, step: 4 }, // 10 minutes
  { name: "마무리", duration: 120, step: 6 }, // 2 minutes
]

export function TimerPanel() {
  const [timers, setTimers] = useState<CookingTimer[]>([])
  const [customMinutes, setCustomMinutes] = useState("")
  const [customName, setCustomName] = useState("")
  const intervalRef = useRef<NodeJS.Timeout>()

  // Timer tick effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (!timer.isActive || timer.remaining <= 0) return timer

          const newRemaining = timer.remaining - 1

          // Timer completed
          if (newRemaining <= 0) {
            // Play notification sound (simulated)
            if (typeof window !== "undefined") {
              console.log(`[v0] Timer "${timer.name}" completed!`)
              // In a real app, you'd play an actual sound here
            }

            return {
              ...timer,
              remaining: 0,
              isActive: false,
              isCompleted: true,
            }
          }

          return {
            ...timer,
            remaining: newRemaining,
          }
        }),
      )
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addPresetTimer = (preset: (typeof presetTimers)[0]) => {
    const newTimer: CookingTimer = {
      id: `timer-${Date.now()}`,
      name: preset.name,
      duration: preset.duration,
      remaining: preset.duration,
      isActive: false,
      isCompleted: false,
      step: preset.step,
    }
    setTimers((prev) => [...prev, newTimer])
  }

  const addCustomTimer = () => {
    if (!customMinutes || !customName) return

    const duration = Number.parseInt(customMinutes) * 60
    const newTimer: CookingTimer = {
      id: `timer-${Date.now()}`,
      name: customName,
      duration,
      remaining: duration,
      isActive: false,
      isCompleted: false,
    }

    setTimers((prev) => [...prev, newTimer])
    setCustomMinutes("")
    setCustomName("")
  }

  const startTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) => (timer.id === id ? { ...timer, isActive: true, isCompleted: false } : timer)),
    )
  }

  const pauseTimer = (id: string) => {
    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, isActive: false } : timer)))
  }

  const stopTimer = (id: string) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.id === id ? { ...timer, isActive: false, remaining: timer.duration, isCompleted: false } : timer,
      ),
    )
  }

  const removeTimer = (id: string) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id))
  }

  const getTimerProgress = (timer: CookingTimer): number => {
    return ((timer.duration - timer.remaining) / timer.duration) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          요리 타이머
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preset Timers */}
        <div>
          <h4 className="font-semibold text-sm mb-2">단계별 타이머</h4>
          <div className="grid grid-cols-2 gap-2">
            {presetTimers.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => addPresetTimer(preset)}
                className="h-auto p-3 flex flex-col items-start"
              >
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs font-medium">{preset.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{Math.floor(preset.duration / 60)}분</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Timer */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm">사용자 타이머</h4>
          <div className="flex gap-2">
            <Input
              placeholder="타이머 이름"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="flex-1"
            />
            <Input
              type="number"
              placeholder="분"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-16"
            />
            <Button size="sm" onClick={addCustomTimer} disabled={!customName || !customMinutes}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Active Timers */}
        {timers.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">활성 타이머</h4>
            {timers.map((timer) => (
              <div
                key={timer.id}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  timer.isCompleted
                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                    : timer.isActive
                      ? "bg-primary/5 border-primary/20 timer-active"
                      : "bg-muted/30 border-border",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{timer.name}</span>
                    {timer.step && (
                      <Badge variant="secondary" className="text-xs">
                        단계 {timer.step}
                      </Badge>
                    )}
                    {timer.isCompleted && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        완료
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTimer(timer.id)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={cn(
                      "font-mono text-lg font-bold",
                      timer.isCompleted
                        ? "text-green-600"
                        : timer.remaining <= 60 && timer.isActive
                          ? "text-destructive animate-pulse"
                          : "text-foreground",
                    )}
                  >
                    {formatTime(timer.remaining)}
                  </span>
                  <div className="flex gap-1">
                    {!timer.isCompleted && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => (timer.isActive ? pauseTimer(timer.id) : startTimer(timer.id))}
                          className="h-8 w-8 p-0"
                        >
                          {timer.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => stopTimer(timer.id)} className="h-8 w-8 p-0">
                          <Square className="w-3 h-3" />
                        </Button>
                      </>
                    )}
                    {timer.isCompleted && (
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-green-600">
                        <Bell className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-1000",
                      timer.isCompleted
                        ? "bg-green-500"
                        : timer.remaining <= 60 && timer.isActive
                          ? "bg-destructive"
                          : "bg-primary",
                    )}
                    style={{ width: `${getTimerProgress(timer)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {timers.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Timer className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">타이머를 추가해보세요</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
