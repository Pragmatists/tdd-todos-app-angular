import {Component, NgModule, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Todo} from "./todo";
import {BrowserModule} from "@angular/platform-browser";
import {TodoListModule} from "./todo-list";


type TodoListResponse = Todo[];

@Component({
    templateUrl: 'todos.html'
})
export class TodosComponent implements OnInit {
    private todos: Todo[];

    ngOnInit(): void {
        this.http.get<TodoListResponse>('http://localhost:3000/todos')
            .subscribe(data => {
                this.todos = data;
            }, error => {
                console.log(error);
                this.todos = [];
            })
    }

    constructor(private http: HttpClient) {
    }

    get todosCount(): number {
        return this.todos ? this.todos.length : 0;
    }
}


@NgModule({
    declarations: [TodosComponent],
    imports: [HttpClientModule, BrowserModule, TodoListModule],
    exports: [TodosComponent]
})
export class TodosModule {
}