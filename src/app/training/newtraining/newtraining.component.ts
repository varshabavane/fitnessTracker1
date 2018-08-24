import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { UIService } from "../../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromTraining from "../training.reducer";
import * as fromRoot from "../../app.reducer";
@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;
  exercises$: Observable<Exercise[]>;

  constructor(
    private trainingExercise: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingExercise.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingExercise.startExercise(form.value.exercise);
  }

}
