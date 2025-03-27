import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ReviewComponent } from './pages/review/review.component';
import { reviewResolver } from './pages/review/resolver/review.resolver';
import { CrossedComponent } from './pages/crossed/crossed.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'main', 
        pathMatch: 'full' 
    },
    {
        path: 'main', 
        component: MainComponent,
        title: 'Principal'
    },
    {
        path: 'review', 
        component: ReviewComponent,
        title: 'Reportes',
        resolve: {
            data: reviewResolver
        }
    },
    {
        path: 'crossed', 
        component: CrossedComponent,
        title: 'Cruces Vales'
    }
];
