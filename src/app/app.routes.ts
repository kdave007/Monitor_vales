import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ReviewComponent } from './pages/review/review.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'main', 
        pathMatch: 'full' 
    },
    {
        path: 'main', 
        component: MainComponent,
        title: 'Principal' // Optional: Set page title
    },
    {
        path: 'review', 
        component: ReviewComponent,
        title: 'Reportes' // Optional: Set page title
    }
];
