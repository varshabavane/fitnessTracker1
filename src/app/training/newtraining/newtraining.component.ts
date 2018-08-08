import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  constructor(
    private trainingExercise: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // this.exercises = this.trainingExercise.getAvailableExercises();
    
  }

  onStartTraining(form: NgForm) {
    this.trainingExercise.startExercise(form.value.exercise);
  }
}
