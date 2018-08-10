import { Subject } from "rxjs";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import { TrainingService } from "../training/training.service";
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private traningService: TrainingService
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
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });

    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };

    // this.authChange.next(true);
    // this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccessfully();
      })
      .catch(error => {
        console.log(error);
      });
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this.authChange.next(true);
    // this.authSuccessfully();
  }

  // logout() {
  //   // this.user = null;
  //   this.traningService.cancelSubscription();
  //   this.afAuth.auth.signOut();
  //   this.authChange.next(false);
  //   this.router.navigate(["/login"]);
  //   this.isAuthenticated = false;
  // }

  isAuth() {
    return this.isAuthenticated;
  }

  // private authSuccessfully() {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.router.navigate(["/training"]);
  // }
}
