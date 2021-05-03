import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = "yoyo";
  uploader: FileUploader = new FileUploader(
    { url: "http://127.0.0.1:5000/file_upload", 
      removeAfterUpload: false, 
      autoUpload: true });

  columnDefs = [
    { field: 'Id' , sortable: true, filter: true },
    { field: 'PetalLengthCm' , sortable: true, filter: true },
    { field: 'PetalWidthCm', sortable: true, filter: true },
    { field: 'SepalLengthCm', sortable: true, filter: true },
    { field: 'SepalWidthCm', sortable: true, filter: true },
    { field: 'Species', sortable: true, filter: true }
  ];

  rowData = [];

  constructor(private apiService: ApiService, 
             private router: Router) { }

  ngOnInit(): void {
    this.apiService.getData().subscribe(res => {      
      if(res){
        this.rowData = res;
        this.router.navigate(["/"]);
      }
    });
  }

}
