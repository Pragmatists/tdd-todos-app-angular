import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {environment} from './environments/environment';
import {TodosAppModule} from "./app/app";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(TodosAppModule);
