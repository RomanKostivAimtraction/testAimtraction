import { AgGridModule } from '@ag-grid-community/angular';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../shared/material/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { countAllRowsSelector, countSelectedRows, countSelectedRowsSelector, dataState, requeftFromYoutube, spinerIsLoadingSelector, YTdataSelector } from 'src/app/Store/main.reducer';
import * as mainReducer from '../../Store/main.reducer';



import { MainComponent } from './main.component';
import { reducers, metaReducers } from '../../Store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SET_test } from './data.service';
import { IParamsForContextMenu } from 'src/app/shared/interfaces/main';
import { MenuItemDef } from '@ag-grid-community/core';
import { Subject } from 'rxjs';

declare const expect: jest.Expect;

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let store: MockStore;
  let toastr: ToastrService

  const initialState = {
    data: mainReducer.dataState
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        StoreModule.forRoot(reducers, {
          metaReducers
        }),

        AgGridModule.withComponents([MainComponent]),
        HttpClientModule
      ],
      providers: [ToastrService, provideMockStore({ initialState })],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    toastr = TestBed.inject(ToastrService)
  });


  it('should mark form as touched if form invalid', () => {
    const spyForm = jest.spyOn(component.myForm, 'markAllAsTouched');
    const spyToastr = jest.spyOn(toastr, 'warning');
    component.getInfo();
    expect(spyForm).toHaveBeenCalled();
    expect(spyToastr).toHaveBeenCalled();
  })

  it('should mark form as touched if form uninvalid', () => {
    const spyStoreDispatch = jest.spyOn(store, 'dispatch');
    component.myForm.get('searchValue').setValue('marvel')
    const searchValue = component.myForm.get('searchValue').value
    component.getInfo();
    expect(spyStoreDispatch).toHaveBeenCalledWith(requeftFromYoutube({ searchValue: searchValue}));
  })



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch count row in store', () => {
    const spyStoreDispatch = jest.spyOn(store, 'dispatch');
    const countRow: number = 0;
    component.rowSelected();
    expect(spyStoreDispatch).toHaveBeenCalledWith(countSelectedRows({ countRow }));
  })


  it('should return context menu with open new tab', () => {
    const params = {
      column: { colDef: { field: 'title' } },
      node: { data: { title: { id: { videoId: 'df4g5hgrh' } } } }
    }
    const contextMenuResult = component.getContextMenuItemsFunc(params as IParamsForContextMenu);
    expect(contextMenuResult).toMatchSnapshot();
  });

  it('should return context menu without open new tab', () => {
    const params = {
      column: { colDef: { field: 'dsfdfg' } },
      node: { data: { title: { id: { videoId: 'df4g5hgrh' } } } }
    }
    const contextMenuResult = component.getContextMenuItemsFunc(params as IParamsForContextMenu);
    const contextMenu: (string | MenuItemDef)[] = ['copy', 'copyWithHeaders'];
    expect(contextMenuResult).toEqual(contextMenu);
  });



  it('should be change mode ON', () => {
    const value = true;
    const spyDeselectAll = jest.spyOn(component.gridOptions.api, 'deselectAll')
    component.changeMode(value);
    expect(spyDeselectAll).toHaveBeenCalled();
  })

  it('should be change mode OFF', () => {
    const value = false;
    const spySetColumnDefs = jest.spyOn(component.gridOptions.api, 'setColumnDefs')
    const spyRefreshCells = jest.spyOn(component.gridOptions.api, 'refreshCells')
    component.changeMode(value);
    expect(component.dataService.columnDefs[0].checkboxSelection).toEqual(value);
    expect(component.dataService.columnDefs[0].headerCheckboxSelection).toEqual(value);
    expect(spySetColumnDefs).toHaveBeenCalledWith(component.dataService.columnDefs);
    expect(spyRefreshCells).toHaveBeenCalled();
  })

  it('should be contain reactive form', () => {
    component.reactiveForm();
    const formValue = { searchValue: '', mode: true }
    const result = component.myForm.value;
    expect(result).toEqual(formValue)
  })


  it('shold be undiscrubed', () => {
    const spy = jest.spyOn(component.destroy$, "next");
    const spy1 = jest.spyOn(component.destroy$, "complete");
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled();
  })
});


