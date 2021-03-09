import { GridOptions, Module } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DataService } from './data.service';
import { take } from 'rxjs/operators';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { Clipboard } from "@angular/cdk/clipboard"

interface IRowData {
  description: string;
  publishedAt: string;
  thumbnails: string;
  title: object;
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
  countAllcase: number;
  countSelectedCase: number;
  public gridOptions: GridOptions;
  modules: Module[] = [ClientSideRowModelModule];

  spinerIsLoading = false;

  rowData: Array<IRowData>;

  getContextMenuItems: any;

  request: any;




  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
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
    this.rowData = [
      // {
      //   description: 'string',
      //   publishedAt: 'string',
      //   thumbnails: 'string',
      //   title: { snippet: { description: 'sdfgsdfgsdfgs' } }
      // }
    ];

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
    this.countSelectedCase = this.gridOptions.api.getSelectedRows().length;
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
    this.request = this.requestService.getInfo(url).pipe(take(1)).subscribe(res => {
      console.log('answare from youtube');
      console.log(res);

      this.spinerIsLoading = false;
      this.countAllcase = res.items.length;

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
