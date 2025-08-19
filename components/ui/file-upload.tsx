"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Upload, ImageIcon, Video } from "lucide-react"
import { uploadToCloudinary, uploadVideoToCloudinary } from "@/lib/cloudinary"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload: (urls: string[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
  allowVideo?: boolean
  className?: string
}

export function FileUpload({
  onUpload,
  maxFiles = 5,
  acceptedTypes = ["image/*"],
  allowVideo = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    const validFiles = selectedFiles.filter((file) => {
      if (allowVideo) {
        return file.type.startsWith("image/") || file.type.startsWith("video/")
      }
      return file.type.startsWith("image/")
    })

    setFiles((prev) => [...prev, ...validFiles].slice(0, maxFiles))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadPromises = files.map(async (file, index) => {
        const isVideo = file.type.startsWith("video/")
        const url = isVideo ? await uploadVideoToCloudinary(file) : await uploadToCloudinary(file)

        setUploadProgress(((index + 1) / files.length) * 100)
        return url
      })

      const urls = await Promise.all(uploadPromises)
      onUpload(urls)
      setFiles([])
      setUploadProgress(0)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploading(false)
    }
  }

  const acceptString = allowVideo ? "image/*,video/*" : acceptedTypes.join(",")

  return (
    <div className={cn("space-y-4", className)}>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptString}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          <div className="flex justify-center">
            {allowVideo ? (
              <div className="flex space-x-2">
                <ImageIcon className="h-8 w-8 text-gray-400" />
                <Video className="h-8 w-8 text-gray-400" />
              </div>
            ) : (
              <ImageIcon className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <p className="text-sm text-gray-600">{allowVideo ? "Upload images or videos" : "Upload images"}</p>
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selected Files:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  {file.type.startsWith("video/") ? (
                    <Video className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-green-500" />
                  )}
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {files.length > 0 && !uploading && (
        <Button onClick={handleUpload} className="w-full">
          Upload {files.length} {files.length === 1 ? "File" : "Files"}
        </Button>
      )}
    </div>
  )
}
