import { Injectable, effect, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {RandomTask} from '../models/trandom-task';
import {produce} from 'immer';

export const RANDOM_TASK_KEY = 'unf_radom_tasks_list'

@Injectable({
  providedIn: 'root'
})
export class RandomTasksService {
  randomTasks = signal<Record<RandomTask['id'], RandomTask>>({});

  constructor(private readonly localStorageService: LocalStorageService) {
    this.initRandomTasks();

    effect(() => {
      const randomTasks = this.randomTasks();
      this.localStorageService.set(RANDOM_TASK_KEY, randomTasks);
    })
  }

  initRandomTasks() {
    this.randomTasks.set(this.getRandomTasks());
  }
  
  addRandomTask(randomTask: RandomTask) {
    const randomTasks = this.randomTasks();
    const nextRandomTasks = produce(randomTasks, draft => {
      draft[randomTask.id] = randomTask;
    });
    this.randomTasks.set(nextRandomTasks);
  }

  updateRandomTask(id: string, newState: Partial<RandomTask>) {
    let randomTasks = this.randomTasks();
    const nextRandomTasks = produce(randomTasks, draft => {
      let randomTaskToUpdate = draft[id];
      randomTaskToUpdate = {...randomTaskToUpdate, ...newState};
      draft[id] = randomTaskToUpdate;
    });
    this.randomTasks.set(nextRandomTasks);
  }

  deleteRandomTask(randomTask: RandomTask) {
    const randomTasks = this.randomTasks();
    const nextRandomTasks = produce(randomTasks, draft => {
      delete draft[randomTask.id];
    })
    this.randomTasks.set(nextRandomTasks);
  }

  areRandomTasksExists() {
    return Object.values(this.getRandomTasks()).length > 0;
  }

  getRandomTask(tasks: RandomTask[]): RandomTask {
    const withPriority = this.prioritizeTasks(tasks);

    const min = 0;
    const max = withPriority.length;
    const rand = Math.floor(Math.random() * max) + min;

    return withPriority[rand];
  }

  private prioritizeTasks(tasks: RandomTask[]): RandomTask[] {
    return tasks.reduce((acc, cur) => {
      for (let i = 0; i < cur.weight; i++) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  private getRandomTasks() {
    return this.localStorageService.get<Record<RandomTask['id'], RandomTask>>(RANDOM_TASK_KEY) || {};
  }
}
