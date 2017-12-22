import test, {App, expectThat} from 'ng-test-runner';

import {NgModule} from '@angular/core';
import {async} from '@angular/core/testing';
import {BannerComponent} from "./app.component";


@NgModule({
    declarations: [BannerComponent],
})
export class TestModule {
}

describe('BannerComponent (inline template)', () => {

    let app: App;

    beforeEach(async(() => {
        app = test(TestModule);
    }));

    it('should display original title', () => {
        const comp = app.run(BannerComponent);

        comp.verify(
            expectThat.textOf('h1').isEqualTo('Test Tour of Heroes')
        );
    });

});
