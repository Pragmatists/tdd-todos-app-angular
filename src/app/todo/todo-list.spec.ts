import test, {App, expectThat} from 'ng-test-runner';

import {NgModule} from '@angular/core';
import {async} from '@angular/core/testing';
import {TodoListComponent, TodoListModule} from "./todo-list";

describe('Todo List', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TodoListModule);
    }));

    it('renders header', () => {
        const comp = app.run(TodoListComponent);

        comp.verify(
            expectThat.textOf('h1').isEqualTo('Your todos for today:')
        );
    });

});
