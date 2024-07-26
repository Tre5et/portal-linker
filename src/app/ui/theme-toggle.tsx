'use client';

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import {Button} from "@/app/ui/button";

export function ThemeToggle({...rest} : React.ComponentPropsWithoutRef<"div">) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div
                {...rest}
            >
            <span
                className="material-symbols-rounded text-center select-none translate-y-1"
            >
                light_mode
            </span>
            </div>
        )
    }

    return (
        <div
            {...rest}
        >
            <Button
                className="material-symbols-rounded text-center bg-transparent hover:bg-transparent py-0 px-0 border-none"
                onClick={() => resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")}
            >
                <p className="hidden dark:block">light_mode</p>
                <p className="block dark:hidden">dark_mode</p>
            </Button>
        </div>
    )
}