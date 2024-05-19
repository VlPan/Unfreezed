import { Injectable } from '@angular/core';
import {NamespacesService} from './namespaces.service';
import {Namespace} from '../models/namespace';
import {LocalStorageService} from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  private startupNamespaces: Namespace[] = [
    { 
      id: uuidv4(),
      name: 'Delivery',
      priority: 1,
      color: '#87CEFA',
      focusColor: '#1E90FF'
    },
    { 
      id: uuidv4(),
      name: 'Learning',
      priority: 2,
      color: '#95F9E3',
      focusColor: '#69EBD0'
    },
    { 
      id: uuidv4(),
      name: 'PET',
      priority: 2,
      color: '#FFFFE0',
      focusColor: '#FFD700'
    },
    { 
      id: uuidv4(),
      name: 'Experiments',
      priority: 2,
      color: '#D8BFD8',
      focusColor: '#9370DB'
    },
    { 
      id: uuidv4(),
      name: 'Second Brain',
      priority: 3,
      color: '#F5DEB3',
      focusColor: '#CD853F'
    },
    { 
      id: uuidv4(),
      name: 'Reflection',
      priority: 4,
      color: '#90EE90',
      focusColor: '#228B22'
    },
    { 
      id: uuidv4(),
      name: 'Routine',
      priority: 5,
      color: '#D3D3D3',
      focusColor: '#A9A9A9'
    },
  ]
  
  constructor(private readonly namespacesService: NamespacesService, private readonly localStorageService: LocalStorageService) {}

  startup() {
    this.initNamespaces();
  }

  initNamespaces() {
    if(!this.namespacesService.isNamespacesExist()) {
      this.namespacesService.updateNamespaces(this.startupNamespaces)
    }
  }
}
