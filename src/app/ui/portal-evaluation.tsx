import {PairComparison, PortalPair} from "@/app/_data/Portal";
import {useEffect, useState} from "react";

export function PortalEval({
    pair,
    allPortals
} : {
    pair: PortalPair,
    allPortals: PortalPair[],
}) {
    const [sortedOwNe, setSortedOwNe] = useState<PairComparison[]>([]);
    const [sortedNeOw, setSortedNeOW] = useState<PairComparison[]>([]);

    useEffect(() => {
        const distances = allPortals.map((other) => pair.compareTo(other));
        setSortedOwNe(distances.toSorted((a, b) => a.dOwNe - b.dOwNe));
        setSortedNeOW(distances.toSorted((a, b) => a.dNeOw - b.dNeOw));
    }, [pair, allPortals])

    const [errors, setErrors] = useState<Error[] | null>(null);

    useEffect(() => {
        setErrors(calculateErrors(pair, sortedOwNe, sortedNeOw));
    }, [pair, sortedOwNe, sortedNeOw]);

    const ready = sortedOwNe.length > 0 && sortedNeOw.length > 0 && errors != null;

    return (
        <div className={`w-80 p-2 flex flex-col justify-center ${ready ? (errors?.length > 0 ? "bg-fail" : "bg-success") : "bg-card"}`}>
            {
                (ready) ?
                    (errors?.length > 0) ?
                        errors.map((e) => <p>{e.message}</p>)
                    :
                        <p>Portals are linking!</p>
                :
                    <p>Loading...</p>
            }
        </div>
    )
}

function calculateErrors(pair: PortalPair, sortedOwNe: PairComparison[], sortedNeOw: PairComparison[]): Error[] {
    const errors: Error[] = [];

    for(let p of sortedOwNe) {
        if(p.lOwNe) {
            if(p.pair != pair) {
                errors.push(new LinkOwNe(p.pair));
                break;
            }
        } else {
            if(p.pair == pair) {
                errors.push(new DistanceOwNe());
                break;
            }
        }
    }

    for(let p of sortedNeOw) {
        if (p.lNeOw) {
            if (p.pair != pair) {
                errors.push(new LinkNeOw(p.pair));
                break;
            }
        } else {
            if (p.pair == pair) {
                errors.push(new DistanceNeOw());
                break;
            }
        }
    }

    return errors;
}

abstract class Error {
    message: string;
    constructor(message: string) {
        this.message = message;
    }
}

class DistanceOwNe extends Error {
    constructor() {
        super("Distance in the Nether is too far!");
    }
}

class DistanceNeOw extends Error {
    constructor() {
        super("Distance in the Overworld is too far!");
    }
}

class LinkOwNe extends Error {
    constructor(other: PortalPair) {
        super("Linking to " + other.name + " in the Nether!");
    }
}

class LinkNeOw extends Error {
    constructor(other: PortalPair) {
        super("Linking to " + other.name + " in the Overworld!");
    }
}