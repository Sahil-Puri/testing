import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hide:any;
  checkSession:any;
  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.checkSession=localStorage.getItem('token');
    if(!this.checkSession){
    this.hide="hide";
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
