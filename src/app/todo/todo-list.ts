import {Component, Input, NgModule} from '@angular/core';
import {Todo} from "./todo";
import {TodoItemModule} from "./todo-item";
import {BrowserModule} from "@angular/platform-browser";


@Component({
    templateUrl: 'todo-list.html',
    selector: 'todo-list'
})
export class TodoListComponent {

    @Input()
    private todos: Todo[];

}


@NgModule({
    declarations: [TodoListComponent],
    imports: [TodoItemModule, BrowserModule],
    exports: [TodoListComponent]
})
export class TodoListModule {
}