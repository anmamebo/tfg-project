// TODO: no utilizar en produccion
import '@angular/compiler'; // Importar el compilador JIT

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

if (environment.production) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  enableProdMode();
}
