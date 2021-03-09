import { Injectable } from '@angular/core';
import { ImageComponent } from '../main/image/image.component';


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
      width: 10
    },
    {
      headerName: '',
      field: 'thumbnails',
      sortable: true,
      filter: true,
      cellRendererFramework: ImageComponent
    },
    {
      headerName: 'Published on',
      field: 'publishedAt',
      sortable: true,
      filter: true,
      valueFormatter: params => this.dataFormater(params.data.publishedAt)
    },
    {
      headerName: 'Video Title',
      field: 'title',
      sortable: true,
      filter: true,
      // preventDefaultOnContextMenu: onCellContextMenu,
      cellRenderer: params => this.videoTitleLink(params),
    },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, },
  ];
  constructor() { }

  dataFormater(date) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
  }


  videoTitleLink(params) {
    const [id, title] = [params.value.id.videoId, params.value.snippet.title];
    return `<a href="https://www.youtube.com/watch?v=${id}"target="_blank" rel="noopener">${title}</a>`;
  }
}
