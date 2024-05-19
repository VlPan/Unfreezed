import { Injectable, Signal, computed, signal } from '@angular/core';
import {NamespacesService} from './namespaces.service';
import {TasksService} from './tasks.service';
import {NamespaceUI} from '../models/ui/namespaces-ui';
import {sortByBooleanReversed} from '../helpers/sort';
import {Namespace} from '../models/namespace';
import {Task} from '../models/task';

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
 
      const withFrozen = namespaces.map((namespace) => {
        const relatedTasks: Task[] = tasks.filter(task => task.namespaceId === namespace.id)
        .sort((t1, t2 ) => sortByBooleanReversed(t1.isCompleted, t2.isCompleted))
        .sort((t1, t2 ) => sortByBooleanReversed(t1.isFrozen, t2.isFrozen));

        const allFrozen = relatedTasks.length > 0 ? relatedTasks.every(t => t.isFrozen) : false;

        return {...namespace, tasks: relatedTasks, isFrozen: allFrozen}
      })

      return withFrozen.map((namespace) => {
        const namespacesWithMorePriority = withFrozen.filter(n => n.priority < namespace.priority);
        const prevFrozen = namespacesWithMorePriority.every(n => n.isFrozen);

        // return {...namespace, blockedByPriority: !prevFrozen || namespace.tasks.length === 0}
        return {...namespace, blockedByPriority: !prevFrozen}
      })
    })
  }
}
