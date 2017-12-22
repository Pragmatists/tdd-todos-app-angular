import test, {App, expectThat, http, Req} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodoListComponent, TodoListModule} from "./todo-list";

describe('Todo List', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TodoListModule);
        http().get('/todos', (req: Req) => {
            req.sendStatus(200)
        });
    }));

    it('renders header', async(() => {
        const comp = app.run(TodoListComponent);

        comp.verify(
            expectThat.textOf('h1').isEqualTo('Your todos for today:')
        );
    }));

    it('shows the number of todos left', async(() => {
        http().get('/todos', (req: Req) => {
            req.sendJson({
                todos: [
                    {id: 1, title: 'Walk the first dog', completed: false},
                    {id: 2, title: 'Walk the second dog', completed: false},
                ]
            })
        });
        const comp = app.run(TodoListComponent);

        comp.verify(
            expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 2 todos left!')
        )

    }))
});
