import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { StoryTellingComponent } from '../../ui/story-telling/story-telling.component';
import { Router } from '@angular/router';

enum NewGameStep {
  INITIALIZATION = 'initialization',
  STORY_TELLING = 'story-telling',
  IN_GAME = 'in-game'
}

@Component({
  selector: 'app-new-game-page',
  standalone: true,
  imports: [
    CommonModule,
    StoryTellingComponent
  ],
  providers: [LocalStorageService],
  templateUrl: `./new_game-page.component.html`,
  styleUrl: './new_game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGamePageComponent implements OnInit {

  protected newGameStep = NewGameStep;
  protected gameStep: WritableSignal<NewGameStep> = signal(NewGameStep.INITIALIZATION);

  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._startGame();
  }

  protected onStoryTellingEnd(event: boolean) {
    this._router.navigate(['game']);
  }

  private _startGame() {
    setTimeout(() => {
      this.gameStep.set(NewGameStep.STORY_TELLING);
    }, 1200)
  }

}
