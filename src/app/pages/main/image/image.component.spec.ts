import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get url for image', () => {
    const params = {
      value: 'urlstring'
    };
    component.agInit(params);
    // expect(component.agInit(params)).toBe(params.value);
    expect(component.url).toContain('urlstring');
  });

  // it('html have class image', () => {

  //   expect(fixture.nativeElement.querySelector('.image').firstChild).toContain();
  // });
});
