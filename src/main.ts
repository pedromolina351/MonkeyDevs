import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
