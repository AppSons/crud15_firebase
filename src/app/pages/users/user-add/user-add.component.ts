import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

import { PlayersService } from 'src/app/services/players.service';
import { Player } from 'src/app/commons/interfaces/player.interface';
@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  _playerService = inject(PlayersService);
  _router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    decks: new FormArray([]),
  });

  get decks() {
    return (this.form.get('decks') as FormArray).controls;
  }

  createDeck() {
    (this.form.get('decks') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        cards: new FormControl(null, Validators.required),
      })
    );
  }


  addPlayer() {
    this._playerService.addPlayer({
      id: new Date().getTime().toString(),
      ...this.form.getRawValue(),
    } as Player);
    this._router.navigate(['users']);
  }
}
