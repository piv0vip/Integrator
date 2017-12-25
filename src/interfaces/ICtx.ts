export interface IEntityFilter {
    fieldName: string;
    containValues?: { values: string[] };
    existsValues?: { values: string[] };
    ignoredValues?: { values: string[] };
    period?: { from: string, to: string };
}

export interface IPagedListReq {
    currentPage: number,
    filters: IEntityFilter[],
    perPage: number,
    sortBy: string,
    sortDesc: boolean
}

