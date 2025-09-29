"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, VolumeX, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceCommand {
  korean: string
  english: string
  action: string
  category: "navigation" | "timer" | "video" | "general"
}

const voiceCommands: VoiceCommand[] = [
  // Navigation commands
  { korean: "다음 단계", english: "next step", action: "nextStep", category: "navigation" },
  { korean: "이전 단계", english: "previous step", action: "prevStep", category: "navigation" },
  { korean: "첫 번째 단계", english: "first step", action: "firstStep", category: "navigation" },
  { korean: "마지막 단계", english: "last step", action: "lastStep", category: "navigation" },

  // Video commands
  { korean: "재생", english: "play", action: "play", category: "video" },
  { korean: "일시정지", english: "pause", action: "pause", category: "video" },
  { korean: "10초 뒤로", english: "back 10 seconds", action: "rewind", category: "video" },
  { korean: "10초 앞으로", english: "forward 10 seconds", action: "forward", category: "video" },

  // Timer commands
  { korean: "타이머 시작", english: "start timer", action: "startTimer", category: "timer" },
  { korean: "타이머 정지", english: "stop timer", action: "stopTimer", category: "timer" },
  { korean: "3분 타이머", english: "3 minute timer", action: "timer3", category: "timer" },
  { korean: "5분 타이머", english: "5 minute timer", action: "timer5", category: "timer" },
  { korean: "10분 타이머", english: "10 minute timer", action: "timer10", category: "timer" },

  // General commands
  { korean: "도움말", english: "help", action: "help", category: "general" },
  { korean: "재료 보기", english: "show ingredients", action: "showIngredients", category: "general" },
  { korean: "인분 변경", english: "change servings", action: "changeServings", category: "general" },
]

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [confidence, setConfidence] = useState<number>(0)
  const [transcript, setTranscript] = useState<string>("")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.lang = "ko-KR"
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ""
          let interimTranscript = ""

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          setTranscript(interimTranscript || finalTranscript)

          if (finalTranscript) {
            processVoiceCommand(finalTranscript, event.results[event.resultIndex][0].confidence)
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.log("[v0] Speech recognition error:", event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
          setTranscript("")
        }
      }
    }
  }, [])

  const processVoiceCommand = (transcript: string, confidence: number) => {
    const normalizedTranscript = transcript.toLowerCase().trim()
    setConfidence(confidence)

    // Find matching command
    const matchedCommand = voiceCommands.find((cmd) => normalizedTranscript.includes(cmd.korean.toLowerCase()))

    if (matchedCommand && confidence > 0.7) {
      setLastCommand(matchedCommand.korean)
      executeCommand(matchedCommand.action)
    } else {
      setLastCommand(`인식 실패: "${transcript}"`)
    }
  }

  const executeCommand = (action: string) => {
    console.log(`[v0] Executing voice command: ${action}`)

    switch (action) {
      case "nextStep":
        // Simulate next step action
        console.log("[v0] Moving to next step")
        break
      case "prevStep":
        console.log("[v0] Moving to previous step")
        break
      case "play":
        console.log("[v0] Playing video")
        break
      case "pause":
        console.log("[v0] Pausing video")
        break
      case "startTimer":
        console.log("[v0] Starting timer")
        break
      case "timer3":
        console.log("[v0] Setting 3 minute timer")
        break
      case "timer5":
        console.log("[v0] Setting 5 minute timer")
        break
      case "timer10":
        console.log("[v0] Setting 10 minute timer")
        break
      case "help":
        console.log("[v0] Showing help")
        break
      default:
        console.log(`[v0] Unknown command: ${action}`)
    }

    // Provide audio feedback (simulated)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("명령을 실행했습니다")
      utterance.lang = "ko-KR"
      utterance.rate = 0.8
      utterance.volume = 0.5
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setIsListening(true)
      setLastCommand("")
      setTranscript("")
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      setTranscript("")
    }
  }

  const categoryColors = {
    navigation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    video: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    timer: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    general: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  const categoryNames = {
    navigation: "탐색",
    video: "영상",
    timer: "타이머",
    general: "일반",
  }

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <VolumeX className="w-5 h-5" />
            음성 명령
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Headphones className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">음성 인식이 지원되지 않는 브라우저입니다</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          음성 명령
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Voice Control Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant={isListening ? "destructive" : "default"}
            onClick={isListening ? stopListening : startListening}
            className={cn("w-full h-16", isListening && "voice-recording animate-pulse")}
          >
            {isListening ? <MicOff className="w-6 h-6 mr-2" /> : <Mic className="w-6 h-6 mr-2" />}
            {isListening ? "음성 인식 중지" : "음성 인식 시작"}
          </Button>
        </div>

        {/* Live Transcript */}
        {isListening && (
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">실시간 인식:</div>
            <div className="font-mono text-sm">
              {transcript || "말씀해 주세요..."}
              <span className="animate-pulse">|</span>
            </div>
          </div>
        )}

        {/* Last Command */}
        {lastCommand && (
          <div className="p-3 bg-primary/5 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">마지막 명령:</div>
            <div className="font-medium">{lastCommand}</div>
            {confidence > 0 && (
              <div className="text-xs text-muted-foreground mt-1">신뢰도: {Math.round(confidence * 100)}%</div>
            )}
          </div>
        )}

        {/* Available Commands */}
        <div>
          <h4 className="font-semibold text-sm mb-3">사용 가능한 명령어</h4>
          <div className="space-y-3">
            {Object.entries(
              voiceCommands.reduce(
                (acc, cmd) => {
                  if (!acc[cmd.category]) acc[cmd.category] = []
                  acc[cmd.category].push(cmd)
                  return acc
                },
                {} as Record<string, VoiceCommand[]>,
              ),
            ).map(([category, commands]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={categoryColors[category as keyof typeof categoryColors]}>
                    {categoryNames[category as keyof typeof categoryNames]}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {commands.map((cmd, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded text-sm">
                      <span className="font-medium">"{cmd.korean}"</span>
                      <span className="text-muted-foreground text-xs">{cmd.english}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="bg-muted/30 p-3 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">사용 팁</h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 명확하고 천천히 말씀해 주세요</li>
            <li>• 조용한 환경에서 사용하세요</li>
            <li>• 마이크 권한을 허용해 주세요</li>
            <li>• 명령어는 정확히 발음해 주세요</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
