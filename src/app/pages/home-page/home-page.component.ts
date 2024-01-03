import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink
  ],
  providers: [LocalStorageService],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  
  protected menuItems! : any[];
  protected games: any[] = [];
  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.getGames();
    this.setMenuItems();
  }
  private getGames() {
    const games = this._localStorageService.get('games', false);
    if(!games) return;
    this.games = games;
    console.log(this.games)
  };

  private setMenuItems() {
    this.menuItems = [
      {label: 'NEW GAME', href: '/new-game', condition: true},
      {label: 'LOAD GAME', href: '/game', condition: !!this.games.length},
      {label: 'OPTIONS', href: '/options', condition: true}
    ]
  }
}
