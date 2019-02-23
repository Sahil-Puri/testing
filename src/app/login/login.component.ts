import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showloader:any;
  checkSession:any;
  loginForm:FormGroup;
  submittedloginForm:boolean;
  response:any;
  uname:any;
  hide:any;
  loginError:any;
  constructor( private http:HttpClient, 
    private formbuilder:FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.hide="hide";
    this.showloader='';
    this.checkSession=localStorage.getItem('token');
      if(this.checkSession){
       this.router.navigateByUrl('/listing');
     }
     this.loginForm = this.formbuilder.group({
      userName: ['', Validators.required],      
      password: ['', Validators.required]      
    })
  }
  get lf() { return this.loginForm.controls; }
  loginUser(e){   
    this.submittedloginForm = true;
    if (this.loginForm.invalid) {
        return;
    }else{         
      this.showloader ='btn-loading disabled';
       var reqHeader = new HttpHeaders({ 
         'Content-Type': 'application/json'});
      //   //this.loginVal = {'username': username,'password':password } ;
          this.http.post('https://api.prontoitlabs.com/api/v1/user/login',this.loginForm.value,{ headers: reqHeader })
          .subscribe((response)=>{            
            this.response = response;
            console.log(this.response);
           if(this.response.errorMessage == null){  
             localStorage.setItem('token', this.response.data.token);
             this.router.navigateByUrl('/listing');            
           }else{

              alert(this.loginError.errorMessage);
           }                
          },error => { // error path
            this.showloader ='';
           this.loginError = error;
           console.log(this.loginError);
           localStorage.clear();
           this.router.navigateByUrl('/login');
           alert(this.loginError.error.errorMessage);      
         });
    };    
    return false;
  }
}
