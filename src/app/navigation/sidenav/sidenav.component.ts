import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Subscription, Observable } from "rxjs";

import { Store } from "@ngrx/store";
import * as fromRoot from "../../app.reducer";
@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.css"]
})
export class SidenavComponent implements OnInit {
  @Output()
  closeSideNav = new EventEmitter<void>();
  isAuth$:Observable<boolean>;
  authSubscription: Subscription;
  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
  }
  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
