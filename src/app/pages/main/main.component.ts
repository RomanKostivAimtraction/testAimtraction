import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DataService } from './data.service';
import { ImageComponent } from '../main/image/image.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  searchValue = '';
  countAllcase: number;
  countSelectedCase: any;
  public gridOptions: GridOptions;

  spinerIsLoading = false;

  rowData = [
    {
      thumbnails: 'sdfgsdfg',
      publishedAt: 'sdfgsdfg',
      title: 'sdfsdf',
      description: 'elem.snippet.description',
    }, {
      thumbnails: 'sdfgsdfg',
      publishedAt: 'sdfgsdfg',
      title: 'sdfsdf',
      description: 'elem.snippet.description',
    }
  ];

  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
    private toastr: ToastrService
  ) {
    this.gridOptions = {
      columnDefs: this.getColumnDefs(),
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 200,
    };
  }

  ngOnInit(): void {
    // this.getInfo();
  }


  rowSelected() {
    console.log(this.gridOptions.api.getSelectedRows());
    this.countSelectedCase = this.gridOptions.api.getSelectedRows().length;
  }

  changeMode() {
    const columnDef = this.gridOptions.api.getColumnDefs();
    columnDef[0].checkboxSelection = !columnDef[0].checkboxSelection;
    this.gridOptions.api.setColumnDefs(columnDef);
    this.gridOptions.api.refreshCells();

    // this.columnDefs[0].checkboxSelection = !this.columnDefs[0].checkboxSelection;

    // this.gridOptions.api.setColumnDefs(this.columnDefs);
    // console.log(this.columnDefs);
    // this.app.detectChanges();
  }

  getInfo() {
    this.spinerIsLoading = true;
    const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${this.searchValue}`;
    this.requestService.getInfo(url).subscribe(res => {
      this.spinerIsLoading = false;
      this.countAllcase = res.items.length;
      console.log(res);
      // this.rowData = res.items;


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
      // this.app.detectChanges();
    }, (err: any) => {
      this.toastr.error('Мати Василева! Шось пішло не так')
    });
  }

  getColumnDefs() {
    return [
      {
        headerName: '',
        field: 'checkBox',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: 10
      },
      {
        headerName: '',
        field: 'thumbnails',
        sortable: true,
        filter: true,
        // checkboxSelection: true,
        cellRendererFramework: ImageComponent
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        sortable: true,
        filter: true,
        valueFormatter: params => this.dataFormater(params.data.publishedAt)
      },
      {
        headerName: 'Video Title',
        field: 'title',
        sortable: true,
        filter: true,
        cellRenderer: params => this.videoTitleLink(params)
      },
      { headerName: 'Description', field: 'description', sortable: true, filter: true },
    ]
  }

  dataFormater(date) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
  }

  videoTitleLink(params) {
    // console.log(params);
    // return `<a href="https://www.youtube.com/watch?v=${params.value.id.videoId}" target="_blank" rel="noopener">` + params.value.snippet.title + `</a>`;
  }

}
