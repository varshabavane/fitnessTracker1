import { Component, OnInit } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  private exercises: Exercise[] = [];
  constructor(private trainingExercise: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingExercise.getAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingExercise.startExercise(form.value.exercise);
  }
}
