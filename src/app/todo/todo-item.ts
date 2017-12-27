import {Component, Input, NgModule} from "@angular/core";
import {Todo} from "./todo";

@Component({
    templateUrl: 'todo-item.html',
    selector: 'todo-item'
})
export class TodoItemComponent {
    @Input() todo:Todo;
}

@NgModule({
    declarations: [TodoItemComponent],
    exports: [TodoItemComponent]
})
export class TodoItemModule {}