'use client';

import {ThemeToggle} from "@/app/ui/theme-toggle";
import {useState} from "react";
import {PortalCard} from "@/app/ui/portal-card";
import {PortalPair, OverworldPortal, NetherPortal} from "@/app/_data/Portal";

export default function Home() {
    const [portals, setPortals] = useState<PortalPair[]>([
        new PortalPair(new OverworldPortal(1000, 0, 0), new NetherPortal(100, 0, 0), "1"),
        new PortalPair(new OverworldPortal(400, 0, 0), new NetherPortal(50, 0, 0), "1"),
    ]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Portal Linker</h1>

            <div>
                {
                    portals.map((pair) => {
                        return (
                            <PortalCard
                                pair={pair}
                                allPortals={portals}
                                setSelf={(newPair) => {
                                    setPortals(portals.toSpliced(portals.indexOf(pair), 1, newPair));
                                }}
                            />)
                    })
                }
            </div>

            <ThemeToggle></ThemeToggle>
        </main>
    );
}
