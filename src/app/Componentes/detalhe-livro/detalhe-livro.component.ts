import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/Shared/Livro';
import { Trofeu } from 'src/app/Shared/Trofeu';
import { Usuario } from 'src/app/Shared/Usuario';

@Component({
  selector: 'app-detalhe-livro',
  templateUrl: './detalhe-livro.component.html',
  styleUrls: ['./detalhe-livro.component.css']
})
export class DetalheLivroComponent implements OnInit {

  livroAtual !: Livro;
  usuarioAtual !: Usuario;
  lido !: boolean;

  constructor(private router : Router, private http : HttpClient) { }

  ngOnInit(): void {

    let observadorLivro = this.http.get<Livro[]>("http://localhost:3000/livros");

    observadorLivro.subscribe(livros => {
      let array = []
      array = livros;
      this.livroAtual = array.filter(livro => livro.id == this.router.url[8])[0]

      let observadorUsuario = this.http.get<Usuario>("http://localhost:3000/usuario_atual");

      observadorUsuario.subscribe(usuario => {
        this.usuarioAtual = usuario;
        if(this.usuarioAtual.livros_lidos.filter(livro => livro.id == this.livroAtual.id)[0] != undefined){
          this.lido = true;
        }else{
          this.lido = false;
        }
      });
    });
  }

  calculaLivros() : Livro[] {
    if(this.lido){
      return this.usuarioAtual.livros_lidos.filter(livro => livro.id != this.livroAtual.id);
    }else{
      this.usuarioAtual.livros_lidos.push(this.livroAtual);
      return this.usuarioAtual.livros_lidos;
    }
  }

  calculaPontos() : number {
    
    let pontos = Math.trunc((this.livroAtual.paginas)/100)
    
    if(this.lido){
      return (-1)*pontos;
    }else{
      return pontos;
    }
  }

  calculaTrofeus() : Trofeu[] {
    let categorias : string[] = [];
    let catReduzidas : string[] = [];
    let trofeus : Trofeu[] = [];
    for(let i=0; i<this.usuarioAtual.livros_lidos.length; i++){
      categorias.push(this.usuarioAtual.livros_lidos[i].categoria);
    }
    for(let i=0; i<categorias.length; i++){
      if(catReduzidas.filter(cat => cat == categorias[i]).length > 0){
        continue;
      }else{
        catReduzidas.push(categorias[i]);
      }
    }
    for(let i=0; i<catReduzidas.length; i++){
      if(categorias.filter(cat => catReduzidas[i] == cat).length > 4){
        trofeus.push({
          nome: "Leitor de "+catReduzidas[i],
          class: catReduzidas[i],
          img: catReduzidas[i]
        });
      }
    }
    return trofeus;
  }

  marcar_desmarcar() : void {
    let observavelUsuario = this.http.put<Usuario>("http://localhost:3000/usuarios/"+this.usuarioAtual.id.toString(), {
      id: this.usuarioAtual.id,
      user: this.usuarioAtual.user,
      img: this.usuarioAtual.img,
      senha: this.usuarioAtual.senha,
      pontos: this.usuarioAtual.pontos + this.calculaPontos(),
      trofeus: this.calculaTrofeus(),
      livros_lidos: this.calculaLivros()
    });
    
    this.lido = !this.lido;

    observavelUsuario.subscribe(res => {
      this.usuarioAtual = res;
      let observavelUsuarioAtual = this.http.put<Usuario>("http://localhost:3000/usuario_atual", {
        id: this.usuarioAtual.id,
        user: this.usuarioAtual.user,
        img: this.usuarioAtual.img,
        senha: this.usuarioAtual.senha,
        pontos: this.usuarioAtual.pontos,
        trofeus: this.usuarioAtual.trofeus,
        livros_lidos: this.usuarioAtual.livros_lidos
      });
      observavelUsuarioAtual.subscribe(res => res);
    });
  }

}
