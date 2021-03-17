import { GridOptions, MenuItemDef, Module } from '@ag-grid-community/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
// import { RequestsService } from '../../shared/services/requests.service';
import { DataService } from './data.service';

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Store } from '@ngrx/store';
import { countAllRowsSelector, countSelectedRows, countSelectedRowsSelector, requeftFromYoutube, spinerIsLoadingSelector, YTdataSelector } from 'src/app/Store/main.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IParamsForContextMenu, IRowData } from 'src/app/shared/interfaces/main';

// export interface IRowData {
//   description: string;
//   publishedAt: string;
//   thumbnails: string;
//   title: object;
// }

// export function simpleFunc(a: number, b: number) {
//   if (typeof a == 'number' && typeof b == 'number' ) {
//     return a + b
//   } else {
//     return -1
//   }
// }

// export const SET_test = [
//   {
//     testName: 'should somthing doing',
//     a: 2,
//     b: 3,
//     result: 5
//   }
// ]


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  public gridOptions: GridOptions;
  modules: Module[] = [ClientSideRowModelModule];
  // spinerIsLoading = false;
  rowData: IRowData[];
  getContextMenuItems: any;
  destroy$ = new Subject<void>();
  // ---store----
  countAllRows$ = this.store.select(countAllRowsSelector);
  countSelectedRows$ = this.store.select(countSelectedRowsSelector);
  spinerIsLoading$ = this.store.select(spinerIsLoadingSelector);
  YTdataSelector$ = this.store.select(YTdataSelector);
  // --------




  constructor(
    public dataService: DataService,
    private store: Store,
    private fb: FormBuilder,
    private matIconRegistry: MatIconRegistry, // add custom icon
    private domSanitizer: DomSanitizer, // add custom icon
    private toastr: ToastrService,

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


  getContextMenuItemsFunc(params: IParamsForContextMenu) {
    const contextArray: (string | MenuItemDef)[] = [ // need know true interfase for array
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
    const countRow: number = this.gridOptions.api.getSelectedRows().length;
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
      this.store.dispatch(requeftFromYoutube({ searchValue: this.myForm.get('searchValue').value }));

      this.YTdataSelector$.pipe(takeUntil(this.destroy$)).subscribe(res => {
        console.log('YTdataSelector');
        console.log(res);
        this.rowData = res;
      }, (err: any) => (console.log(err)))
    }
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      searchValue: ['', Validators.required],
      mode: [true],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
