import { Injectable } from '@angular/core';
import { ImageComponent } from '../main/image/image.component';

// export const SET_test = [
// 	{
// 		testName: `should return 3`,
// 		a: 1,
// 		b: 2,
// 		result: 3
// 	},
// 	{
// 		testName: `should return 3`,
// 		a: 2,
// 		b: 1,
// 		result: 3
// 	},
// 	{
// 		testName: `should return 0`,
// 		a: 0,
// 		b: 0,
// 		result: 0
// 	},
// 	{
// 		testName: `should return 0`,
// 		a: -1,
// 		b: 1,
// 		result: 0
// 	},
// 	{
// 		testName: `should return 444`,
// 		a: 123,
// 		b: 321,
// 		result: 444
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: [],
// 		b: 0,
// 		result: -1
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: 5,
// 		b: {},
// 		result: -1
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: {},
// 		b: {},
// 		result: -1
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: null,
// 		b: new Map(),
// 		result: -1
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: undefined,
// 		b: [undefined],
// 		result: -1
// 	},
// 	{
// 		testName: `should return -1`,
// 		a: "1",
// 		b: "123",
// 		result: -1
// 	}
// ];


@Injectable({
  providedIn: 'root'
})
export class DataService {





  columnDefs = [
    {
      headerName: '',
      field: 'checkBox',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 30
    },
    {
      headerName: '',
      field: 'thumbnails',
      sortable: true,
      filter: true,
      cellRendererFramework: ImageComponent,

    },
    {
      headerName: 'Published on',
      field: 'publishedAt',
      cellClass: 'dateGrid',
      sortable: true,
      filter: true,
      valueFormatter: params => this.dataFormater(params.data.publishedAt),
    },
    {
      headerName: 'Video Title',
      field: 'title',
      cellClass: 'titleGrid',
      sortable: true,
      filter: true,
      // preventDefaultOnContextMenu: onCellContextMenu,
      cellRenderer: params => this.videoTitleLink(params),
    },
    {
      headerName: 'Description',
      field: 'description',
      cellClass: 'descriptonGrid',
      sortable: true,
      filter: true,
    },
  ];

  constructor() {
  }

  dataFormater(date) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
  }


  videoTitleLink(params) {
    const [id, title] = [params.value.id.videoId, params.value.snippet.title];
    return `<a href="https://www.youtube.com/watch?v=${id}"target="_blank" rel="noopener">${title}</a>`;
  }

  
}
