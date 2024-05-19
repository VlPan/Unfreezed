import { Injectable, signal } from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {Namespace} from '../models/namespace';
import {BehaviorSubject} from 'rxjs';

export const NAMESPACE_KEY = 'unf_namespaces'

@Injectable({
  providedIn: 'root'
})
export class NamespacesService {
  namespaces = signal([]);

  constructor(private readonly localStorageService: LocalStorageService) {
    this.setNamespaces();
  }

  setNamespaces() {
    this.namespaces.set(this.getNamespaces());
  }

  updateNamespaces(namespaces: Namespace[]) {
    this.localStorageService.set(NAMESPACE_KEY, namespaces);
    this.namespaces.set(namespaces);
  }
    
  addNamespace(namespace: Namespace) {
    const namespaces = this.getNamespaces();
    namespaces.push(namespace);
    this.updateNamespaces(namespaces);
  }

  isNamespacesExist() {
    return this.getNamespaces().length > 0;
  }

  private getNamespaces() {
    return this.localStorageService.get<Namespace[]>(NAMESPACE_KEY) || [];
  }
}
