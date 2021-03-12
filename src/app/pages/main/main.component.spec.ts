import { AgGridModule } from '@ag-grid-community/angular';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        FormsModule,
        AgGridModule.withComponents([MainComponent]),
        HttpClientModule
      ],
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


});

// describe('', () => {
//   let component: MainComponent;

//   const a = 5;
//   test('should testing', () => {

//     expect(a).toEqual(5)
//   })


// })
