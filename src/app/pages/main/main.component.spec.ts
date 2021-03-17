import { AgGridModule } from '@ag-grid-community/angular';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../../shared/material/material.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { provideMockStore, MockStore } from '@ngrx/store/testing';



import { MainComponent } from './main.component';
import { reducers, metaReducers } from '../../Store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SET_test } from './data.service';
import { IParamsForContextMenu } from 'src/app/shared/interfaces/main';
import { MenuItemDef } from '@ag-grid-community/core';

declare const expect: jest.Expect;

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  // let store; MockStore
  let form: FormGroup;
  let fb: FormBuilder;

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
    // store = TestBed.inject(MockStore);
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

  // it('should dispatch count row in store', ()=>{
  //   const countRow: number = 5;
  //   const storeSpy = jest.spyOn(store, 'dispatch').mockImplementation;
  //   component.rowSelected();

  //   expect(storeSpy.).toHaveBeenCalled()


  // })

  it('should be contain reactive form', (done)=>{

    form = fb.group({
      fake: ['']
    })

    expect(component.reactiveForm).toEqual(form)


  })
});


