import {PortalPair} from "@/app/_data/Portal";
import {Button} from "@/app/ui/button";

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
        <Button onClick={download}>
            <span className="material-symbols-rounded">download</span>Export
        </Button>
    )
}