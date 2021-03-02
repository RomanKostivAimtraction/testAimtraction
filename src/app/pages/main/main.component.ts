import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { from } from 'rxjs';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { DataService } from './data.service';
import { ImageComponent } from '../main/image/image.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  searchValue = '';
  countAllcase: number;
  countSelectedCase: any;
  public gridOptions: GridOptions;

  spinerIsLoading = false;

  rowData = [];

  constructor(
    private requestService: RequestsService,
    public dataService: DataService,
    private app: ChangeDetectorRef
  ) {
    this.gridOptions = {
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 200,
    };
  }

  ngOnInit(): void {
    // this.getInfo();
  }

  ngOnChanges() {
  
    console.log(this.dataService.columnDefs[0].checkboxSelection);
  }

  rowSelected() {
    console.log(this.gridOptions.api.getSelectedRows());
    this.countSelectedCase = this.gridOptions.api.getSelectedRows().length;
  }

  changeMode() {
    this.dataService.columnDefs[0].checkboxSelection = !this.dataService.columnDefs[0].checkboxSelection;
    console.log(this.dataService.columnDefs[0].checkboxSelection);
    // this.app.detectChanges();
  }
  getInfo() {
    this.spinerIsLoading = true;
    const apiKey = 'AIzaSyB3GVWc8NIjn8B2-BbzW-AOko2lfOHgTKw';
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&maxResults=20&type=video&part=snippet&q=${this.searchValue}`;
    this.requestService.getInfo(url).subscribe(res => {
      this.spinerIsLoading = false;
      this.countAllcase = res.items.length;
      console.log(res);
      // this.rowData = res.items;


      this.rowData = res.items.map(elem => {
        return {
          thumbnails: elem.snippet.thumbnails.medium.url,
          publishedAt: elem.snippet.publishedAt,
          title: elem,
          description: elem.snippet.description,
        };
      });
      console.log('rowData');
      console.log(this.rowData);
      // this.app.detectChanges();
    });
  }

}
