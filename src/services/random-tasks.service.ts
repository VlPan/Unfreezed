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

  deleteTasksByNamespaceId(id: string) {
    const tasks = this.randomTasks();
    const nextTasks = produce(tasks, draft => {
      for (const task of Object.values(draft)) {
        if(task.namespaceId === id) {
          delete draft[task.id];
        }
      }
    })
    this.randomTasks.set(nextTasks);
  }

  areRandomTasksExists() {
    return Object.values(this.getRandomTasks()).length > 0;
  }


  getRandomTasksByNamespaceId(id) {
    return Object.values(this.randomTasks()).filter(t => t.namespaceId === id);
  }

  replaceTasksInNamespace(namespaceId: string, updatedTasks: RandomTask[]) {
    const randomTasks = this.randomTasks();
    const nextRandomTasks = produce(randomTasks, draft => {
      const namespaceRelated = Object.values(draft).filter(t => t.namespaceId === namespaceId);
      for (const task of namespaceRelated) {
        delete draft[task.id];
      }

      for (const newTask of updatedTasks) {
        draft[newTask.id] = newTask;
      }
    })
    this.randomTasks.set(nextRandomTasks);
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
