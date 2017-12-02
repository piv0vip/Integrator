import { IFilter } from '../classes/filter';

export interface ITableFields {
    key: string;
    label: string;
    class?: string|any[];
    formatter?: string|Function;
    sortable?: boolean;
    tdClass?: string|any[];
    thClass?: string|any[];
    thStyle?: {};
    variant?: string;
    filter?: string;
}