import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogadoService {

  private usuarioLogado : boolean = false;

  constructor() { }

  public getStatus() : boolean {
    return this.usuarioLogado;
  }

  public setStatus() : void {
    this.usuarioLogado = !this.usuarioLogado;
  }
}
