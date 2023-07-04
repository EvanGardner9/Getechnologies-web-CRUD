import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'; 

import { AppComponent } from './app.component';
import {HeaderComponent} from './header/header.component'
import { FooterComponent } from './footer/footer.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonaService } from './personas/persona.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './personas/form.component';
import {FormsModule} from "@angular/forms"

const routes: Routes = [
  {path:'',redirectTo:'/index', pathMatch:'full'},
  {path:'personas', component:PersonasComponent},
  {path:'personas/form', component:FormComponent},
  {path:'personas/form/:id', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonasComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [PersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
