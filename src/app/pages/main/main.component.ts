import { GridOptions, Module } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { Clipboard } from "@angular/cdk/clipboard"

interface IRowData {
  description: string;
  publishedAt: string;
  thumbnails: string;
  title: object;
}


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  countAllcase: number;
  countSelectedCase: number;
  public gridOptions: GridOptions;
  modules: Module[] = [ClientSideRowModelModule];

  spinerIsLoading = false;

  rowData: Array<IRowData>;

  getContextMenuItems: any;




  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
    private toastr: ToastrService,
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
    if(params.column.colDef.field == 'title'){
      return [
        {
          name: 'Open in new tab',
          action(){
            window.open(`https://www.youtube.com/watch?v=${params.node.data.title.id.videoId}`,'_blank');
          },
          cssClasses: ['redFont', 'bold'],
        },
        'separator',
        'copy',
        'copyWithHeaders',
        
      ];
    } else {
      return [
        'separator',
        'copy',
        'copyWithHeaders',
      ];
    }
    

    // return result;
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
    const request = this.requestService.getInfo(url).subscribe(res => {
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
      request.unsubscribe();
    }, (err: any) => {
      this.toastr.error('Мати Василева! Шось пішло не так')
    });
  }




  ngOnDestroy(): void {
    // this.request.unsubscribe();
  }

}
