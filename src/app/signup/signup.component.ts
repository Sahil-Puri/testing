import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  response:any;
  showloader:any;
  signUpResponse:any;
  submittedsignupForm:boolean;
  
  signUpValue:any;
  signupForm : FormGroup;

  constructor(
    private http:HttpClient,
    private router:Router, 
    private formbuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formbuilder.group({
      userName: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      password: ['', Validators.required],
      gender: ['', Validators.required]
     
    });
  }
  
  get sf() { return this.signupForm.controls; }
  signup(){
    this.submittedsignupForm = true;
    if (this.signupForm.invalid) {
        return;
    }else{
        var reqHeader = new HttpHeaders({ 
          'Content-Type': 'application/json'});
          this.http.post('https://api.prontoitlabs.com/api/v1/user',this.signupForm.value,{ headers: reqHeader })
          .subscribe((response)=>{            
            this.signUpResponse = response;
            console.log(this.signUpResponse);
           if(this.signUpResponse.errorMessage == null){  
            alert("Signed up, Redirecting to login page");
             this.router.navigateByUrl('/login');            
           }else{

              alert(this.signUpResponse.errorMessage);
           }                
          },error => { // error path
            this.showloader ='';
            console.log(this.signUpResponse);
           this.signUpResponse = error;
           alert(this.signUpResponse.error.errorMessage);      
         });
    }
  }
}
