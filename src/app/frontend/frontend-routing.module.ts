import { AuthentificationService } from './../backend/authentification.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
    {
        path: 'edit/:id',
        component: TodoFormComponent,
        outlet: 'editOutlet',
        canActivate: [AuthentificationService]
     }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
    ]
})
export class FrontendRoutingModule { }
