import { Exercise } from "./exercise.model";
import { Subject, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as UI from '../shared/ui.action'
import * as Training from './training.action';
import * as fromTraining from './training.reducer';
@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private finishedExercises: Exercise[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromTraining.State>) {}

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
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
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
          },
          error => {
            // this.uiService.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              "Fetching exercise failed, please try again later",
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );

    this.exerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: "completed"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: "cancelled"
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(
      this.db
        .collection("finishedExercise")
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
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
