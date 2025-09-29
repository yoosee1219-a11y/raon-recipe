"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Clock } from "lucide-react"

interface VideoTimestamp {
  time: number
  step: number
  title: string
  description: string
}

const videoTimestamps: VideoTimestamp[] = [
  { time: 0, step: 1, title: "재료 준비", description: "김치, 돼지고기, 양파 등 재료 준비" },
  { time: 45, step: 2, title: "김치 볶기", description: "팬에 김치를 볶아 신맛 제거" },
  { time: 120, step: 3, title: "고기 넣기", description: "돼지고기를 넣고 함께 볶기" },
  { time: 180, step: 4, title: "물 넣기", description: "육수나 물을 넣고 끓이기" },
  { time: 240, step: 5, title: "양념하기", description: "고춧가루, 마늘 등 양념 추가" },
  { time: 300, step: 6, title: "완성", description: "두부와 파를 넣고 마무리" },
]

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(360) // 6 minutes
  const [volume, setVolume] = useState([80])
  const [currentStep, setCurrentStep] = useState(1)
  const videoRef = useRef<HTMLDivElement>(null)

  // Simulate video time updates
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = Math.min(prev + 1, duration)

          // Update current step based on timestamp
          const currentTimestamp = videoTimestamps.find((timestamp, index) => {
            const nextTimestamp = videoTimestamps[index + 1]
            return newTime >= timestamp.time && (!nextTimestamp || newTime < nextTimestamp.time)
          })

          if (currentTimestamp && currentTimestamp.step !== currentStep) {
            setCurrentStep(currentTimestamp.step)
          }

          return newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep, duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSeek = (time: number) => {
    setCurrentTime(time)
    const timestamp = videoTimestamps.find((ts, index) => {
      const nextTs = videoTimestamps[index + 1]
      return time >= ts.time && (!nextTs || time < nextTs.time)
    })
    if (timestamp) {
      setCurrentStep(timestamp.step)
    }
  }

  const jumpToStep = (step: number) => {
    const timestamp = videoTimestamps.find((ts) => ts.step === step)
    if (timestamp) {
      handleSeek(timestamp.time)
    }
  }

  const currentTimestamp = videoTimestamps.find((ts) => ts.step === currentStep)

  return (
    <Card className="overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
        <div
          ref={videoRef}
          className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
        >
          {/* Simulated Video Content */}
          <div className="text-center text-white">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play className="w-12 h-12 text-primary" />
            </div>
            <p className="text-lg font-medium">김치찌개 만들기</p>
            <p className="text-sm text-gray-300">YouTube 영상 플레이어</p>
          </div>
        </div>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center gap-3 mb-3">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => handleSeek(Math.max(0, currentTime - 10))}
            >
              <SkipBack className="w-4 h-4" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
            >
              <SkipForward className="w-4 h-4" />
            </Button>

            <div className="flex-1 mx-4">
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                onValueChange={([value]) => handleSeek(value)}
                className="w-full"
              />
            </div>

            <span className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-white" />
              <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="w-20" />
            </div>

            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Current Step Info */}
      {currentTimestamp && (
        <div className="p-4 bg-primary/5 border-b border-border">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="bg-primary">
              단계 {currentTimestamp.step}
            </Badge>
            <div>
              <h3 className="font-semibold text-foreground">{currentTimestamp.title}</h3>
              <p className="text-sm text-muted-foreground">{currentTimestamp.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Timestamp Navigation */}
      <div className="p-4">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          단계별 이동
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {videoTimestamps.map((timestamp) => (
            <Button
              key={timestamp.step}
              variant={currentStep === timestamp.step ? "default" : "outline"}
              size="sm"
              className="justify-start text-left h-auto p-3"
              onClick={() => jumpToStep(timestamp.step)}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono">{formatTime(timestamp.time)}</span>
                  <Badge variant="secondary" className="text-xs">
                    {timestamp.step}
                  </Badge>
                </div>
                <div className="text-xs font-medium">{timestamp.title}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
