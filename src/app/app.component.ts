import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Signal,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartupService } from '../services/startup.service';
import { NamespacesService } from '../services/namespaces.service';
import { NamespaceComponent } from '../components/namespace/namespace.component';
import { RepresentationService } from '../services/representation.service';
import { NamespaceUI } from '../models/ui/namespaces-ui';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {NgClass} from '@angular/common';
import {UIStateService} from '../services/ui-state.service';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {TasksService} from '../services/tasks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NamespaceComponent, MatIconModule, MatChipsModule, NgClass, MatButtonModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('namespacesEl') namespacesEl: ElementRef;
  namespaces: Signal<NamespaceUI[]>;
  focusedNamespaceId = signal(null);
  constructor(
    private readonly startupService: StartupService,
    private readonly representationService: RepresentationService,
    private readonly namespaceService: NamespacesService,
    public readonly uiStateService: UIStateService,
    public readonly tasksService: TasksService,
  ) {}

  private isDown = false;
  isDragging = false;
  private startX;
  private scrollLeft;

  ngOnInit() {
    this.startupService.startup();
    this.namespaces = this.representationService.namespacesUI;
  }

  toggleShown(namespace: NamespaceUI) {
    this.namespaceService.updateNamespace(namespace.id, {isShown: !namespace.isShown});
  }

  isShown(namespace) {
    return namespace.isShown || ( !namespace.isFrozen && !namespace.blockedByPriority);
  }

  onNamespaceFocus(namespace) {
    const isAlreadyFocused = this.focusedNamespaceId() === namespace.id
    if(isAlreadyFocused) {
      this.focusedNamespaceId.set(null);
      return;
    } 
    this.focusedNamespaceId.set(namespace.id);
    this.hideAll();
    this.namespaceService.updateNamespace(namespace.id, {isShown: true});
  }

  hideAll() {
    const ns = this.namespaces();
    for (const n of ns) {
      this.namespaceService.updateNamespace(n.id, {isShown: false});
    }
  }

  showAll() {
    const ns = this.namespaces();
    for (const n of ns) {
      this.namespaceService.updateNamespace(n.id, {isShown: true});
    }
  }

  onMousedown($event) {
    this.isDown = true;
    this.isDragging = true;
    
    this.startX = $event.pageX - this.namespacesEl.nativeElement.offsetLeft;
    this.scrollLeft = this.namespacesEl.nativeElement.scrollLeft;
  }

  onMouseleave() {
    this.isDown = false;
    this.isDragging = false;
  }

  onMouseup() {
    this.isDown = false;
    this.isDragging = false;
  }

  onMousemove($event) {
    if(!this.isDown) return;
    $event.preventDefault();
    const x = $event.pageX - this.namespacesEl.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.5;
    this.namespacesEl.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  resetTimers() {
    this.uiStateService.resetTimers();
  }

  resetScores() {
    this.uiStateService.resetScores();
  }

  convertToScores() {
    const time = this.uiStateService.totalTime();

    this.uiStateService.addScores(time);
    this.uiStateService.resetTimers();
  }

  removeAllCompleted() {
    this.tasksService.deleteAllCompletedTasks();
  }
}
