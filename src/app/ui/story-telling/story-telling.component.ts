import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, WritableSignal, signal } from '@angular/core';

interface ScreenData {
  imgSrc: string;
  text: string
}

@Component({
  selector: 'app-story-telling',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './story-telling.component.html',
  styleUrl: './story-telling.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryTellingComponent implements OnInit {
  @Output() storyTellingEnd = new EventEmitter<boolean>();

  protected currentScreenData: WritableSignal<ScreenData> = signal({imgSrc: '', text: ''});
  // public count: WritableSignal<number> = signal(0);

  // Boolean for animations
  protected opacity0 = signal(true);
  protected textToRight = signal(true);
  protected textToLeft = signal(false);
  protected imgToRight = signal(false);
  protected imgToLeft = signal(true);

  // Timers
  protected transitionTime = 500;
  private timeToReplaceElements = this.transitionTime + 100;
  private timeToReading = 6000;
  private totalTransitionTime = this.timeToReading + this.timeToReplaceElements + 500;

  
  // ScreenData
  private screen1: ScreenData = {
    imgSrc: '../../../assets/img/lozere.png',
    text: `C'est le 19 juillet 2116, qu'est née en Lozère ce qu'on apellera "La bataille salvatrice des fleurs".`
  };
  private screen2: ScreenData = {
    imgSrc: '../../../assets/img/population.jpg',
    text: `15 ans auparavant, la population française avait atteint le nombre affolant de 120 millions d'habitants.`
  };
  private screen3: ScreenData = {
    imgSrc: '../../../assets/img/batiments.jpg',
    text: `Les terres agricoles des campagnes étaient envahies de béton et de bâtiments, ...`
  };
  private screens: ScreenData[] = [];
  private screenIndex = 0;

  ngOnInit(): void {

    this.screens = [
      this.screen1,
      this.screen2,
      this.screen3
    ];
    this.tellingStory();
  }
  
  private tellingStory() {
    // Wrap in a first setTimeout to waiting 1.5s before the first screen appear
    setTimeout(() => {
      // Scroll the first screen
      this.scrollScreen();
      // Scroll the other screens thanks to a setInterval
      setInterval(() => {
        if(!this.screens[this.screenIndex]) {
          this.storyTellingEnd.emit(true);
          return;
        };
        this.scrollScreen()
      }, this.totalTransitionTime);
    }, 1500);
  }

  private appearElements() {
    this.imgToLeft.set(false);
    this.textToRight.set(false);
    this.opacity0.set(false);
  }

  private desappearElements() {
    this.imgToRight.set(true);
    this.textToLeft.set(true);
    this.opacity0.set(true);
    this.replaceElements();
  }

  private replaceElements() {
    setTimeout(() => {
      this.imgToRight.set(false);
      this.textToLeft.set(false);
      this.imgToLeft.set(true);
      this.textToRight.set(true);
    }, this.timeToReplaceElements);
  }

  private scrollScreen() {
    this.currentScreenData.set(this.screens[this.screenIndex]);
    this.appearElements();
    setTimeout(() => {
      this.desappearElements();
      this.screenIndex++;
    }, this.timeToReading);
  }
}
