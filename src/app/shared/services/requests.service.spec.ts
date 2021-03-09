import { HttpClientModule } from '@angular/common/http';
import { TestBed, ɵTestingCompiler } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { RequestsService } from './requests.service';

describe('RequestsService', () => {
  let service: RequestsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [RequestsService]
    });
    service = TestBed.inject(RequestsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getInfo() should be return obj from youtube', () => {

    const expectObj = {};
    const url = `LOL`;

    service.getInfo(url).subscribe(res => {
      expect(res).toEqual(expectObj);
    });

    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(expectObj);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
