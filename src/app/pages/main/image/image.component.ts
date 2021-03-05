import { Component, OnInit } from '@angular/core';

// interface IParams {
//   value?: string
// }

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  url: string;
  constructor() { }

  agInit(params: any): void {
    this.url = params.value;
  }

}
