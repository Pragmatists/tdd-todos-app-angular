import test, {App, expectThat, http, Req} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodoListComponent, TodoListModule} from "./todo-list";

describe('Todo List', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TodoListModule);
    }));

    describe("with running server", () => {
        beforeEach(async(() => {
            http().get('http://localhost:3000/todos', (req: Req) => {
                req.sendJson(
                    [
                        {id: 1, title: 'Walk the first dog', completed: false},
                        {id: 2, title: 'Walk the second dog', completed: false},
                    ]
                )
            });
        }));

        it('renders header', async(() => {
            const comp = app.run(TodoListComponent);

            comp.verify(
                expectThat.textOf('h1').isEqualTo('Your todos for today:')
            );
        }));

        it('shows the number of todos left', async(() => {
            const comp = app.run(TodoListComponent);

            comp.verify(
                expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 2 todos left!')
            )

        }));

        it('renders a list of todos', async(() => {
            const comp = app.run(TodoListComponent);

            comp.verify(
                expectThat.textsOf('todo-item h1').areEqualTo(['Walk the first dog', 'Walk the second dog'])
            )
        }));

    });

    describe("without a server", () => {

        beforeEach(async(() => {
            http().get('http://localhost:3000/todos', (req: Req) => {
                req.sendStatus(404);
            });
        }));

        it('handles failure gracefully', async(() => {
            const comp = app.run(TodoListComponent);
            comp.verify(
                expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 0 todos left!')
            )
        }));
    });
});
