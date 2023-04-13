import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  /* A partir de Versión 15 podemos utilizar el inject */
  _playerService = inject(PlayersService);
  _router = inject(Router);
  players$!: Observable<Player[]>;
  searcher = new FormControl('');

  /* Así Inyectamos servicios en componente versiones anteriores de Angular  **/
  // constructor(private playerService: PlayerService){}

  ngOnInit(): void {
    //this._playerService.getPlayer().subscribe((res)=> console.log(res));
    this.players$ = this._playerService.getPlayer();
    this.searcher.valueChanges.pipe(debounceTime(1000)).subscribe((search) => {
      if (search) {
        this.players$ = this._playerService.getPlayer(search);
      } else {
        this.players$ = this._playerService.getPlayer();
      }
    });
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit', { state: { player }});
  };


  deletePlayer(player: Player) {
    if (confirm(`Seguro de borrar a ${player.name}`)) {
      this._playerService.deletePlayer(player.id);
    }
  };
}
