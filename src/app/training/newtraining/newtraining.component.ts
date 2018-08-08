import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "angularfire2/firestore";
@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  private exercises: Exercise[] = [];
  constructor(
    private trainingExercise: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // this.exercises = this.trainingExercise.getAvailableExercises();
    this.db
      .collection("AvailableExercises")
      .valueChanges()
      .subscribe(result => {
        console.log(result);
      });
  }

  onStartTraining(form: NgForm) {
    this.trainingExercise.startExercise(form.value.exercise);
  }
}
