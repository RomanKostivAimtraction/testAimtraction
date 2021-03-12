import { GridOptions, Module } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';
import { DataService } from './data.service';
import { take } from 'rxjs/operators';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Store } from '@ngrx/store';
import { countAllRowsSelector, countAllRows, countSelectedRows, countSelectedRowsSelector } from 'src/app/reducers/main.reducer';
// import { Clipboard } from "@angular/cdk/clipboard"

interface IRowData {
  description: string;
  publishedAt: string;
  thumbnails: string;
  title: object;
}

interface IDataYoutube {
  items?: Array<{ snippet: { thumbnails: { medium: { url: string } }, publishedAt: string, description: string } }>;
  etag?: string;
  kind?: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: object;
}

// interface IContextMenu {
//   name: string,
//   openNewTab: Function,
//   cssClasses: Array<string>,
// }


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  searchValue = '';
  // countAllcase: number;
  // countSelectedCase: number;
  public gridOptions: GridOptions;
  modules: Module[] = [ClientSideRowModelModule];

  spinerIsLoading = false;

  rowData: IRowData[];

  getContextMenuItems: any;

  request: any;

  // changeMode$ = this.store.select(modeChecboxSelector);
  countAllRows$ = this.store.select(countAllRowsSelector);
  countSelectedRows$ = this.store.select(countSelectedRowsSelector);




  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
    private store: Store
    // private clipboard: Clipboard
  ) {
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 200,
      // copyHeadersToClipboard: true
    };
  }

  ngOnInit(): void {
    this.getContextMenuItems = this.getContextMenuItemsFunc;
  }

  getContextMenuItemsFunc(params) {
    console.log(params);
    const contextArray: Array<any> = [ // need know true interfase for array
      'copy',
      'copyWithHeaders'
    ];

    if (params.column.colDef.field === 'title') {
      contextArray.push('separator');
      contextArray.push({
        name: 'Open in new tab',
        action() {
          window.open(`https://www.youtube.com/watch?v=${params.node.data.title.id.videoId}`, '_blank');
        },
        cssClasses: ['redFont', 'bold'],
      });

    }

    return contextArray;
  }


  rowSelected() {
    console.log(this.gridOptions.api.getSelectedRows());
    const countRow = this.gridOptions.api.getSelectedRows().length;
    // this.countSelectedCase = this.gridOptions.api.getSelectedRows().length;
    this.store.dispatch(countSelectedRows());
  }

  changeMode() {
    this.dataService.columnDefs[0].checkboxSelection = !this.dataService.columnDefs[0].checkboxSelection;
    this.dataService.columnDefs[0].headerCheckboxSelection = !this.dataService.columnDefs[0].headerCheckboxSelection;
    this.gridOptions.api.setColumnDefs(this.dataService.columnDefs);
    this.gridOptions.api.refreshCells();
  }

  getInfo() {

    this.spinerIsLoading = true;
    const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${this.searchValue}`;
    this.request = this.requestService.getInfo<IDataYoutube>(url).pipe(take(1)).subscribe(res => {
      console.log('answare from youtube');
      console.log(res);

      this.spinerIsLoading = false;
      // this.countAllcase = res.items.length;
      this.store.dispatch(countArrRows());

      this.rowData = res.items.map(elem => {
        return {
          thumbnails: elem.snippet.thumbnails.medium.url,
          publishedAt: elem.snippet.publishedAt,
          title: elem,
          description: elem.snippet.description,
        };
      });
      console.log('rowData');
      console.log(this.rowData);
    }, (err: any) => { });
  }




  ngOnDestroy(): void {
    // this.request.unsubscribe();
  }

}
