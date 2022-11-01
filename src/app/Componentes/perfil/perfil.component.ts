import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Shared/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario !: Usuario;
  opcao : number = 0;

  //Todas as seleções de imagens disponíveis. O caminho relativo deve ser igual ao caminho
  //informado pelo arquivo db.json.
  selecoes : any[] = [
    {nome: "user", endereco: "../assets/Imagens/Perfil/user.png", selecionada: false},
    {nome: "avatar", endereco: "../assets/Imagens/Perfil/avatar.png", selecionada: false},
    {nome: "bear", endereco: "../assets/Imagens/Perfil/bear.png", selecionada: false},
    {nome: "gamer", endereco: "../assets/Imagens/Perfil/gamer.png", selecionada: false},
    {nome: "hacker", endereco: "../assets/Imagens/Perfil/hacker.png", selecionada: false},
    {nome: "man", endereco: "../assets/Imagens/Perfil/man.png", selecionada: false},
    {nome: "man1", endereco: "../assets/Imagens/Perfil/man1.png", selecionada: false},
    {nome: "user1", endereco: "../assets/Imagens/Perfil/user1.png", selecionada: false},
    {nome: "woman", endereco: "../assets/Imagens/Perfil/woman.png", selecionada: false},
    {nome: "woman1", endereco: "../assets/Imagens/Perfil/woman1.png", selecionada: false}
  ]

  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
    let observavel = this.http.get<Usuario>("http://localhost:3000/usuario_atual");
    observavel.subscribe(usuario => {
      this.usuario = usuario;
      let index = this.selecoes.findIndex(obj => obj.endereco == this.usuario.img);
      this.selecoes[index].selecionada = true;
    });
  }

  mudar(opcao : number) : void {
    this.opcao = opcao;
  }

  alterarSenha() : void {
    let senha = document.getElementsByTagName('input')[0].value;
    let repetir_senha = document.getElementsByTagName('input')[1].value;

    if(senha == "" || repetir_senha == ""){window.alert("A senha não pode ser vazia."); return;}
    if(senha != repetir_senha){window.alert("As duas senhas devem coincidir."); return;}

    let id = this.usuario.id;
    let observavel = this.http.put<Usuario>("http://localhost:3000/usuarios/"+id.toString(), {
      id: this.usuario.id,
      user: this.usuario.user,
      img: this.usuario.img,
      senha: senha,
      pontos: this.usuario.pontos,
      trofeus: this.usuario.trofeus,
      livros_lidos: this.usuario.livros_lidos
    });
    observavel.subscribe(res => res);
    window.alert("Sua senha foi alterada com sucesso.");
  }

  selecionarImagem(nome : string) : void {
    let index = this.selecoes.findIndex(obj => obj.nome == nome);
    this.selecoes[index].selecionada = true;
    let observavel = this.http.put<Usuario>("http://localhost:3000/usuarios/"+(this.usuario.id).toString(), {
      id: this.usuario.id,
      user: this.usuario.user,
      img: this.selecoes[index].endereco,
      senha: this.usuario.senha,
      pontos: this.usuario.pontos,
      trofeus: this.usuario.trofeus,
      livros_lidos: this.usuario.livros_lidos
    });
    observavel.subscribe(usr => this.usuario = usr);
  }

  selecionarLivro(id : string) : void {
    this.router.navigate(['/livros/'+id]);
  }

}
