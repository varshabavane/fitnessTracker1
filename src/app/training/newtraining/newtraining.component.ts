import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TrainingService } from "../training.service";
import { Exercise } from "../exercise.model";

@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  private exercises: Exercise[] = [];
  constructor(private trainingExercise: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingExercise.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
