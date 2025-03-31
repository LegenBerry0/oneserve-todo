import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, take } from 'rxjs/operators';
import { syncState } from '../state/sync/sync.actions';

@Injectable({ providedIn: 'root' })
export class BroadcastSyncService implements OnDestroy {
  private channel: BroadcastChannel;
  private stateSubscription!: Subscription;

  constructor(private store: Store<any>) {
    this.channel = new BroadcastChannel('ngrx-sync-todos');

    this.channel.onmessage = (message) => {
      const broadcastedData = message.data;
      this.store
        .select('todo')
        .pipe(take(1))
        .subscribe((currentState) => {
          if (!this.isEqual(currentState, broadcastedData.todoState)) {
            this.store.dispatch(syncState({ state: broadcastedData }));
          }
        });
    };

    this.stateSubscription = this.store
      .select('todo')
      .pipe(distinctUntilChanged((prev, curr) => this.isEqual(prev, curr)))
      .subscribe((state) => {
        this.channel.postMessage({ todoState: state });
      });
  }

  ngOnDestroy(): void {
    this.stateSubscription.unsubscribe();
    this.channel.close();
  }

  isEqual(prev: any, curr: any) {
    return JSON.stringify(prev) === JSON.stringify(curr);
  }
}
