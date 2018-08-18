import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  CanLoad
} from "@angular/router";

import { Store } from "@ngrx/store";
// import { AuthService } from "./auth.service";
import * as fromRoot from "../app.reducer";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromRoot.State>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route):Observable<any> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
