import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcZsQgqAAAAAOqDZEK_qv73-3SbJ6xUan51MBs6' },
    // Ajoutez ce fournisseur
    
  ]
}).catch((err) => console.error(err));
