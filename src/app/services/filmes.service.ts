import { IFilme } from './../models/IFilme.model';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { IListaFilmes } from '../models/IListaFilmes.model';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { IFilmeDetalhes } from '../models/IFilmeDetalhes.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private apiUrl = 'https://api.themoviedb.org/3';
  private key = 'api_key=034c5fdfe098d8cb374c2152cf44c2e7';
  private language = 'language=pt-BR';
  private region = 'region=BR';

  constructor(
    private http: HttpClient,
    private  toast: ToastrService
  ) { }

  buscarFilmes(buscar: string): Observable<IListaFilmes>{
    const url = `${this.apiUrl}/search/movie?${this.language}&${this.region}&${this.key}&query=${buscar}`;
    return this.http.get<IListaFilmes>(url).pipe(
      map(result => result),
      catchError(erro => this.exibirErro(erro))
    )
  }

  public listarPopulares(): Observable<IListaFilmes>{
    const url = 'https://api.themoviedb.org/3/movie/popular?api_key=034c5fdfe098d8cb374c2152cf44c2e7&language=pt-BR&page=1&region=BR';
    return this.http.get<IListaFilmes>(url).pipe(
      map(result => result),
      catchError(erro => this.exibirErro(erro))
    )
  }

  public buscarPorId(id: number): Observable<IFilmeDetalhes>{
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=034c5fdfe098d8cb374c2152cf44c2e7&language=pt-BR`;
    return this.http.get<IFilmeDetalhes>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  public addFilmeAPlaylist(filme: IFilme): Observable<IFilme>{
    const url = 'https://parseapi.back4app.com/classes/Filme';
    const configApi = {
      'X-Parse-Application-Id':'4ETSbC61A032K0G25XdVCZuB8cSZ43fMbrkFNnSR',
      'X-Parse-REST-API-Key':'dyrrr9PEAiRnVGVuR3837WTRleojUuf54lhvEsYT'
    }
    const headers = new HttpHeaders(configApi);
    filme.iD = filme.id;
    delete filme.id;
    return this.http.post<IFilme>(url, filme,{headers}).pipe(
      map(retorno => retorno),
      catchError(error=>this.exibirErro(error))
    );
  }

  public buscarFilmeDaPlaylist(): Observable<IListaFilmes>{
    const url = 'https://parseapi.back4app.com/classes/Filme';
    const configApi = {
      'X-Parse-Application-Id':'4ETSbC61A032K0G25XdVCZuB8cSZ43fMbrkFNnSR',
      'X-Parse-REST-API-Key':'dyrrr9PEAiRnVGVuR3837WTRleojUuf54lhvEsYT'
    }
    const headers = new HttpHeaders(configApi);

    return this.http.get<IListaFilmes>(url,{headers}).pipe(
      map(retorno => retorno),
      catchError(error=>this.exibirErro(error))
    );
  }

  exibirErro(erro: any): Observable<any>{
    this.exibirMensagens('Erro',`Erro de acesso a API: ${erro.message}`,'toast-error');
    return EMPTY
  }

  exibirMensagens(titulo: string, mensagem: string, tipo: string): void{
    this.toast.show(mensagem, titulo,{closeButton:true, progressBar: true, timeOut: 5000},tipo);
  }

}
