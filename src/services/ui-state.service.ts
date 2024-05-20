import { Injectable, computed, effect, signal } from '@angular/core';
import { Namespace } from '../models/namespace';
import { LocalStorageService } from './local-storage.service';

export const SCORES_KEY = 'unf_scores';
export const TIMERS_KEY = 'unf_timers';

@Injectable({
  providedIn: 'root',
})
export class UIStateService {
  constructor(private readonly localStorageService: LocalStorageService) {
    this.setTimers();
    this.setScores();
  }
  namespaceTimerMap = signal<
    Record<Namespace['id'], { total: number; next: number }>
  >({}, {equal: (a,b) => structuredClone(a) === structuredClone(b)});

  totalTime = computed(() => {
    return Object.values(this.namespaceTimerMap()).reduce(
      (acc, item) => acc + item.total,
      0
    );
  });

  scores = signal(0);

  setTimers() {
    this.namespaceTimerMap.set(this.getTimers());
  }

  setScores() {
    this.scores.set(this.getScores());
  }

  resetTimers() {
    this.localStorageService.set(TIMERS_KEY, {});
    this.namespaceTimerMap.set({});
  }

  resetScores() {
    this.localStorageService.set(SCORES_KEY, 0);
    this.scores.set(0);
  }

  addScores(time: number) {
    const value: number = this.localStorageService.get(SCORES_KEY) || 0;
    const parts = time / 100;
    const last = time % 100;
    
    const arr = Array(Math.floor(parts)).fill(100);
    arr.push(last);

    const scoresToAdd = arr.reduce((acc, cur, index) => {
      return acc + (cur * (0.1 + (0.1 * index)));
    }, 0);
    const newScores: number = value + scoresToAdd;
    this.localStorageService.set(SCORES_KEY, newScores);
    this.scores.set(newScores);
  }

  addTime(id: Namespace['id']) {
    this.namespaceTimerMap.update(v => {
      const currentTime = v[id] || { total: 0, next: 10 };
      const newNext = currentTime.next + 10;
      const newTotal = currentTime.total + currentTime.next;
      v[id] = { total: newTotal, next: newNext };
  
      this.localStorageService.set(TIMERS_KEY, v);
      return v;
    });
  }

  private getTimers(): any {
    return (
      this.localStorageService.get(
        TIMERS_KEY
      ) || {}
    );
  }

  private getScores(): any {
    return (
      this.localStorageService.get(
        SCORES_KEY
      ) || 0
    );
  }
}
