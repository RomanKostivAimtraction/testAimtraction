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

  // getContextMenuItems() {
  //   return [
  //     {
  //       name: 'Open in new tab',
  //       action(){
  //         window.open(`https://www.youtube.com/watch?v=${params.node.data.title.id.videoId}`,'_blank');
  //       },
  //       cssClasses: ['redFont', 'bold'],
  //     },
  //     'separator',
  //     'copy',
  //     'copyWithHeaders',
      
  //   ];
  //   // return result;
  // }


  dataFormater(date) {
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
  }


  videoTitleLink(params) {
    // console.log(params);
    return `<a href="https://www.youtube.com/watch?v=${params.value.id.videoId}" target="_blank" rel="noopener">` + params.value.snippet.title + `</a>`;
  }



}
