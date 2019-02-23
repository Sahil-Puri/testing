import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatPaginator, MatTableDataSource,MatPaginatorModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
hide:any;
checkSession:any;
listingResponse:any;
showData:string[] = new Array();
showloader:any;
dataSource:MatTableDataSource<any>;
  constructor(
    private router:Router,
    private http:HttpClient
  ) { }
  
  displayedColumns: string[] = ['ID','UserName','Gender'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.hide="show";
    this.checkSession=localStorage.getItem('token');
    if(!this.checkSession){
     this.router.navigateByUrl('/login');
   }
   else{
    var reqHeader = new HttpHeaders({ 
      'X-AUTH-TOKEN': this.checkSession
    });
    this.http.get(' https://api.prontoitlabs.com/api/v1/user?page=0&size=25',{ headers: reqHeader })
          .subscribe((response)=>{            
            this.listingResponse = response;
            console.log(this.listingResponse);
           if(this.listingResponse.errorMessage == null){ 
            this.dataSource = new MatTableDataSource(this.listingResponse.data.content);
           }else{

              alert(this.listingResponse.errorMessage);
           }                
          },error => { // error path
            this.showloader ='';
            console.log(this.listingResponse);
           this.listingResponse = error;
           alert(this.listingResponse.error.errorMessage);      
         });
   }
  }

}
