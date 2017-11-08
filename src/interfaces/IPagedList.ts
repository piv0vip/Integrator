export interface IPagedList {
    PageCount: number;
    TotalItemCount: number;
    PageNumber: number;
    PageSize: number;
    HasPreviousPage?: boolean;
    HasNextPage?: boolean;
    IsFirstPage?: boolean;
    IsLastPage?: boolean;
    FirstItemOnPage?: number;
    LastItemOnPage?: number;
}

export class PagedList implements IPagedList {
    PageCount: number = 1;
    TotalItemCount: number = 0;
    PageNumber: number = 1;
    PageSize: number = 5;
}