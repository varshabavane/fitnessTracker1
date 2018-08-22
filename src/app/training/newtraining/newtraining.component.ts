import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { UIService } from "../../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../../app.reducer';
@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingExercise: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  ngOnInit() {
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   isLoading => {
    //     this.isLoading = isLoading;
    //   }
    // );
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingExercise.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingExercise.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingExercise.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
