import { Component, OnInit, OnDestroy } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
// import { Observable } from "rxjs";
// import { map } from "rxjs/operators";
import { Subscription } from "rxjs";
@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingExercise: TrainingService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingExercise.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
    );
    this.trainingExercise.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    //  console.log(form.value.exercise)
    this.trainingExercise.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
