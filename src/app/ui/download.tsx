import {PortalPair} from "@/app/_data/Portal";

export function Download({
    portals
 } : {
    portals: PortalPair[]
}) {
    const download = () => {
        const data = JSON.stringify(portals);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portals-${portals[0].name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className="flex flex-row items-center bg-card rounded-md p-2 pr-3 cursor-pointer select-none" onClick={download}>
            <span className="material-symbols-rounded">download</span>Export
        </div>
    )
}