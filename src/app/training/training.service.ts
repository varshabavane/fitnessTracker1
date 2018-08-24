import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs/operators";
import { Exercise } from "./exercise.model";

import { UIService } from "../shared/ui.service";
import * as UI from "../shared/ui.action";
import * as Training from "./training.action";
import * as fromTraining from "./training.reducer";
@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection("AvailableExercises")
        .snapshotChanges()
        .pipe(
          map(docArray => {
            // throw new Error();
            return docArray.map(doc => {
              const id = doc.payload.doc.id;
              const exercise = doc.payload.doc.data() as Exercise;
              return {
                id: id,
                name: exercise.name,
                duration: exercise.duration,
                calories: exercise.calories
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTranings(exercises));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              "Fetching exercise failed, please try again later",
              null,
              3000
            );
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,          
          date: new Date(),
          state: "completed"
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }
  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          date: new Date(),
          state: "cancelled"
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercise")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTranings(exercises));
        })
    );
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection("finishedExercise").add(exercise);
  }
}
