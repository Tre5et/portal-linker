import {PortalPair} from "@/app/_data/Portal";
import {TransparentButton} from "@/app/ui/button";

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
            <TransparentButton className="hover:text-red-600" onClick={() => setSelf(null)}>
                <span className="material-symbols-rounded text-md">delete</span> Delete
            </TransparentButton>
        </div>
    )
}