import type { PaginationMeta } from "./pagination";
import type { Product } from "./product";


export interface ProductListResponse {
  data: Product[];
  meta: PaginationMeta;
}
