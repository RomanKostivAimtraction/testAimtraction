import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should be runDataFormater', () => {
  //   const spy = jest.spyOn(service.columnDefs[2], 'valueFormatter')
  //   const params = {
  //     value: { id: { videoId: 'marvel' }, snippet: { title: 'marvel' } },
  //   }
  //   expect(spy).toHaveBeenCalledWith(params)
  // })

  it('should be return date in normal view', () => {
    const date = '2020-10-03T05:01:12Z';
    const normalDate = '03.10.2020'
    expect(service.dataFormater(date)).toEqual(normalDate)
  })

  it('should be return link', () => {
    const params = {
      value: { id: { videoId: 'marvel' }, snippet: { title: 'marvel' } },
    }
    const [id, title] = [params.value.id.videoId, params.value.snippet.title];
    const link = `<a href="https://www.youtube.com/watch?v=${id}"target="_blank" rel="noopener">${title}</a>`
    expect(service.videoTitleLink(params)).toEqual(link)
  })
});
