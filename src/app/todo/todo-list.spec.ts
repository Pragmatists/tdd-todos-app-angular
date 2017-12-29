import test, {App, expectThat} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodoListComponent, TodoListModule} from "./todo-list";

describe('Todo List', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TodoListModule);
    }));


    it('renders a list of todos', async(() => {
        const comp = app.run(TodoListComponent, {
            todos: [
                {id: 1, title: 'Walk the first dog', completed: false},
                {id: 2, title: 'Walk the second dog', completed: false},
            ]
        });

        comp.verify(
            expectThat.textsOf('todo-item h1').areEqualTo(['Walk the first dog', 'Walk the second dog'])
        )
    }));


});
