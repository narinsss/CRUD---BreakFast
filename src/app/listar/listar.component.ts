import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Funcionario } from '../shared/funcionario';
import { FuncionarioService } from '../shared/funcionario.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  funcionarios:Funcionario[]
  constructor(private service:FuncionarioService) {}

  ngOnInit(): void {
    this.listarFuncionario();
  }

  listarFuncionario(){
    this.service.list().subscribe(dados => this.funcionarios = dados);
  }
  excluir(funcionario) {
    this.service.delete(funcionario).subscribe(
      success => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Funcionário removido com sucesso!',
          confirmButtonColor: '#007BFF'
        })
        this.listarFuncionario();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Funcionário não removido.',
          confirmButtonColor: '#007BFF'
        })
      }
    )
  }
}
