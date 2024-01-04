import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewGamePageComponent } from './pages/new_game-page/new_game-page.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'new-game',
        component: NewGamePageComponent
    },
    {
        path: 'game',
        component: GameComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
