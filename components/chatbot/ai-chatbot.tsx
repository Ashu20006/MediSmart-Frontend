"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Mic } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const predefinedResponses = {
  "book appointment":
    "To book an appointment: 1) Log in to your patient dashboard, 2) Click 'Find Doctor' tab, 3) Search by specialty or doctor name, 4) Select available time slots, 5) Confirm your booking. You'll receive a confirmation email with appointment details.",
  appointment:
    "To book an appointment: 1) Log in to your patient dashboard, 2) Click 'Find Doctor' tab, 3) Search by specialty or doctor name, 4) Select available time slots, 5) Confirm your booking. You'll receive a confirmation email with appointment details.",
  services:
    "MediSmart provides comprehensive healthcare services including: • Online doctor consultations • Appointment booking system • Prescription management • Emergency SOS feature • 24/7 medical support • Specialist referrals • Health record management • Telemedicine video calls",
  "contact doctor":
    "You can contact a doctor through multiple ways: 1) Book an appointment via 'Find Doctor' in your dashboard, 2) Use video consultation for immediate needs, 3) Send messages through the patient portal, 4) For emergencies, use the red SOS button for instant connection to on-call doctors.",
  doctor:
    "You can contact a doctor through multiple ways: 1) Book an appointment via 'Find Doctor' in your dashboard, 2) Use video consultation for immediate needs, 3) Send messages through the patient portal, 4) For emergencies, use the red SOS button for instant connection to on-call doctors.",
  hello: "Hello! I'm MediSmart AI Assistant. How can I help you with your healthcare needs today?",
  hi: "Hi there! I'm here to help you with any questions about MediSmart services.",
  emergency:
    "For medical emergencies, please call 911 immediately or use the SOS button in your patient dashboard for urgent assistance.",
  prescription:
    "You can view and download your prescriptions from the 'My Prescriptions' section in your patient dashboard.",
  register:
    "To register, click on 'Register' in the top navigation. Choose whether you're a patient or doctor and fill out the required information.",
  login: "You can log in using the 'Login' button in the top navigation. Use your registered email and password.",
  help: "I can help you with information about appointments, prescriptions, doctor searches, registration, and general platform navigation. What would you like to know?",
  default:
    "I'm here to help! You can ask me about:\n• How to book an appointment\n• What services we provide\n• How to contact a doctor\n• Registration and login\n• Any other MediSmart services\n\nFor complex medical questions, please consult with our qualified doctors.",
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your MediSmart AI Assistant. I can help you with appointments, prescriptions, finding doctors, and navigating our platform. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (key !== "default" && message.includes(key)) {
        return response
      }
    }

    return predefinedResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        size="icon"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-sm sm:w-80 sm:max-w-md h-[70vh] max-h-[500px] shadow-2xl border-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg p-3 sm:p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                <CardTitle className="text-base sm:text-lg">MediSmart AI Assistant</CardTitle>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-7 w-7 sm:h-8 sm:w-8"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm opacity-90">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              Online - Ready to help
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col min-h-0">
            <ScrollArea className="flex-1 p-3 sm:p-4 min-h-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm whitespace-pre-line ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-br-sm"
                          : "bg-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                      <div className="flex gap-1 items-center">
                        <span className="text-sm text-gray-600 mr-2">AI is typing</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-3 sm:p-4 border-t flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  disabled={true}
                  variant="outline"
                  size="icon"
                  className="opacity-50 cursor-not-allowed bg-transparent h-9 w-9 sm:h-10 sm:w-10"
                  title="Voice input (coming soon)"
                >
                  <Mic className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-9 w-9 sm:h-10 sm:w-10"
                  size="icon"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by MediSmart AI • Ready for API integration
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
