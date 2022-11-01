import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/Shared/Livro';
import { Usuario } from 'src/app/Shared/Usuario';
//import { MatDialog } from '@angular/material/dialog';
//import { CadastrarLivroComponent } from '../cadastrar-livro/cadastrar-livro.component';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  usuario !: Usuario;
  listaLivros : Livro[] = [];

  cadastrando : boolean = false;
  editando : boolean = false;

  livrosEditando : any[] = [];
  idLivroEditado !: string;
  

  constructor(private http : HttpClient, private router : Router, private route : ActivatedRoute /*public dialog: MatDialog*/) { }

  ngOnInit(): void {
    let observavel = this.http.get<Livro[]>("http://localhost:3000/livros");
    observavel.subscribe(livros => this.listaLivros = livros);

    let obs = this.http.get<Usuario>("http://localhost:3000/usuario_atual");
    obs.subscribe(usr => this.usuario = usr);

    //const id = this.route.snapshot.paramMap.get('id');
  }

  pesquisar(){
    let pesquisa = (document.getElementById('pesquisa') as any).value;
    let como = document.getElementsByTagName('select')[0].value.toLowerCase();
    let observavel = this.http.get<Livro[]>("http://localhost:3000/livros");

    if(pesquisa != ""){
      switch(como){
        case "nome do livro":
          observavel.subscribe(livros => {
            this.listaLivros = livros;
            this.listaLivros = this.listaLivros.filter(livro => livro.nome.toLowerCase() == pesquisa.toLowerCase());
          });
          break;
        case "nome do autor":
          observavel.subscribe(livros => {
            this.listaLivros = livros;
            this.listaLivros = this.listaLivros.filter(livro => livro.autor.toLowerCase() == pesquisa.toLowerCase());
          });
          break;
        default:
          break;
      }
    }

    if(pesquisa == ""){

      let obsLivro = this.http.get<Livro[]>("http://localhost:3000/livros");
      let obsUsuario = this.http.get<Usuario>("http://localhost:3000/usuario_atual");
      let lidos = (document.getElementById("lidos") as any).checked;
      let nao_lidos = (document.getElementById("nao_lidos") as any).checked;
      let n = 0;

      if(lidos){n = n+1}
      if(nao_lidos){n = n-1}

      switch(n){
        case 0:
          obsLivro.subscribe(livros => this.listaLivros = livros);
          break;
        
        case 1:
          obsUsuario.subscribe(usr => {
            this.usuario = usr;
            obsLivro.subscribe(livros => {
              this.listaLivros = livros;
              this.listaLivros = this.listaLivros.filter(livro => this.usuario.livros_lidos.find(a => a.nome==livro.nome) != undefined);
            });
          });
          break;
        
        case 0:
          obsLivro.subscribe(livros => this.listaLivros = livros);
          break;
        
        case -1:
          obsUsuario.subscribe(usr =>{
            this.usuario = usr;
            obsLivro.subscribe(livros => {
              this.listaLivros = livros;
              this.listaLivros = this.listaLivros.filter(livro => this.usuario.livros_lidos.find(a => a.nome==livro.nome) == undefined);
            });
          });
      }
    }
  }

  autenticar() : boolean {
    if(this.usuario.user == "admin"){return true}else{return false}
  }

  cadastrar() : void {
    /*
    this.dialog.open(CadastrarLivroComponent, {
      height: "400px",
      width: "400px"
    });
    */
   this.cadastrando = !this.cadastrando;
  }

  cadastrarLivro() {
    let nome = (document.getElementsByClassName('c')[0] as any);
    let autor = (document.getElementsByClassName('c')[1] as any);
    let categoria = (document.getElementsByClassName('c')[2] as any);
    let imagem = (document.getElementsByClassName('c')[3] as any);
    let paginas = (document.getElementsByClassName('c')[4] as any)
    let resumo = (document.getElementsByClassName('c')[5] as any);

    if(nome.value == "" || autor.value == "" || categoria.value == "" || parseInt(paginas.value) <=0){
      window.alert("Formulário preenchido de maneira errada.");
      return;
    }

    let livros : Livro[];
    let observavel = this.http.get<Livro[]>("http://localhost:3000/livros");
    observavel.subscribe(ls => {
      livros = ls;
      livros = livros.filter(livro => livro.nome == nome && livro.autor == autor && livro.categoria == categoria);
      if(livros[0] == undefined){
        let obsPost = this.http.post<Livro>("http://localhost:3000/livros",{
          nome: nome.value,
          autor: autor.value,
          categoria: categoria.value,
          img: imagem.value,
          resumo: resumo.value,
          paginas: parseInt(paginas.value)
        });
        obsPost.subscribe(res => res);
        window.alert("Livro cadastrado no sistema sucessivamente.");
      }else{
        window.alert("Esse livro já foi cadastrado no sistema.");
      }
    });
  }

  ver(livro : Livro) : void {
    this.router.navigate(['/livros',livro.id]);
  }

  editarSelLivro(livro : Livro) : void {
    this.editando = true;
    this.cadastrando = false;
    this.idLivroEditado = livro.id;
    this.livrosEditando = [livro.nome, livro.autor, livro.categoria, livro.img, livro.paginas, livro.resumo];
  }

  editar() : void {
    this.editando = !this.editando;
  }

  editarLivro() : void {
    let observavel = this.http.put<Livro>("http://localhost:3000/livros/"+this.idLivroEditado, {
      id: this.idLivroEditado,
      img: (document.getElementById('img') as any).value,
      nome: (document.getElementById('nome') as any).value,
      autor: (document.getElementById('autor') as any).value,
      categoria: (document.getElementById('categoria') as any).value,
      resumo: (document.getElementById('resumo') as any).value,
      paginas: (document.getElementById('paginas') as any).value
    });
    observavel.subscribe(res => {
      this.editando = false;
      return res;
    });
  }

  excluir(livro : Livro) : void {
    let confirmar : boolean = false;
    confirmar = confirm("Deseja, realmente, excluir esse livro?");
    console.log(livro);
    console.log(livro.id)
    if(confirmar){
      console.log(confirmar)
      let observavel = this.http.delete<Livro>("http://localhost:3000/livros/"+livro.id.toString());
      observavel.subscribe(res => res);
    }
  }

}
