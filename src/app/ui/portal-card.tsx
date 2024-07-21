'use client';

import {Dimension, PortalPair} from "@/app/_data/Portal";
import {PortalCoordinate} from "@/app/ui/portal-coordinate";
import {PortalEval} from "@/app/ui/portal-evaluation";

export function PortalCard({
    pair,
    allPortals,
    setSelf,
}: {
    pair: PortalPair,
    allPortals: PortalPair[],
    setSelf: (portals: PortalPair | null) => void
}) {
    return (
        <div className="flex flex-row items-stretch my-3 rounded-lg overflow-hidden">
            <div className="p-2 bg-card flex flex-col items-center justify-evenly w-36">
                <input type="text" name="name" className="w-full text-right pr-2" value={pair.name} onChange={(e) => setSelf(pair.copy({name: e.target.value}))}></input>
                <div className="flex flex-row items-center text-sm cursor-pointer select-none hover:text-fail" onClick={() => setSelf(null)}>
                    <span className="material-symbols-rounded text-md">delete</span> Delete
                </div>
            </div>
            <div className="portal-bg flex flex-row p-5">
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
    )
}