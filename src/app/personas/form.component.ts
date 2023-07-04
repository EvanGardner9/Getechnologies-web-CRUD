import { Component, OnInit } from '@angular/core';
import { Personas } from './personas'; 
import { PersonaService } from './persona.service';
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  public persona: Personas = new Personas()
  public titulo:string = "Crear Persona";

  constructor(private personaService: PersonaService,
    private router:Router, private activateRoute:ActivatedRoute){}

  ngOnInit(){
    this.cargarPersona()
  }


  cargarPersona(): void{
    this.activateRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.personaService.getPersona(id).subscribe( (persona)=> this.persona=persona)
      }
    })
  }

  public create(): void{
    this.personaService.create(this.persona)
    .subscribe(persona => {
      this.router.navigate(['/personas'])
      swal.fire('Nueva Persona',`Persona ${persona.nombre} creada con exito!`,'success')
       }
      
    );
  }
  update():void{
    this.personaService.update(this.persona)
    .subscribe(persona => {
      this.router.navigate(['/personas'])
      swal.fire('Persona Actualizada',`Persona ${persona.nombre} actualizada con exito!`,'success')
      
    }

    )
  }
}
