import { Component, OnInit } from '@angular/core';

import { RequestsService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  columnDefs = [
    { headerName: 'HostName', field: 'hostname', sortable: true, filter: true },
    { headerName: 'Device', field: 'device', sortable: true, filter: true },
    { headerName: 'OS', field: 'os', sortable: true, filter: true },
    { headerName: 'Owner display name', field: 'owner_name', sortable: true, filter: true },
  ];

  rowData = [
    { hostname: 'dfgdfgdfg', device: 'Notebook', os: 'Windows', owner_name: 'Olya' },
    { hostname: 'fgh', device: 'Notebook', os: 'Linux', owner_name: 'VAsya' },
    { hostname: 'dfgdfghkjhjkgdfg', device: 'Desctop', os: 'MacOS', owner_name: 'Petro' },
  ];

  constructor(
    private requestService: RequestsService
  ) { }

  ngOnInit(): void {
    this.getInfo();

  }

  getInfo() {
    const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';
    this.requestService.getInfo(url).subscribe(res => {
      console.log(res);

    })
  }

}
