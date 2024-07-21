import {Dimension} from "@/app/_data/Portal";

export function PortalCoordinate({
    label,
    value,
    onChange,
    dimension
} : {
    label: string,
    value: number,
    onChange: (value: number) => void,
    dimension: Dimension
}) {
    return (
        <div className="flex flex-row items-center mx-2">
            {label}:&nbsp;
            <div>
                <input type="number" className="w-20 text-right" value={value} onChange={e => onChange(parseInt(e.target.value))}/>
                <p className="text-right pr-4 text-sm text-hint">{dimension == Dimension.Overworld ? value / 8 : value * 8}</p>
            </div>
        </div>
    )
}
