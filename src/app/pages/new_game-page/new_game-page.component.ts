import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-new-game-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  providers: [LocalStorageService],
  templateUrl: `./new_game-page.component.html`,
  styleUrl: './new_game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGamePageComponent implements OnInit {

  protected storyTexte: WritableSignal<string> = signal('');
  protected fadeIn = false;
  protected fadeOut = false;

  public count: WritableSignal<number> = signal(0);

  private storyOne: string = `C'est le 19 juillet 2116, qu'est née en Lozère ce qu'on apellera "La bataille salvatrice des fleurs".`;
  private storyTwo: string = `15 ans auparavant, la population française avait atteint le nombre affolant de 120 millions d'habitants.`;
  private storyThree: string = `Les terres agricoles des campagnes étaient envahies de béton et de bâtiments, ...`;
  private stories: string[] = [];

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this._localStorageService.set('games', [{id: 1, name: 'random'}], false);
    this.stories = [
      this.storyOne,
      this.storyTwo,
      this.storyThree
    ];
    this._startGame();
    
    // setInterval(() => {
    //   this.count.update( count => {
    //     return count + 1;
    //   });
    // }, 1000)

  }
  private _startGame() {
    this.storyTexte.set(this.stories[0]);
    this.stories.forEach(story => {
      this._scrollStory(story);
    });
  }
  private _scrollStory(story: string) {
    let index = 0;
    setInterval( () =>  {
      this.fadeOut = true;
      if(!this.stories[index]) return;
      this.storyTexte.set(this.stories[index]);
      this.fadeIn = true;
      index++;
    }, 5000);
  }

}
