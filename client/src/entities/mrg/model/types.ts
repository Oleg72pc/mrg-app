import { type ColumnDef } from '@tanstack/react-table'

export interface MrgData {
    id: string;
    mrg: string;
    mg: string;
    km: number;
    date: string;
    loadLevel: number;
    fact: number;
    tvps: number;
}

export interface MrgPagination {
    currentPage: number;
    pageSize: number
}

export interface MrgState {
    data: Array<MrgData>;
    loading: boolean;
    error: string | null;
    pagination: MrgPagination;
    filters: {
        loadLevel?: number;
    };
}

export interface ColumnMeta {
    isSubHeader?: boolean;
    rowSpan?: number;
    colSpan?: number;
}

export type MrgColumnDef<T> = ColumnDef<T> & {
    meta?: ColumnMeta;
};

