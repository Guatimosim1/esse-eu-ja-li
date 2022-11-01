import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuarioAtual !: string;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    let observavel = this.http.get<any>("http://localhost:3000/usuario_atual");
    observavel.subscribe(user => this.usuarioAtual = user.user);
  }

}
