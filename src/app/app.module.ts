import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ListingComponent } from './listing/listing.component';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { GuardGuard } from './guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatPaginator, MatTableModule, MatSortModule, MatSelectModule, MatInputModule, MatCardModule, MatMenuModule, MatProgressSpinnerModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatPaginatorModule, MatCheckboxModule, MatDialog, MatDialogModule } from '@angular/material';

const routes:Routes = [  
  { 
   path:'',
   redirectTo:'/login',
   pathMatch :'full'
  },   
 {  
   path:'login',
   component: LoginComponent
   
 },   
 {
   path:'signup', 
   component:SignupComponent
 },   
 {
   path:'listing', 
   canActivate:[GuardGuard],
   component:ListingComponent
 }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    ListingComponent
  ],
  imports: [
    RouterModule.forRoot(routes,{ useHash: true }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
