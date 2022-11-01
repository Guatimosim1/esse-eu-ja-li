import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './Componentes/cadastrar/cadastrar.component';
import { DetalheLivroComponent } from './Componentes/detalhe-livro/detalhe-livro.component';
import { HomeComponent } from './Componentes/home/home.component';
import { ListaLivrosComponent } from './Componentes/lista-livros/lista-livros.component';
import { LoginComponent } from './Componentes/login/login.component';
import { LogoutComponent } from './Componentes/logout/logout.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { RankingComponent } from './Componentes/ranking/ranking.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'livros', component: ListaLivrosComponent},
  {path: 'livros/:id', component: DetalheLivroComponent},
  {path: 'perfil', component: PerfilComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
