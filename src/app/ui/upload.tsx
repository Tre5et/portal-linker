import {NetherPortal, OverworldPortal, PortalPair} from "@/app/_data/Portal";
import {useRef, useState} from "react";

export function Upload({
    setPortals
} : {
    setPortals: (portals: PortalPair[]) => void
}) {
    const [data, setData] = useState<PortalPair[] | null>(null);

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(null);
        const file = e.target.files?.item(0);
        if(file == null) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result as string;
            try {
                const parsed = JSON.parse(data);
                const result: PortalPair[] = [];
                for(let p of parsed) {
                    const ow = p.portalOw;
                    const ne = p.portalNe;
                    const owPortal = new OverworldPortal(ow.x, ow.y, ow.z);
                    const nePortal = new NetherPortal(ne.x, ne.y, ne.z);
                    result.push(new PortalPair(owPortal, nePortal, p.name));
                }
                setData(result);
            } catch (error) {
                console.error(error);
                console.log(data);
                alert("There was an error parsing the file!")
            }
        }
        reader.readAsText(file);
    }

    const fileInput = useRef<HTMLInputElement>(null);

    return (
        <div className="flex flex-row items-center gap-1">
            <div
                className="flex flex-row items-center bg-card rounded-md p-2 pr-3 cursor-pointer select-none"
                onClick={() => {
                    fileInput.current?.click();
                }}
            >
                <span className="material-symbols-rounded">upload</span>Import
            </div>
            <input
                type="file"
                onChange={upload}
                ref={fileInput}
                className="hidden"
            />
            {
                data == null ?
                    <div></div>
                :
                    <div
                        className="bg-card rounded-md p-2 px-3 cursor-pointer select-none"
                        onClick={() => {
                            setPortals(data)
                            setData(null)
                        }}
                     >
                        Import "{fileInput.current?.files?.item(0)?.name}"
                    </div>
            }
        </div>
    )
}