import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pasttraining",
  templateUrl: "./pasttraining.component.html",
  styleUrls: ["./pasttraining.component.css"]
})
export class PasttrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription: Subscription;

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        console.log(exercises);
        this.dataSource.data = exercises;
      }
    );
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
  }
}
