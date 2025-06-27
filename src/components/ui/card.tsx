import * as React from "react"
import { cn } from "@/lib/utils"
type CardVariant = "default" | "gradient" | "soft-dark"

interface CardProps extends React.ComponentProps<"div"> {
  variant?: CardVariant
}

function Card({ className, variant = "default", ...props }: CardProps) {
  const variantClass = {
    default: "bg-white dark:bg-card",
    gradient: "bg-gradient-to-br from-white via-blue-50 to-purple-100",
    "soft-dark": "bg-slate-900 text-white border border-slate-700",
  }[variant]

  return (
    <div
      data-slot="card"
      className={cn(
        variantClass,
        "text-card-foreground flex flex-col gap-5 rounded-2xl border shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
      {...props}
    />
  )
}


function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "px-6 pt-6 flex flex-col gap-1.5",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg font-semibold text-slate-900 dark:text-white", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "self-end mt-auto",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pb-4 text-sm text-slate-700 dark:text-slate-300", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center justify-between px-6 pb-6 pt-4 border-t border-gray-100 dark:border-slate-700", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
