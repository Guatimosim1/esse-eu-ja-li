import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogadoService } from 'src/app/Serviços/logado.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router, private logado : LogadoService, private http : HttpClient) { }

  ngOnInit(): void {
    this.logado.setStatus();
    setTimeout(() => {this.router.navigate(['/home']);}, 1000);
    let observavel = this.http.put("http://localhost:3000/usuario_atual", {
      id:-1,  
      user: "Visitante",
      img: "",
      senha: "",
      pontos:-1,
      trofeus:[],
      livros_lidos:[]
    });
    observavel.subscribe(res => res);
  }

}
