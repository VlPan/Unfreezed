import { Injectable, Signal, computed, signal } from '@angular/core';
import {NamespacesService} from './namespaces.service';
import {TasksService} from './tasks.service';
import {NamespaceUI} from '../models/ui/namespaces-ui';

@Injectable({
  providedIn: 'root'
})
export class RepresentationService {
  namespacesUI: Signal<NamespaceUI[]> = signal([]);

  constructor(
    private readonly namespaceService: NamespacesService,
    private readonly taskService: TasksService,
  ) {
    this.namespacesUI = computed(() =>  { 
      let namespaces = this.namespaceService.namespaces();
      const tasks = this.taskService.tasks();

      // namespaces = [namespaces[0], namespaces[1], namespaces[3]]; // todo: remove

      return namespaces.map((namespace) => {
        const relatedTasks = tasks.filter(task => task.namespaceId === namespace.id);
        return {...namespace, tasks: relatedTasks}
      })
    })
  }
}
