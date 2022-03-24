import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Funcionario } from '../shared/funcionario';
import { FuncionarioService } from '../shared/funcionario.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  formulario:FormGroup
  funcionario:Funcionario
  isEdit:boolean = false

  constructor(private formBuilder:FormBuilder, private service:FuncionarioService, private route:ActivatedRoute, private router:Router) {
   }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id')) {
      this.getFuncionario();
      this.isEdit = true;
    }else {
      this.isEdit = false;
    }
      this.inicializaFormulario();

  }

  inicializaFormulario(){
    this.formulario = this.formBuilder.group({
      nome:['',Validators.required],
      sobrenome:['',Validators.required],
      cpf:['',Validators.required],
      prato:['',Validators.required]
    })
  }

  validaFormulario(){
    if(this.formulario.invalid) {
      Object.keys(this.formulario.controls).forEach(campo => {
          const controle = this.formulario.get(campo);
         controle.markAsTouched();
       });
      }else {
        this.setarDadosObjeto();
      }
  }

  setarDadosObjeto() {
    this.funcionario = {
      nome: this.formulario.get("nome").value,
      sobrenome: this.formulario.get("sobrenome").value,
      cpf: this.formulario.get("cpf").value,
      prato: this.formulario.get("prato").value



    }
    if(this.route.snapshot.paramMap.get('id')) {
      this.funcionario.id = +this.route.snapshot.paramMap.get('id');
      this.enviaEdit();
    }else {
      this.enviaCadastro()
    }

  }

  enviaCadastro() {
    this.service.create(this.funcionario)
    .subscribe(
      success => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Funcionário cadastrado com sucesso!',
          confirmButtonColor: '#007BFF'
        })
        this.formulario.reset();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Funcionário não cadastrado.',
          confirmButtonColor: '#007BFF'
        })
      }
    )
  }

  getFuncionario() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.service.getOne(id).subscribe( (data) => {
      this.setarValueEdit(data);
    })
  }

  setarValueEdit(data) {
    this.formulario.get("nome").setValue(data.nome);
    this.formulario.get("sobrenome").setValue(data.sobrenome);
    this.formulario.get("cpf").setValue(data.cpf);
    this.formulario.get("prato").setValue(data.prato);

  }

  enviaEdit() {
    this.service.update(this.funcionario)
    .subscribe(
      success => {
        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          text: 'Funcionário alterado com sucesso!',
          confirmButtonColor: '#007BFF'
        })
        this.router.navigate(['/listar']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Funcionário não alterado, tente novamente.',
          confirmButtonColor: '#007BFF'
        })
      }
    )
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaTouched(campo) && !this.formulario.valid
    }
  }

  verificaTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
}
