import { GridOptions, Module } from '@ag-grid-community/core';
import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../../shared/services/requests.service';
import { DataService } from './data.service';
import { take } from 'rxjs/operators';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Store } from '@ngrx/store';
import { countAllRowsSelector, countAllRows, countSelectedRows, countSelectedRowsSelector } from 'src/app/reducers/main.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

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


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  myForm: FormGroup;
  // searchValue = '';
  // countAllcase: number;
  // countSelectedCase: number;
  public gridOptions: GridOptions;
  modules: Module[] = [ClientSideRowModelModule];
  spinerIsLoading = false;
  rowData: IRowData[];
  getContextMenuItems: any;
  request: any;

  countAllRows$ = this.store.select(countAllRowsSelector);
  countSelectedRows$ = this.store.select(countSelectedRowsSelector);




  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
    private store: Store,
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry, // add custom icon
    private domSanitizer: DomSanitizer, // add custom icon
    private toastr: ToastrService
  ) {
    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/search.svg'));

    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 230
    };
  }

  ngOnInit(): void {
    this.reactiveForm();
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
    const countRow: number = this.gridOptions.api.getSelectedRows().length;
    console.log('countRow');
    console.log(countRow);

    this.store.dispatch(countSelectedRows({ countRow }));
  }

  changeMode(value) {
    if (value) {
      this.gridOptions.api.deselectAll();
    }
    this.dataService.columnDefs[0].checkboxSelection = value;
    this.dataService.columnDefs[0].headerCheckboxSelection = value;
    this.gridOptions.api.setColumnDefs(this.dataService.columnDefs);
    this.gridOptions.api.refreshCells();
  }

  getInfo() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.toastr.warning('Sorry! Search place is empty ');
    } else {
      this.spinerIsLoading = true;
      const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';
      const searchValue = this.myForm.get('searchValue').value;
      console.log('searchValue');
      console.log(this.myForm.get('searchValue').value);

      const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${searchValue}`;
      this.request = this.requestService.getInfo<IDataYoutube>(url).pipe(take(1)).subscribe(res => {
        console.log('answare from youtube');
        console.log(res);

        this.spinerIsLoading = false;
        this.store.dispatch(countAllRows({ countRow: res.items.length }));

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
      }, (err: any) => (console.log(err)));
    }


  }

  reactiveForm() {
    this.myForm = this.fb.group({
      searchValue: ['', Validators.required],
      mode: [true],
    });
  }


}
