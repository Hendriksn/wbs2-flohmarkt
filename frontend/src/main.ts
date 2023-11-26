import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModules } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModules)
  .catch(err => console.error(err));
