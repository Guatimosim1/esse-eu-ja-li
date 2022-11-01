import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Shared/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
  }

  Cadastrar() {
    let usr = document.getElementsByTagName('input')[0].value;
    let senha = document.getElementsByTagName('input')[1].value;
    let repetir_senha = document.getElementsByTagName('input')[2].value;

    if(senha != repetir_senha){window.alert("As duas senhas devem ser iguais"); return;}

    let observavel = this.http.post<Usuario>("http://localhost:3000/usuarios", {user: usr, senha: senha, pontos: 0, estilos: []});
    observavel.subscribe(res => {window.alert("Usuário cadastrado com sucesso"); this.router.navigate(['/login']); return res});
  }

}
