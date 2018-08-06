import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";

@Component({
  selector: "app-pasttraining",
  templateUrl: "./pasttraining.component.html",
  styleUrls: ["./pasttraining.component.css"]
})
export class PasttrainingComponent implements OnInit {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }
}
