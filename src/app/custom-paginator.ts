import { Injectable } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  firstPageLabel = '第一页';
  nextPageLabel = '下一页';
  previousPageLabel = '前一页';
  itemsPerPageLabel = '每页行数';
  lastPageLabel = '最后一页';
}
