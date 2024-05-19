import {
  Component,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StartupService } from '../services/startup.service';
import { NamespacesService } from '../services/namespaces.service';
import { AsyncPipe } from '@angular/common';
import { NamespaceComponent } from '../components/namespace/namespace.component';
import { RepresentationService } from '../services/representation.service';
import { NamespaceUI } from '../models/ui/namespaces-ui';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NamespaceComponent, MatIconModule, MatChipsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  namespaces: Signal<NamespaceUI[]>;
  constructor(
    private readonly startupService: StartupService,
    private readonly representationService: RepresentationService,
    private readonly namespaceService: NamespacesService
  ) {}

  ngOnInit() {
    this.startupService.startup();
    this.namespaces = this.representationService.namespacesUI;
  }

  toggleShown(namespace: NamespaceUI) {
    this.namespaceService.updateNamespace(namespace.id, {isShown: !namespace.isShown});
  }
}
