import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogadoService } from 'src/app/Serviços/logado.service';
import { Usuario } from 'src/app/Shared/Usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userLogado : boolean = false;

  constructor(private router: Router, private logado : LogadoService, private http : HttpClient) { }

  ngOnInit(): void {
    setInterval(() => {this.userLogado = this.logado.getStatus()}, 50);
  }

  //pequena gambiarra, mas funciona
  userOnline() : void {
    
  }

  mudarRota(rota: string) : void {
    let observador = this.http.get<Usuario>("http://localhost:3000/usuario_atual");
    observador.subscribe(usuario => {
      if(usuario.user != "visitante"){this.userLogado = true}else{this.userLogado = false}
      this.router.navigate([rota]);
    });
  }
}
