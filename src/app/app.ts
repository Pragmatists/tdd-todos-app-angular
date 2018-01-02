import {NgModule} from "@angular/core";
import {TodosAppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {TodoNewComponent, TodoNewModule} from "./todo/todo-new";
import {TodosComponent, TodosModule} from "./todo/todos";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes = [
    {path: '', component: TodosComponent},
    {path: 'new', component: TodoNewComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    declarations: [TodosAppComponent],
    exports: [TodosAppComponent],
    imports: [RouterModule.forRoot(routes), TodosModule, TodoNewModule, NgbModule.forRoot()],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [TodosAppComponent]
})
export class TodosAppModule {
}