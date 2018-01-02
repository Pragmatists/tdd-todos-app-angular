import test, {App, expectThat, http, Req, Server} from 'ng-test-runner';
import {async} from '@angular/core/testing';
import {TodosComponent, TodosModule} from "./todos";
import {By} from "@angular/platform-browser";

describe('Todos component', () => {

    let app: App;
    let server: Server;

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

        it('shows the number of todos left', async(() => {
            server.get('http://localhost:3000/todos', (req: Req) => {
                req.sendJson(
                    [
                        {id: 1, title: 'Walk the first dog', completed: false},
                        {id: 2, title: 'Walk the second dog', completed: false},
                    ]
                )
            });

            const comp = app.run(TodosComponent);

            comp.verify(
                expectThat.textOf('[data-todos-count]').isEqualTo('Wow! Only 2 todos left!'),
                (fixture) => {
                    expect(fixture.debugElement.query(By.css('todo-list')).componentInstance.todos).toEqual(                    [
                            {id: 1, title: 'Walk the first dog', completed: false},
                            {id: 2, title: 'Walk the second dog', completed: false},
                        ]
                    ) }

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
