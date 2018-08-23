import { Component, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { TrainingService } from "./training.service";
import { Store } from "@ngrx/store";
import * as fromTraining from "./training.reducer";
@Component({
  selector: "app-training",
  templateUrl: "./training.component.html",
  styleUrls: ["./training.component.css"]
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   ex => {
    //     if (ex) {
    //       this.ongoingTraining = true;
    //     } else {
    //       this.ongoingTraining = false;
    //     }
    //   }
    // );
  }

  
}
