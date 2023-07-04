import { Injectable } from '@angular/core';

import { Personas } from './personas';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from 'rxjs';
import swal from 'sweetalert2';

import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private urlEndPoint: string = "http://localhost:8080/api/personas";
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getPersonas(): Observable<Personas[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Personas[])
    )
  }
  create(persona: Personas): Observable<Personas> {
    return this.http.post<Personas>(this.urlEndPoint, persona, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire("Error al crear al cliente", e.error.mensaje, 'error');
        return throwError (e);
      })

    )
    
    }

  getPersona(id):Observable<Personas>{
    return this.http.get<Personas>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/personas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar',e.error.mensaje,'error');
        return  throwError(""+e);
      })
    );
  }


  update(persona:Personas): Observable<Personas>{
    return this.http.put<Personas>(`${this.urlEndPoint}/${persona.id}`, persona, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire("Error al editar a la persona",e.error.mensaje,'error');
        return throwError(e);
      })



    )
  
  
  
  }

  delete(id:number): Observable<Personas>{
    return this.http.delete<Personas>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar a la persona', e.error.mensaje, 'error');
        return throwError(e);
      }

      )
    )
  }
}
