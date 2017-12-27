import {NgModule} from "@angular/core";
import {TodosAppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {TodoListComponent, TodoListModule} from "./todo/todo-list";

const routes = [
    {path: '', component: TodoListComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
    declarations: [TodosAppComponent],
    exports: [TodosAppComponent],
    imports: [RouterModule.forRoot(routes), TodoListModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    bootstrap: [TodosAppComponent]
})
export class TodosAppModule {
}