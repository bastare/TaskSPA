export type Pagination = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  pagination: Pagination;
  result: T;


  // public get Pagination() : Pagination {
  //   return this._pagination;
  // }

  // constructor(public pagination: Pagination) {
    // this._pagination = pagination;
  // }
}
