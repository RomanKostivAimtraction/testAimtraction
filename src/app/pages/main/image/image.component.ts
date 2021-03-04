import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  params: any;
  constructor(){}

  agInit(params: any) {
    this.params = params;
  }

}
