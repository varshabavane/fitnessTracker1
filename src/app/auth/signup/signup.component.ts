import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { UIService } from "../../shared/ui.service";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
import { Observable } from "rxjs";
import { DateAdapter } from "@angular/material";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  maxDate = new Date();
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale("en-IN");
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date(
      this.maxDate.getFullYear() - 18,
      this.maxDate.getMonth(),
      this.maxDate.getDate()
    );
  }
  onSubmit(form: NgForm) {
    this.authService.registeredUser({
      email: form.value.email,
      password: form.value.password
    });
  }

 
}
