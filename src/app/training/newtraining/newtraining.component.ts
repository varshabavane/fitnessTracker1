import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { TrainingService } from "../training.service";

@Component({
  selector: "app-newtraining",
  templateUrl: "./newtraining.component.html",
  styleUrls: ["./newtraining.component.css"]
})
export class NewtrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  private exercises;
  constructor(private trainingExercise: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingExercise.availableExercises;
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
