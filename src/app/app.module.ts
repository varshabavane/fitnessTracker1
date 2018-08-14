import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from "./app-routing.module";
import { TrainingComponent } from "./training/training.component";
import { CurrentTrainingComponent } from "./training/current-training/current-training.component";
import { NewtrainingComponent } from "./training/newtraining/newtraining.component";
import { PasttrainingComponent } from "./training/pasttraining/pasttraining.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavComponent } from "./navigation/sidenav/sidenav.component";
import { StopTrainingComponent } from "./training/current-training/stop-training.component";
import { AuthService } from "./auth/auth.service";
import { TrainingService } from "./training/training.service";
/* angular fire module for firebase connectivity */
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
/* envt */
import { environment } from "../environments/environment";
import { UIService } from "./shared/ui.service";
import { AuthModule } from "./auth/auth.module";
@NgModule({
  declarations: [
    AppComponent,
    
    TrainingComponent,
    CurrentTrainingComponent,
    NewtrainingComponent,
    PasttrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}
