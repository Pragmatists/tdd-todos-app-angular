import test, {App, expectThat, navigateToUrl} from 'ng-test-runner';
import {TodosAppModule} from "./app";
import {TodosAppComponent} from "./app.component";
import {async} from "@angular/core/testing";

describe("Todos App", () => {
    let app: App;

    beforeEach(async(() => {
        app = test(TodosAppModule);
    }));

    // works in Karma but not in Jest
    xit('starts with a list of todos', async(() => {
        let comp = app.run(TodosAppComponent);

        comp.perform(
            navigateToUrl('/redirect-me-from-here')
        );

        comp.verify(
            expectThat.location.isEqualTo(''),
            expectThat.elements('h1').isNotEmpty()
        )
    }));

    // works in Karma but not in Jest
    xit('navigates to new', async(() => {
        let comp = app.run(TodosAppComponent);

        comp.perform(
            navigateToUrl('/new')
        );

        comp.verify(
            expectThat.location.isEqualTo('/new'),
            expectThat.elements('form').isNotEmpty()
        )
    }));

});