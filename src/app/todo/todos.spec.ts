import test, {App, expectThat, Fixture, http, Req, Server} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodosComponent, TodosModule} from "./todos";

describe('Todos component', () => {

    let app: App;
    let server: Server;
    let comp: Fixture;

    beforeEach(async(() => {
        app = test(TodosModule);
        server = http();
    }));

    afterEach(() => {
        server.stop();
    });

    it('renders header', async(() => {
        const comp = app.run(TodosComponent);

        comp.verify(
            expectThat.textOf('h1').isEqualTo('Your todos for today:')
        );
    }));

    it('renders todos list', async(() => {
        const comp = app.run(TodosComponent);

        comp.verify(
            expectThat.element('todo-list').exists(),
        )
    }));

    describe("with running server", () => {

        beforeEach(async(()=>{
            server.get('http://localhost:3000/todos', (req: Req) => {
                req.sendJson(
                    [
                        {id: 1, title: 'Walk the first dog', completed: false},
                        {id: 2, title: 'Walk the second dog', completed: false},
                    ]
                )
            });
            comp = app.run(TodosComponent);
        }));

        it('shows the number of todos left', async(() => {
            comp.verify(
                expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 2 todos left!'),
            )

        }));

        it('shows the todo items', async(() => {
            comp.verify(
                expectThat.textsOf('todo-list [data-todo-title]').areEqualTo(['Walk the first dog', 'Walk the second dog'] )
            )

        }));

    });

    describe("without a server", () => {

        beforeEach(async(() => {
            server.get('http://localhost:3000/todos', (req: Req) => {
                req.sendStatus(404);
            });
        }));

        it('handles failure gracefully', async(() => {
            const comp = app.run(TodosComponent);
            comp.verify(
                expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 0 todos left!')
            )
        }));
    });
});
