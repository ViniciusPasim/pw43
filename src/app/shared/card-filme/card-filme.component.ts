import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FilmesService } from './../../services/filmes.service';
import { IFilme } from './../../models/IFilme.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent implements OnInit {
  @Input() filme!: IFilme;
  private filmesService: FilmesService = new FilmesService(this.http,this.toast);

  constructor(
    private http: HttpClient,
    private  toast: ToastrService
  ) { }

  ngOnInit(): void {
  }
  addFilmeAPlayList(): void{
    this.filmesService.addFilmeAPlaylist(this.filme).subscribe(resposta => {
      this.filmesService.exibirMensagens(
        'Sua PlayList',
        `${this.filme.title} foi adicionado a sua playlist}`,
        'toast-success'
      );
    });
  }
}
