import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import { MatDialogModule } from '@angular/material/dialog';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { LoginComponent } from './Componentes/login/login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { CadastrarComponent } from './Componentes/cadastrar/cadastrar.component';
import { LogoutComponent } from './Componentes/logout/logout.component';
import { ListaLivrosComponent } from './Componentes/lista-livros/lista-livros.component';
import { RankingComponent } from './Componentes/ranking/ranking.component';
import { PerfilComponent } from './Componentes/perfil/perfil.component';
import { CadastrarLivroComponent } from './Componentes/cadastrar-livro/cadastrar-livro.component';
import { DetalheLivroComponent } from './Componentes/detalhe-livro/detalhe-livro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    CadastrarComponent,
    LogoutComponent,
    ListaLivrosComponent,
    RankingComponent,
    PerfilComponent,
    CadastrarLivroComponent,
    DetalheLivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //MatDialogModule,
    //BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents: [CadastrarLivroComponent]
})
export class AppModule { }
