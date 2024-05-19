import { Injectable, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Task} from '../models/task';

export const TASK_KEY = 'unf_tasks'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal([]);

  constructor(private readonly localStorageService: LocalStorageService) {
    this.setTasks();
  }

  setTasks() {
    this.tasks.set(this.getTasks());
  }

  updateTasks(tasks: Task[]) {
    this.localStorageService.set(TASK_KEY, tasks);
    this.tasks.set(tasks);
  }
  
  addTask(task: Task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.updateTasks(tasks);
  }

  private getTasks() {
    return this.localStorageService.get<Task[]>(TASK_KEY) || [];
  }
}
