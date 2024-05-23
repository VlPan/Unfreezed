import { Injectable, Signal, computed, signal } from '@angular/core';
import {NamespacesService} from './namespaces.service';
import {TasksService} from './tasks.service';
import {NamespaceUI} from '../models/ui/namespaces-ui';
import {sortByBooleanReversed} from '../helpers/sort';
import {Namespace} from '../models/namespace';
import {FrozenStatus, Task} from '../models/task';

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
 
      const withFrozen = Object.values(namespaces).map((namespace) => {
        const relatedTasks: Task[] = Object.values(tasks).filter(task => task.namespaceId === namespace.id);
        const normal = relatedTasks.filter(t => !t.isFrozen && !t.isCompleted);
        const followUp = relatedTasks.filter(t => t.isFrozen === FrozenStatus.FollowUp && !t.isCompleted);
        const frozen = relatedTasks.filter(t => t.isFrozen === FrozenStatus.Frozen && !t.isCompleted);
        const completed = relatedTasks.filter(t => t.isCompleted);
        const sortedTasks = [...normal, ...followUp, ...frozen, ...completed];

        // .sort((t1, t2 ) => sortByBooleanReversed(Boolean(t1.isFrozen), Boolean(t2.isFrozen)))
        // .sort((t1, t2 ) => sortByBooleanReversed(t1.isCompleted, t2.isCompleted))

        const allFrozen = relatedTasks.length > 0 ? relatedTasks.every(t => t.isFrozen) : false;

        return {...namespace, tasks: sortedTasks, isFrozen: allFrozen}
      })

      return withFrozen.map((namespace) => {
        const namespacesWithMorePriority = withFrozen.filter(n => n.priority < namespace.priority);
        const prevFrozen = namespacesWithMorePriority.every(n => n.isFrozen);

        return {...namespace, blockedByPriority: !prevFrozen}
      })
    })
  }
}
