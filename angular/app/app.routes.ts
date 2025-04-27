import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main_page/main.component';
import { LoginComponent } from './login/login.component';
import { aboutGuard } from './about.guard';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "main", component: MainComponent, canActivate: [aboutGuard]}
];
