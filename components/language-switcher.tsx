"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <div className="flex rounded-md overflow-hidden border border-gray-300">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-none px-3 py-1 text-xs"
        >
          EN
        </Button>
        <Button
          variant={language === "am" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("am")}
          className="rounded-none px-3 py-1 text-xs"
        >
          አማ
        </Button>
      </div>
    </div>
  )
}
