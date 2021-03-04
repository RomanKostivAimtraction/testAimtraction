import { AgGridModule } from '@ag-grid-community/angular';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      imports: [
        FormsModule,
        AgGridModule.withComponents([MainComponent])
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
