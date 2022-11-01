import { Livro } from './Livro';
import { Trofeu } from './Trofeu';

export interface Usuario{
    id : number;
    user : string;
    img: string;
    senha : string;
    pontos: number;
    trofeus: Trofeu[],
    livros_lidos: Livro[]
}