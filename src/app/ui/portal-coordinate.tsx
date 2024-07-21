import {Dimension} from "@/app/_data/Portal";

export function PortalCoordinate({
    label,
    value,
    conversion,
    onChange
} : {
    label: string,
    value: number,
    conversion: (v: number) => number,
    onChange: (value: number) => void,
}) {
    return (
        <div className="flex flex-row items-center mx-2">
            {label}:&nbsp;
            <div>
                <input type="number" className="w-20 text-right" value={value} onChange={e => onChange(parseInt(e.target.value))}/>
                <p className="text-right pr-4 text-sm text-hint">{isNaN(conversion(value)) ? "?" : conversion(value)}</p>
            </div>
        </div>
    )
}
