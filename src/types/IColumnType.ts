// src/types/IColumnType.ts
export interface IColumnType<T> {
    key: string;
    title: string;
    width?: number;
    color?: string;
    render?: (column: IColumnType<T>, item: T) => void;
    sortOrder?: 'asc' | 'desc' | null;
    selectionType?: 'single' | 'multi' | null;
  }