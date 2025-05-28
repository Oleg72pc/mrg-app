import type {ColumnDef} from "@tanstack/react-table"
import type {MrgData} from "entities/mrg/model/types.ts"

export interface ColumnMeta {
    isSubHeader?: boolean;
    rowSpan?: number;
    colSpan?: number;
    fixSize?: boolean;
}

export type MrgColumnDef<T> = ColumnDef<T> & {
    meta?: ColumnMeta;
}

export interface MrgTableProps {
    data: Array<MrgData>;
    loading?: boolean;
}