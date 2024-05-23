import { Injectable, effect, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Task} from '../models/task';
import {produce} from 'immer';

export const TASK_KEY = 'unf_tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Record<Task['id'], Task>>({});

  constructor(private readonly localStorageService: LocalStorageService) {
    this.initTasks();

    effect(() => {
      const tasks = this.tasks();
      this.localStorageService.set(TASK_KEY, tasks);
    })
  }

  initTasks() {
    this.tasks.set(this.getTasks());
  }

  addTask(task: Task) {
    const tasks = this.tasks();
    const nextTasks = produce(tasks, draft => {
      draft[task.id] = task;
    });
    this.tasks.set(nextTasks);
  }

  updateTask(id: string, newState: Partial<Task>) {
    let tasks = this.tasks();
    const nextTasks = produce(tasks, draft => {
      let taskToUpdate = draft[id];
      taskToUpdate = {...taskToUpdate, ...newState};
      draft[id] = taskToUpdate;
    });
    this.tasks.set(nextTasks);
  }

  deleteTask(task: Task) {
    const tasks = this.tasks();
    const nextTasks = produce(tasks, draft => {
      delete draft[task.id];
    })
    this.tasks.set(nextTasks);
  }

  deleteAllCompletedTasks() {
    const tasks = this.tasks();
    const nextTasks = produce(tasks, draft => {
      Object.values(draft).forEach((task) => {
        if(task.isCompleted) {
          delete draft[task.id];
        }
      })
    });
    this.tasks.set(nextTasks);
  }

  getTasks() {
    return this.localStorageService.get<Record<Task['id'], Task>>(TASK_KEY) || {};
  }
}
