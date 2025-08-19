"use client"

import type React from "react"

import { Children, cloneElement, isValidElement } from "react"

interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            delay: (child.props.delay || 0) + index * staggerDelay,
          })
        }
        return child
      })}
    </div>
  )
}
