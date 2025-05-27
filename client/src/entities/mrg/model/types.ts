export interface MrgData {
    mrg: string;
    mg: string;
    km: number;
    date: string;
    loadLevel: number;
    fact: number;
    tvps: number;
}

export interface MrgState {
    data: Array<MrgData>;
    loading: boolean;
    error: string | null;
    filters: {
        loadLevel?: number;
    };
}