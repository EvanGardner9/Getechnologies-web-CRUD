import { Component } from '@angular/core';
import { Personas } from './personas';
import { PersonaService } from './persona.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html'
})
export class PersonasComponent {

  personas: Personas[];


  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe(
      (personas) => { this.personas = personas }
    );

  }

  delete(personas: Personas): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿está seguro?',
        text: "¿Seguro que desea eliminar al cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.delete(personas.id).subscribe(
          response=> {
            this.personas = this.personas.filter(per => per !== personas)
            swal.fire(
              'Eliminado!',
              `Persona ${personas.nombre} eliminado exitosamente.`,
              'success'
            )
          }
        )
       
      }
    })

  }
}
