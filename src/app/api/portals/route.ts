import {NextResponse} from "next/server";
import {NetherPortal, OverworldPortal, PairComparison, PortalPair} from "@/app/_data/Portal";

export function POST(
    req: Request,
) {
    return req.json().then((data) => {
        let pairs: PortalPair[] = data.map((pair: {
            portalOw: { x: number; y: number; z: number; };
            portalNe: { x: number; y: number; z: number; };
            name: string;
        }) => {
            let ow = new OverworldPortal(pair.portalOw.x, pair.portalOw.y, pair.portalOw.z);
            let ne = new NetherPortal(pair.portalNe.x, pair.portalNe.y, pair.portalNe.z);
            return new PortalPair(ow, ne, pair.name);
        });

        let evaluation = pairs.map((pair) => {
            let distances: PairComparison[] = [];
            for(let p of pairs) {
                distances.push(pair.compareTo(p));
            }
            return {pair: pair, distances: distances};
        });

        let result = evaluation.map((ev) => {
            let linksNether = ev.distances.toSorted((a, b) => a.distNether - b.distNether)[0].pair == ev.pair;
            let linksOverworld = ev.distances.toSorted((a, b) => a.distOverworld - b.distOverworld)[0].pair == ev.pair;
            return {
                pair: ev.pair,
                evaluation: ev.distances,
                linksNether: linksNether,
                linksOverworld: linksOverworld
            }
        });

        return NextResponse.json(result);
    })
    .catch((error) => {
        return new NextResponse('Error parsing JSON: ' + error, { status: 400 });
    });
}