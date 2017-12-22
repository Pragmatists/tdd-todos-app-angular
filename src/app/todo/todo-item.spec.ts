import test, {App, expectThat, http, Req} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodoListComponent, TodoListModule} from "./todo-list";
import {TodoItemComponent, TodoItemModule} from "./todo-item";

describe('Todo List', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TodoItemModule);
    }));


    it('renders a todo', async(() => {
        const comp = app.run(TodoItemComponent, { todo: { title: 'Walk the dog', completed: false }});

        comp.verify(
            expectThat.textOf('h1').isEqualTo('Walk the dog')
        )
    }));
});
