'use client';

import {PortalPair} from "@/app/_data/Portal";
import {PortalCoordinate} from "@/app/ui/portal-coordinate";
import {PortalEval} from "@/app/ui/portal-evaluation";
import {PortalName} from "@/app/ui/portal-name";

export function PortalCard({
    pair,
    allPortals,
    setSelf,
}: {
    pair: PortalPair,
    allPortals: PortalPair[],
    setSelf: (portals: PortalPair | null) => void,
}) {
    return (
        <div className="flex flex-row">
        <div className="flex flex-row items-stretch my-1.5 rounded-lg overflow-hidden">
            <PortalName pair={pair} setSelf={setSelf}/>
            <div className="portal-bg flex flex-row items-start p-5 w-auto">
                <PortalCoordinate label="x" value={pair.portalOw.x} conversion={v => v/8 } onChange={v => setSelf(pair.copy({owX: v}))}/>
                <PortalCoordinate label="y" value={pair.portalOw.y} conversion={v => v} onChange={v => setSelf(pair.copy({owY: v}))}/>
                <PortalCoordinate label="z" value={pair.portalOw.z} conversion={v => v/8 } onChange={v => setSelf(pair.copy({owZ: v}))}/>
                <div className="mx-3"></div>
                <PortalCoordinate label="x" value={pair.portalNe.x} conversion={v => v*8 } onChange={v => setSelf(pair.copy({neX: v}))}/>
                <PortalCoordinate label="y" value={pair.portalNe.y} conversion={v => v } onChange={v => setSelf(pair.copy({neY: v}))}/>
                <PortalCoordinate label="z" value={pair.portalNe.z} conversion={v => v*8 } onChange={v => setSelf(pair.copy({neZ: v}))}/>
            </div>
            <PortalEval pair={pair} allPortals={allPortals} />
        </div>
        </div>
    )
}