import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { SharedModule } from "../shared/shared.module";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: []
})
export class AuthModule {}
