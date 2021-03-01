import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { from } from 'rxjs';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DataService } from './data.service';
import { ImageComponent } from '../main/image/image.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public gridOptions: GridOptions;

  rowData = [];

  constructor(
    private requestService: RequestsService,
    public dataService: DataService
  ) {
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 150
    };
  }

  ngOnInit(): void {
    this.getInfo();

  }

  getInfo() {
    const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=john`;
    this.requestService.getInfo(url).subscribe(res => {
      console.log(res);
      // this.rowData = res.items;


      this.rowData = res.items.map(elem => {
        return {
          thumbnails: elem.snippet.thumbnails.default.url,
          publishedAt: elem.snippet.publishedAt,
          title: elem.snippet.title,
          description: elem.snippet.description,
        };
      });
      console.log('rowData');
      console.log(this.rowData);
    });
  }

}
