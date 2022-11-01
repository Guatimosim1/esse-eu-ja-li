import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Shared/Usuario';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  listaUser !: Usuario[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let observavel = this.http.get<Usuario[]>("http://localhost:3000/usuarios");
    observavel.subscribe(usr => {
      this.listaUser = usr;
      this.listaUser = this.listaUser.sort((a, b) => b.pontos - a.pontos)
    });
  }

  retornaOrdem(usuario : Usuario) : number {
    let index = 0;
    for(let i=0; i<this.listaUser.length; i++){
      if(this.listaUser[i] == usuario){return index;}else{index += 1;}
    }
    return -1;
  }

}
