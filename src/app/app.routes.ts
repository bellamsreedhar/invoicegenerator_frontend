import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { authGuard } from '../services/auth.guard';

export const routes: Routes = [
    {path:'',component:LoginComponent, pathMatch: 'full'},
    {path:'login',component:LoginComponent},
    {path:'products',component:ProductListComponent,canActivate:[authGuard]}
];
