import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogadoService } from 'src/app/Serviços/logado.service';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/Shared/Usuario';

const fs = require('fs');

/*

  Inicialmente, apareceu o seguinte erro:

    Module not found: Error: Can't resolve 'fs'
  
  Para a constante fs funcionar em TS, precisei adicionar os seguintes atributos
  no arquivo package.json:

  browser : {
    "fs" : false,
    "path" : false,
    "os" : false
  }

*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users : Usuario[] = [];
  public err : boolean = false;

  constructor(private logado : LogadoService, private router : Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  Login(): void {
    let usr = document.getElementsByTagName('input')[0].value;
    let senha = document.getElementsByTagName('input')[1].value;

    let observavel = this.http.get<Usuario[]>("http://localhost:3000/usuarios");
    observavel.subscribe(users => {
      this.users = users;
      let usuarioProcurado = this.users.find(el => el.user == usr && el.senha == senha);
      if(usuarioProcurado != undefined){
        this.logado.setStatus();
        this.router.navigate(['/home']);
        this.err = false;
        let obs = this.http.put("http://localhost:3000/usuario_atual", usuarioProcurado);
        obs.subscribe(res => res);
      }else{
        this.err = true;
      }
    });
  }

}
