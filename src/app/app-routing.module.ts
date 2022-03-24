import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ListarComponent } from './listar/listar.component';

const routes: Routes = [{path: 'cadastrar', component: CadastrarComponent},
{path: '', component: ListarComponent, pathMatch: 'full'},
{path: 'listar', component: ListarComponent},
{path: 'cadastrar/:id', component: CadastrarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
