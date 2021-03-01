import { Injectable } from '@angular/core';
import { ImageComponent } from '../main/image/image.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  columnDefs = [
    {
      headerName: '',
      field: 'thumbnails',
      sortable: true,
      filter: true,
      checkboxSelection: true,
      cellRendererFramework: ImageComponent
    },
    { headerName: 'Published on', field: 'publishedAt', sortable: true, filter: true },
    { headerName: 'Video Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
  ];
  constructor() { }
}
