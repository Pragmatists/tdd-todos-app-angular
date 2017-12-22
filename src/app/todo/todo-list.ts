import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Todo} from "./todo";


class TodoListResponse {
    todos: Todo[]
}

@Component({
    templateUrl: 'todo-list.html'
})
export class TodoListComponent implements OnInit {
    private todos: Todo[];

    ngOnInit(): void {
        this.http.get<TodoListResponse>('/todos')
            .subscribe(v => {
                this.todos = v.todos;
            })
    }

    constructor(private http: HttpClient) {
    }

    get todosCount(): number {
        return this.todos ? this.todos.length : 0;
    }
}


@NgModule({
    declarations: [TodoListComponent],
    imports: [HttpClientModule],
    exports: [TodoListComponent]
})
export class TodoListModule {
}