import { Injectable, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {RandomTask} from '../models/trandom-task';

export const RANDOM_TASK_KEY = 'unf_radom_tasks_list'

@Injectable({
  providedIn: 'root'
})
export class RandomTasksService {
  randomTasks = signal([]);

  constructor(private readonly localStorageService: LocalStorageService) {
    this.setRandomTasks();
  }

  setRandomTasks() {
    this.randomTasks.set(this.getRandomTasks());
  }

  updateRandomTasks(tasks: RandomTask[]) {
    this.localStorageService.set(RANDOM_TASK_KEY, tasks);
    this.randomTasks.set(tasks);
  }
  
  addRandomTask(task: RandomTask) {
    const randomTasks = this.getRandomTasks();
    randomTasks.push(task);
    this.updateRandomTasks(randomTasks);
  }

  updateRandomTask(id: string, newState: Partial<RandomTask>) {
    let randomTasks = this.getRandomTasks()
    let taskToUpdate = randomTasks.find(t => t.id === id);
    let index = randomTasks.findIndex(t => t.id === id);
    taskToUpdate = {...taskToUpdate, ...newState, id};

    randomTasks[index] = taskToUpdate

    console.log('random tasks after update ', randomTasks);
    this.updateRandomTasks(randomTasks);
  }

  deleteTask(task: RandomTask) {
    const randomTasks = this.getRandomTasks().filter(t => t.id !== task.id);
    this.updateRandomTasks(randomTasks);
  }

  areRandomTasksExists() {
    return this.getRandomTasks().length > 0;
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
    return this.localStorageService.get<RandomTask[]>(RANDOM_TASK_KEY) || [];
  }
}
