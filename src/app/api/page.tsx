'use client';

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import {useTheme} from "next-themes";
import "/swagger-dark.css"
import {useEffect, useState} from "react";

export default function Api() {
    const { resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <></>
    }

    return <div className={`${resolvedTheme == "dark" && "swagger-dark"}`}>
        <SwaggerUI
            url="/api/swagger.yaml"
        />
    </div>
}