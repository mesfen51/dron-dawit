"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  quickReplies?: string[]
}

interface ChatbotResponse {
  text: string
  quickReplies?: string[]
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Hello! I'm Dron's virtual assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date(),
        quickReplies: ["Services", "Properties", "Contact Info", "Business Hours"],
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  const getBotResponse = (userMessage: string): ChatbotResponse => {
    const message = userMessage.toLowerCase()

    // Services related
    if (message.includes("service") || message.includes("aluminum") || message.includes("work")) {
      return {
        text: "We offer comprehensive aluminum works including:\n\n• Window and door installations\n• Aluminum fabrication\n• Custom metalwork\n• Repairs and maintenance\n\nPrices start from $200. Would you like to know more about a specific service?",
        quickReplies: ["Get Quote", "View Services", "Contact Us"],
      }
    }

    // Properties related
    if (
      message.includes("property") ||
      message.includes("house") ||
      message.includes("home") ||
      message.includes("rent")
    ) {
      return {
        text: "We have various properties available:\n\n• Houses for rent and sale\n• Commercial properties\n• Competitive pricing\n• Prime locations\n\nWould you like to browse our current listings?",
        quickReplies: ["View Properties", "Rental Info", "Contact Agent"],
      }
    }

    // Cars related
    if (message.includes("car") || message.includes("vehicle") || message.includes("auto")) {
      return {
        text: "We offer quality vehicles:\n\n• Cars for sale\n• Rental services\n• Various models available\n• Competitive prices\n\nWhat type of vehicle are you looking for?",
        quickReplies: ["View Cars", "Rental Rates", "Contact Sales"],
      }
    }

    // Contact information
    if (
      message.includes("contact") ||
      message.includes("phone") ||
      message.includes("email") ||
      message.includes("address")
    ) {
      return {
        text: "Here's how to reach us:\n\n📞 Phone: +251 911 123 456\n📧 Email: info@dron.et\n📍 Address: 123 Business Street, Addis Ababa\n🚨 Emergency: +251 911 999 888\n\nYou can also follow us on social media!",
        quickReplies: ["Call Now", "Send Email", "Get Directions", "Social Media"],
      }
    }

    // Business hours
    if (message.includes("hour") || message.includes("time") || message.includes("open") || message.includes("close")) {
      return {
        text: "Our business hours:\n\n🕐 Monday - Friday: 8:00 AM - 6:00 PM\n🕐 Saturday: 9:00 AM - 4:00 PM\n🕐 Sunday: Closed\n\n⚡ Emergency services available 24/7",
        quickReplies: ["Emergency Contact", "Schedule Visit", "Contact Us"],
      }
    }

    // Pricing
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("quote") ||
      message.includes("rate")
    ) {
      return {
        text: "Our pricing varies by service:\n\n• Aluminum works: Starting from $200\n• Property rentals: $500-2000/month\n• Car rentals: $30-80/day\n• Custom quotes available\n\nWould you like a detailed quote?",
        quickReplies: ["Get Quote", "View Services", "Contact Sales"],
      }
    }

    // About/Owner
    if (
      message.includes("about") ||
      message.includes("owner") ||
      message.includes("dawit") ||
      message.includes("company")
    ) {
      return {
        text: "Dron is led by Dawit Habtamu Gugesa, a qualified engineer with:\n\n• Mechanical Engineering degree\n• Business Management diploma\n• 10+ years experience\n• Professional certifications\n\nWe're committed to quality and customer satisfaction!",
        quickReplies: ["Learn More", "View Projects", "Contact Owner"],
      }
    }

    // Emergency
    if (message.includes("emergency") || message.includes("urgent") || message.includes("help")) {
      return {
        text: "For emergencies, please call our 24/7 hotline:\n\n🚨 Emergency: +251 911 999 888\n\nAvailable for:\n• Urgent aluminum repairs\n• Property emergencies\n• Critical automotive issues\n\nIs this an emergency?",
        quickReplies: ["Call Emergency", "Regular Contact", "More Info"],
      }
    }

    // Default response
    return {
      text: "I'd be happy to help! I can assist you with:\n\n• Our services and pricing\n• Property listings\n• Vehicle sales and rentals\n• Contact information\n• Business hours\n\nWhat would you like to know more about?",
      quickReplies: ["Services", "Properties", "Cars", "Contact Info"],
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        quickReplies: botResponse.quickReplies,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="mr-2 h-4 w-4" />
              Dron Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%]`}>
                    {message.isBot && (
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 text-sm ${
                        message.isBot ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>
                      {message.quickReplies && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.quickReplies.map((reply, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="cursor-pointer hover:bg-blue-50 text-xs"
                              onClick={() => handleQuickReply(reply)}
                            >
                              {reply}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-blue-600" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
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
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} size="icon" disabled={!inputValue.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
