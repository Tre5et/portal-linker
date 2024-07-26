export class PortalPair {
    portalOw: OverworldPortal;
    portalNe: NetherPortal;
    name: string;

    constructor(portalOw: OverworldPortal, portalNe: NetherPortal, name: string) {
        this.portalOw = portalOw;
        this.portalNe = portalNe;
        this.name = name;
    }

    compareTo(other: PortalPair): PairComparison {
        const [dOwNe, dNeOw] = this.distanceTo(other);
        const [lOwNe, lNeOw] = this.isInRange(other);
        return {
            pair: other,
            dOwNe,
            dNeOw,
            lOwNe,
            lNeOw
        }
    }

    distanceTo(other: PortalPair): [number, number] {
        const netherEquivalent = this.portalOw.toNether();
        const overworldEquivalent = this.portalNe.toOverworld();

        return [
            Math.sqrt(
                Math.pow(netherEquivalent.x - other.portalNe.x, 2) +
                Math.pow(netherEquivalent.y - other.portalNe.y, 2) +
                Math.pow(netherEquivalent.z - other.portalNe.z, 2)
            ),
            Math.sqrt(
                Math.pow(overworldEquivalent.x - other.portalOw.x, 2) +
                Math.pow(overworldEquivalent.y - other.portalOw.y, 2) +
                Math.pow(overworldEquivalent.z - other.portalOw.z, 2)
            )
        ];
    }

    isInRange(other: PortalPair): [boolean, boolean] {
        const netherEquivalent = this.portalOw.toNether();
        const overworldEquivalent = this.portalNe.toOverworld();

        return [
            Math.abs(netherEquivalent.x - other.portalNe.x) <= 16 && Math.abs(netherEquivalent.z - other.portalNe.z) <= 16,
            Math.abs(overworldEquivalent.x - other.portalOw.x) <= 128 && Math.abs(overworldEquivalent.z - other.portalOw.z) <= 128
        ]
    }

    copy({
         owX = this.portalOw.x,
         owY = this.portalOw.y,
         owZ = this.portalOw.z,
         neX = this.portalNe.x,
         neY = this.portalNe.y,
         neZ = this.portalNe.z,
         name = this.name
    }): PortalPair {
        return new PortalPair(new OverworldPortal(owX, owY, owZ), new NetherPortal(neX, neY, neZ), name);
    }
}

export abstract class Portal {
    x: number;
    y: number;
    z: number;
    dimension: Dimension;

    constructor(x: number, y: number, z: number, dimension: Dimension) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dimension = dimension;
    }

    abstract toOtherDimension(): Portal;
}

export class OverworldPortal extends Portal {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, Dimension.Overworld);
    }

    toNether(): NetherPortal {
        return new NetherPortal(this.x / 8, this.y, this.z / 8);
    }

    toOtherDimension(): Portal {
        return this.toNether();
    }

}

export class NetherPortal extends Portal {
    constructor(x: number, y: number, z: number) {
        super(x, y, z, Dimension.Nether);
    }

    toOverworld(): OverworldPortal {
        return new OverworldPortal(this.x * 8, this.y, this.z * 8);
    }

    toOtherDimension(): Portal {
        return this.toOverworld();
    }
}

export enum Dimension {
    Overworld,
    Nether
}

export type PairComparison = {
    pair: PortalPair,
    dOwNe: number,
    dNeOw: number,
    lOwNe: boolean,
    lNeOw: boolean,
}