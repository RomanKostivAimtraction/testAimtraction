import { HttpClientModule } from '@angular/common/http';
import { TestBed, ɵTestingCompiler } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { apiKey, RequestsService } from './requests.service';
import { IData } from '../interfaces/main';

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


  it('getInfo() should be return obj from youtube', (done) => {
    const expectObj = {};
    const searchValue = `LOL`;
    const link = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${searchValue}`

    service.getInfo<IData>(searchValue).subscribe(res => {
      expect(res).toEqual(expectObj);
      done();
    });

    const request = httpMock.expectOne(link);
    expect(request.request.method).toBe('GET');
    request.flush(expectObj);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
