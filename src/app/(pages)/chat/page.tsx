"use client"
import { useState } from "react"
import { ChevronDown, ChevronLeft, Mic, MoreHorizontal, PanelLeft, Plus, Search, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import Markdown from "react-markdown"

// message type
type Message = {
  id: string
  content: string
  role: "user" | "assistant"
}

// thread type
type ChatThread = {
  id: string
  title: string
  messages: Message[]
}

export default function ChatPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [activeThread, setActiveThread] = useState<string | null>("1")
  const [loading, setLoading] = useState<boolean>(false)

  // sample chat threads
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      id: "1",
      title: "New Research Query",
      messages: [],
    },
    {
      id: "2",
      title: "Machine Learning Research",
      messages: [],
    },
    {
      id: "3",
      title: "Database Systems",
      messages: [],
    },
  ])

  // active thread
  const currentThread = chatThreads.find((thread) => thread.id === activeThread) || chatThreads[0]

  // handle new message
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !activeThread) return

    //user message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: inputValue,
      role: "user",
    }

    // updating chat threads with user messages
    setChatThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === activeThread
          ? {
            ...thread,
            messages: [...thread.messages, newMessage],
            lastUpdated: new Date(),
          }
          : thread,
      ),
    )

    // Clear input
    setInputValue("")
    setLoading(true);

    // ai response
    const aiResponse = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: inputValue
      })
    })
    const data = await aiResponse.json();
    // add ai response to thread
    setLoading(false);
    const assistantResponse: Message = {
      id: `msg-${Date.now() + 1}`,
      content: data.response, // actual AI response
      role: "assistant",
    }

    setChatThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === activeThread
          ? {
            ...thread,
            messages: [...thread.messages, assistantResponse],
            lastUpdated: new Date(),
          }
          : thread
      ))

  }

  // Create a new chat thread
  const createNewChat = () => {
    const newThread: ChatThread = {
      id: `thread-${Date.now()}`,
      title: "New Research Query",
      messages: [],
    }

    setChatThreads((prev) => [newThread, ...prev])
    setActiveThread(newThread.id)
  }

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  return (
    <div className="flex h-screen text-black">
      {/* Sidebar - collapsible */}
      <div
        className={`${sidebarExpanded ? "w-64" : "w-16"}  border-r border-gray-800 flex flex-col h-full transition-all duration-300`}
      >
        <div className="p-4 flex items-center">
          {sidebarExpanded ? (
            <>
              <h2 className="font-mono text-xl">Siphon</h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
                <ChevronLeft size={18} />
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <h2 className="font-mono text-xl">S</h2>
            </div>
          )}
        </div>

        {/* New chat button */}
        <div className={`${sidebarExpanded ? "px-4 py-2" : "flex justify-center py-2"}`}>
          {sidebarExpanded ? (
            <Button
              variant="outline"
              className="w-full flex items-center justify-start gap-2  border-gray-700 hover:bg-gray-700"
              onClick={createNewChat}
            >
              <Plus size={16} />
              <span>New chat</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 hover:bg-transparent"
              onClick={createNewChat}
            >
              <div className="bg-gray-800 p-1 rounded">
                <Plus size={14} />
              </div>
              <span className="text-xs">New chat</span>
            </Button>
          )}
        </div>

        {/* Chat threads - only visible when expanded */}
        {sidebarExpanded && (
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <div className="space-y-1">
              {chatThreads.map((thread) => (
                <Button
                  key={thread.id}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-black hover:text-neon ${activeThread === thread.id ? "bg-black text-neon" : ""}`}
                  onClick={() => setActiveThread(thread.id)}
                >
                  <span className="truncate">{thread.title}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* User account at bottom */}
        <div className={`p-4 ${sidebarExpanded ? "flex items-center gap-2" : "flex flex-col items-center"}`}>
          <Avatar className="h-8 w-8">
            <User size={16} />
          </Avatar>
          {sidebarExpanded ? (
            <span>User Account</span>
          ) : (
            <>
              <span className="text-xs mt-1">User</span>
              <span className="text-xs">Account</span>
            </>
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-800 p-4 flex items-center justify-between">
          {!sidebarExpanded && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <PanelLeft size={18} />
            </Button>
          )}
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <h2 className="font-medium">{currentThread?.title || "New Research Query"}</h2>
            <ChevronDown size={16} className="cursor-pointer" />
          </div>
          <div className="flex-1 flex justify-end items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search size={18} />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
            </Button>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {currentThread && currentThread.messages.length > 0 ? (
            currentThread.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-3xl rounded-lg p-4 ${message.role === "assistant" ? "" : "bg-black text-neon"}`}
                >
                  
                    <Markdown>{message.content}</Markdown>
       
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h2 className="text-3xl font-semibold mb-4">What research topic can I help with?</h2>
              <p className="text-gray-400 max-w-md">
                Enter your research title or topic, and I&apos;ll find the most relevant scholarly resources for you.
              </p>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-800">
          <div className="max-w-4xl mx-auto relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your research..."
              className=" border-gray-700 text-black pr-24 py-6 rounded-full"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full text-gray-400">
                <Mic size={18} />
              </Button>
              <Button
                size="icon"
                className="rounded-full"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Siphon searches scholarly sources to provide accurate research information.
          </p>
        </div>
      </div>
    </div>
  )
}
