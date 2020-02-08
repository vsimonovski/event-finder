import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { AuthenticatedUser } from './shared/model/user.interface';
import { ErrorMessage } from './shared/model/error.interface';
import { ClubEvent } from './shared/model/club-event.interface';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute() {
      switch (true) {
        case url.endsWith('api/users/register') && method === 'POST':
          return register();
        case url.endsWith('api/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('api/users') && method === 'GET':
          return getUsers();
        case url.match(/\/api\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.match(/\/api\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        case url.match('api/events') && method === 'GET':
          return getEvents();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function register() {
      const user = body;

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    function authenticate():
      | Observable<HttpResponse<AuthenticatedUser>>
      | Observable<HttpResponse<ErrorMessage>> {
      const { username, password } = body;
      const user = users.find(
        x => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token'
      });
    }

    function getUsers() {
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      const user = users.find(x => x.id == idFromUrl());
      return ok(user);
    }

    function deleteUser() {
      if (!isLoggedIn()) return unauthorized();

      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem('users', JSON.stringify(users));
      return ok();
    }

    function getEvents() {
      const events: ClubEvent[] = [
        {
          clubName: 'DOT',
          clubLogo: 'https://i.imgur.com/1bq31Q2.png',
          date: '20. februar',
          time: '23:00',
          isGoing: false,
          location: 'Francuska, Beograd',
          title: 'Maceo Plex B2B Carl Cox'
        },
        {
          clubName: 'Barutana',
          clubLogo: 'https://i.imgur.com/xLqTCs7.jpg',
          date: '27. februar',
          time: '23:00',
          isGoing: false,
          location: 'Donji Grad, Kalemegdan, Beograd',
          title: 'Mark Knight | All Night'
        },
        {
          clubName: 'Half',
          clubLogo: 'https://i.imgur.com/pWzfgaV.png',
          date: '27. februar',
          time: '23:00',
          isGoing: false,
          location: 'Bulevar Vojvode Bojovica 10, Beograd',
          title: 'Ilija Djokovic | Fatima Haji'
        },
        {
          clubName: 'Drugstore',
          clubLogo:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuVycdl95ggpaQAdUbwZ_kcSlWalHEoC5XoLvdXr7r57JiFtmx&s',
          date: '03. mart',
          time: '23:00',
          isGoing: false,
          location: 'Bulevar Despota Stefana 115, Beograd',
          title: 'David August'
        },
        {
          clubName: 'Barutana',
          clubLogo: 'https://i.imgur.com/xLqTCs7.jpg',
          date: '05. maj',
          time: '23:00',
          isGoing: false,
          location: 'Donji Grad, Kalemegdan, Beograd',
          title: 'Amelie Lens'
        },
        {
          clubName: 'Half',
          clubLogo: 'https://i.imgur.com/pWzfgaV.png',
          date: '07. jun',
          time: '23:00',
          isGoing: false,
          location: 'Bulevar Vojvode Bojovica 10, Beograd',
          title: 'Peggy Gou '
        }
      ];

      return ok(events);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function error(message): Observable<HttpResponse<ErrorMessage>> {
      return throwError({ message });
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
