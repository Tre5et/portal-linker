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
    setSelf: (portals: PortalPair) => void
}) {
    return (
        <div className="flex flex-row items-stretch my-3 rounded-lg overflow-hidden">
            <div className="p-2 bg-card flex flex-col items-center justify-evenly w-36">
                <h3>Portal Pair:</h3>
                <input type="text" name="name" className="w-full text-right pr-2" value={pair.name} onChange={(e) => setSelf(pair.copy({name: e.target.value}))}></input>
            </div>
            <div className="portal-bg flex flex-row p-5">
                <PortalCoordinate label="x" value={pair.portalOw.x} onChange={v => setSelf(pair.copy({owX: v}))} dimension={Dimension.Overworld} />
                <PortalCoordinate label="y" value={pair.portalOw.y} onChange={v => setSelf(pair.copy({owY: v}))} dimension={Dimension.Overworld} />
                <PortalCoordinate label="z" value={pair.portalOw.z} onChange={v => setSelf(pair.copy({owZ: v}))} dimension={Dimension.Overworld} />
                <div className="mx-3"></div>
                <PortalCoordinate label="x" value={pair.portalNe.x} onChange={v => setSelf(pair.copy({neX: v}))} dimension={Dimension.Nether} />
                <PortalCoordinate label="y" value={pair.portalNe.y} onChange={v => setSelf(pair.copy({neY: v}))} dimension={Dimension.Nether} />
                <PortalCoordinate label="z" value={pair.portalNe.z} onChange={v => setSelf(pair.copy({neZ: v}))} dimension={Dimension.Nether} />
            </div>
            <PortalEval pair={pair} allPortals={allPortals} />
        </div>
    )
}