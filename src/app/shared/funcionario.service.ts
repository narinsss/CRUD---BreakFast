import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Funcionario } from './funcionario';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly API = 'http://localhost:3000/funcionario';

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<Funcionario[]>(this.API)
  }

  getOne(id){
    return this.http.get<Funcionario>(`${this.API}/${id}`)
  }

  create(funcionario){
    return this.http.post(this.API, funcionario).pipe(take(1))
  }

  update(funcionario){
    return this.http.put(`${this.API}/${funcionario.id}`, funcionario).pipe(take(1))
  }

  delete(funcionario){
    return this.http.delete(`${this.API}/${funcionario.id}`, funcionario).pipe(take(1))
  }
}
