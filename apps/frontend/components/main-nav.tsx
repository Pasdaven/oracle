import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
            >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <div className="text-xl font-extrabold">
                Oracle
            </div>
            <Link
                href="/dashboard"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Overview
            </Link>
            <Link
                href="/numeric-event"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Numeric Question
            </Link>
            <Link
                href="/string-event"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                String Question
            </Link>
        </nav>
    )
}