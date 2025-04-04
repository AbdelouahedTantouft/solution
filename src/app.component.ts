import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OurHttpInterceptor } from './ourHttp.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: OurHttpInterceptor, multi: true },
      

    ],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
