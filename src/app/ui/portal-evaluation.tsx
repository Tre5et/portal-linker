import {PairComparison, PortalPair} from "@/app/_data/Portal";
import { motion } from "framer-motion";
import {useEffect, useState} from "react";
import Collapsible from "react-collapsible";
import {TransparentButton} from "@/app/ui/button";

export function PortalEval({
    pair,
    allPortals
} : {
    pair: PortalPair,
    allPortals: PortalPair[],
}) {
    const [distances, setDistances] = useState<PairComparison[]>([]);
    const [sortedOwNe, setSortedOwNe] = useState<PairComparison[]>([]);
    const [sortedNeOw, setSortedNeOW] = useState<PairComparison[]>([]);

    useEffect(() => {
        setDistances(allPortals.map((other) => pair.compareTo(other)));
    }, [pair, allPortals])

    useEffect(() => {
        setSortedOwNe(distances.toSorted((a, b) => a.distNether - b.distNether));
        setSortedNeOW(distances.toSorted((a, b) => a.distOverworld - b.distOverworld));
    }, [distances]);

    const [errors, setErrors] = useState<Error[] | null>(null);

    useEffect(() => {
        setErrors(calculateErrors(pair, sortedOwNe, sortedNeOw));
    }, [pair, sortedOwNe, sortedNeOw]);

    const ready = sortedOwNe.length > 0 && sortedNeOw.length > 0 && errors != null;

    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{width: "20rem"}}
            animate={{width: open ? "20rem" : "20rem"}}
            className={`${open || "w-80"} flex flex-col justify-center p-2 ${ready ? (errors?.length > 0 ? "bg-fail" : "bg-success") : "bg-card"}`}
        >
            <Collapsible
                trigger={
                    <div className="flex flex-col justify-center min-h-16">
                        {
                        (ready) ?
                            <div className="relative flex flex-row items-center">
                                {
                                    (errors?.length > 0) ?
                                        <div>
                                            {errors.map((e) => <p key={errors?.indexOf(e)}>{e.message}</p>)}
                                        </div>
                                        :
                                        <p>Portals are linking!</p>
                                }
                                <TransparentButton onClick={() => setOpen(!open)} className="text-3xl absolute right-0">
                                    <motion.span
                                        initial={{rotate: 90, translateY: "0.05rem"}}
                                        animate={{rotate: open ? 0 : 90}}
                                        className="material-symbols-rounded"
                                    >expand_more
                                    </motion.span>
                                </TransparentButton>
                            </div>
                            :
                            <p>Loading...</p>
                        }
                    </div>
                }
                onOpening={() => {setOpen(true)}}
                onClosing={() => {setOpen(false)}}
                transitionTime={100}
            >
                <table className="mb-2">
                    <thead className="border-double border-text border-b-4">
                        <tr>
                            <th className="border-r border-text px-2 align-bottom leading-tight">Portal</th>
                            <th className="border-r border-text px-2 align-bottom leading-tight">Distance Overworld</th>
                            <th className="px-2 border-text align-bottom leading-tight">Distance Nether</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            distances.map((p) => {
                                return (
                                    <tr key={distances.indexOf(p)} className="border-t border-dashed text-right">
                                        <td className={`border-r border-text px-2 ${p.inRangeOverworld || p.inRangeNether || "italic text-hint line-through"}`} title={p.inRangeOverworld || p.inRangeNether ? "" : "Out of Detection Radius"}>{p.pair.name}</td>
                                        <td className={`border-r border-text px-2 ${p.inRangeOverworld || "italic text-hint line-through"}`} title={p.inRangeOverworld ? "" : "Out of Detection Radius (> 128 Blocks x/z)"}>{Math.round(p.distOverworld * 100) / 100}</td>
                                        <td className={`px-2 border-text ${p.inRangeNether || "italic text-hint line-through"}`} title={p.inRangeNether ? "" : "Out of Detection Radius (> 16 Blocks x/z)"}>{Math.round(p.distNether * 100) / 100}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Collapsible>
        </motion.div>
    )

}

function calculateErrors(pair: PortalPair, sortedOwNe: PairComparison[], sortedNeOw: PairComparison[]): Error[] {
    const errors: Error[] = [];

    for(let p of sortedOwNe) {
        if(p.inRangeNether) {
            if(p.pair != pair) {
                errors.push(new LinkOwNe(p.pair));
            }
            break;
        } else {
            if(p.pair == pair) {
                errors.push(new DistanceOwNe());
                break;
            }
        }
    }

    for(let p of sortedNeOw) {
        if (p.inRangeOverworld) {
            if (p.pair != pair) {
                errors.push(new LinkNeOw(p.pair));
            }
            break;
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