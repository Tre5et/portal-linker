import {PortalPair} from "@/app/_data/Portal";

export function PortalName({
    pair,
    setSelf
} : {
    pair: PortalPair,
    setSelf: (newPair: PortalPair | null) => void,
}) {
    return (
        <div className="p-2 bg-card flex flex-col items-center justify-start gap-2 pt-4 w-36">
            <input type="text" name="name" className="w-full text-right pr-2" value={pair.name} onChange={(e) => setSelf(pair.copy({name: e.target.value}))}></input>
            <div className="flex flex-row items-center text-sm cursor-pointer select-none hover:text-red-600" onClick={() => setSelf(null)}>
                <span className="material-symbols-rounded text-md">delete</span> Delete
            </div>
        </div>
    )
}