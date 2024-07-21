'use client';

import {useState} from "react";
import {PortalCard} from "@/app/ui/portal-card";
import {PortalPair, OverworldPortal, NetherPortal} from "@/app/_data/Portal";

export default function Home() {
    const [portals, setPortals] = useState<PortalPair[]>([
        new PortalPair(new OverworldPortal(0, 0, 0), new NetherPortal(0, 0, 0), "1"),
    ]);

    return (
        <main className="flex flex-col h-min-full items-center">
            <div>
                {
                    portals.map((pair) => {
                        return (
                            <PortalCard
                                pair={pair}
                                allPortals={portals}
                                setSelf={(newPair) => {
                                    if(newPair == null) {
                                        setPortals(portals.toSpliced(portals.indexOf(pair), 1));
                                    } else {
                                        setPortals(portals.toSpliced(portals.indexOf(pair), 1, newPair));
                                    }
                                }}
                            />)
                    })
                }
                <div className="flex flex-row justify-center w-full">
                    <div className="flex flex-row items-center bg-card rounded-md text-xl p-2 pr-4 cursor-pointer hover:bg-card-hover select-none" onClick={() => setPortals(portals.toSpliced(portals.length, 0, new PortalPair(new OverworldPortal(0, 0, 0), new NetherPortal(0,0,0), (portals.length + 1).toString())))}>
                        <span className="material-symbols-rounded">add</span>Add new Portal-Pair
                    </div>
                </div>
            </div>
        </main>
    );
}
