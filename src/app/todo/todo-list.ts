import {Component, NgModule} from '@angular/core';


@Component({
    templateUrl: 'todo-list.html'
})
export class TodoListComponent {
}


@NgModule({
    declarations: [TodoListComponent],
    exports: [TodoListComponent]
})
export class TodoListModule { }