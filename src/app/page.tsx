'use client';

import {useState} from "react";
import {PortalCard} from "@/app/ui/portal-card";
import {PortalPair, OverworldPortal, NetherPortal} from "@/app/_data/Portal";
import {Download} from "@/app/ui/download";
import {Upload} from "@/app/ui/upload";
import {Button} from "@/app/ui/button";
import {Logging} from "@/app/ui/logging";

export default function Home() {
    const [portals, setPortals] = useState<PortalPair[]>([
        new PortalPair(new OverworldPortal(0, 0, 0), new NetherPortal(0, 0, 0), "1"),
    ]);

    return (
        <main className="flex flex-col h-min-full items-center">
            <Logging/>
            <div className="pl-36 pr-80 w flex flex-row items-center justify-around w-card">
                <div className="dimension-hint overworld text-lg text-hint">
                    Overworld Coordinates
                </div>
                <div className="dimension-hint nether text-lg text-hint">
                    Nether Coordinates
                </div>
            </div>
            <div>
                {
                    portals.map((pair) => {
                        return (
                            <PortalCard
                                key={portals.indexOf(pair)}
                                pair={pair}
                                allPortals={portals}
                                setSelf={(newPair) => {
                                    if(newPair == null) {
                                        if(portals.length > 1) {
                                            setPortals(portals.toSpliced(portals.indexOf(pair), 1));
                                        }
                                    } else {
                                        setPortals(portals.toSpliced(portals.indexOf(pair), 1, newPair));
                                    }
                                }}
                            />)
                    })
                }
                <div className="flex flex-row justify-center w-full mt-1">
                    <Button onClick={() => setPortals(portals.toSpliced(portals.length, 0, new PortalPair(new OverworldPortal(0, 0, 0), new NetherPortal(0,0,0), (portals.length + 1).toString())))}>
                        <span className="material-symbols-rounded">add</span>Add new Portal-Pair
                    </Button>
                </div>
                <div className="flex flex-row items-start justify-center py-3 gap-2">
                    <Download portals={portals}/>
                    <Upload setPortals={setPortals}/>
                </div>
            </div>
        </main>
    );
}
