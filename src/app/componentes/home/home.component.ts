import { IFilme } from './../../models/IFilme.model';
import { FilmesService } from './../../services/filmes.service';
import { Component, OnInit } from '@angular/core';
import { IListaFilmes } from 'src/app/models/IListaFilmes.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buscar: string = '';
  public listaDeFilmes: IListaFilmes = {};

  constructor(
    private filmesService: FilmesService,
    private router: Router,) {
  }

  ngOnInit(): void {
    if(this.router.url !== '/playlist'){
      this.buscarFilmesPopulares();
    }
    else{
      this.buscarFilmeDaPlaylist();
    }
  }

  buscarFilmes(filtro: string): void{
    this.filmesService.buscarFilmes(filtro).subscribe(retorno =>{
      this.listaDeFilmes = retorno;
    });
  }

  buscarFilmesPopulares(): void{
    this.filmesService.listarPopulares().subscribe(result => {
      this.listaDeFilmes = result;
    });
  }

  filtrarFilmes(): void{
    if(this.buscar.length > 0)
      this.buscarFilmes(this.buscar);
    else
      this.buscarFilmesPopulares();
  }

  buscarFilmeDaPlaylist(): void{
    this.filmesService.buscarFilmeDaPlaylist().subscribe(result => {
      this.listaDeFilmes.results = result.results;
    });
  }

  listarFilmeAleatorio(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    this.buscarFilmes(characters.charAt(Math.floor(Math.random() * charactersLength)));
 }
}
