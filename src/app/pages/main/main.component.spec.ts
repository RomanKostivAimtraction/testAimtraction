import { AgGridModule } from '@ag-grid-community/angular';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../shared/material/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';


import { MainComponent } from './main.component';
import { reducers, metaReducers } from 'src/app/reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SET_test } from './data.service';
import { IParamsForContextMenu } from 'src/app/shared/interfaces/main';
import { MenuItemDef } from '@ag-grid-community/core';

declare const expect: jest.Expect;

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

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
      providers: [ToastrService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return context menu', () => {
    const params = {
      column: { colDef: { field: 'title' } },
      node: { data: { title: { id: { videoId: 'df4g5hgrh' } } } }
    }
    const contextMenuResult = component.getContextMenuItemsFunc(params as IParamsForContextMenu);

    if (params.column.colDef.field === 'title') {
      expect(contextMenuResult).toMatchSnapshot();
    } else {
      const contextMenu: (string | MenuItemDef)[] = ['copy', 'copyWithHeaders'];
      expect(contextMenuResult).toEqual(contextMenu);
    }
  });
});


