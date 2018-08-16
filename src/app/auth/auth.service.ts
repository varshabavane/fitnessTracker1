import { Subject } from "rxjs";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../app.reducer";

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private traningService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(["/training"]);
      } else {
        this.traningService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(["/login"]);
        this.isAuthenticated = false;
      }
    });
  }

  registeredUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
        console.log(result);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 3000);
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
