import test, {click, expectThat, http, Server, type} from "ng-test-runner"
import {async} from "@angular/core/testing";
import {TodoNewComponent, TodoNewModule} from "./todo-new";

describe('new todo component', () => {

    let app: any;
    let server: Server;

    beforeEach(() => {
        server = http();
    });

    afterEach(() => {
        server.stop();
    });

    beforeEach(async(() => {
        app = test(TodoNewModule);
    }));

    it('sends a new todo to server on save', async(() => {
        let comp = app.run(TodoNewComponent);
        let postBody: any;

        server.post('http://localhost:3000/todos', (request) => {
            postBody = request.body();
            request.sendStatus(200);
        });

        comp.perform(
            type('Walk the dog').in('input'),
            click.in('button')
        );

        comp.verify(
            () => expect(postBody).toEqual({title: 'Walk the dog'}),
            expectThat.textOf('[data-result]').isEqualTo('Todo saved successfully')
        )
    }));
});