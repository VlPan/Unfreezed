import { Injectable, effect, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Namespace} from '../models/namespace';
import {produce} from 'immer';

export const NAMESPACE_KEY = 'unf_namespaces'

@Injectable({
  providedIn: 'root'
})
export class NamespacesService {
  namespaces = signal<Record<Namespace['id'], Namespace>>({});

  constructor(private readonly localStorageService: LocalStorageService) {
    this.initNamespaces();

    effect(() => {
      const namespaces = this.namespaces();
      this.localStorageService.set(NAMESPACE_KEY, namespaces);
    })
  }

  initNamespaces() {
    this.namespaces.set(this.getNamespaces());
  }

  updateNamespace(id: string, newState: Partial<Namespace>) {
    let namespaces = this.namespaces();
    const nextNamespaces = produce(namespaces, draft => {
      let namespaceToUpdate = draft[id];
      namespaceToUpdate = {...namespaceToUpdate, ...newState};
      draft[id] = namespaceToUpdate;
    });
    this.namespaces.set(nextNamespaces);
  }
    
  addNamespace(namespace: Namespace) {
    const namespaces = this.getNamespaces();
    const nextNamespaces = produce(namespaces, draft => {
      draft[namespace.id] = namespace;
    });
    this.namespaces.set(nextNamespaces);
  }


  deleteNamespace(namespace: Namespace) {
    const namespaces = this.namespaces();
    const nextNamespaces = produce(namespaces, draft => {
      delete draft[namespace.id];
    })
    this.namespaces.set(nextNamespaces);
  }


  isNamespacesExist() {
    return Object.values(this.getNamespaces()).length > 0;
  }

  private getNamespaces() {
    return this.localStorageService.get<Record<Namespace['id'], Namespace>>(NAMESPACE_KEY) || {};
  }
}
