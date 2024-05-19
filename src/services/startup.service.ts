import { Injectable } from '@angular/core';
import {NamespacesService} from './namespaces.service';
import {Namespace} from '../models/namespace';
import {LocalStorageService} from './local-storage.service';
import { v4 as uuidv4 } from 'uuid';
import {RandomTasksService} from './random-tasks.service';
import {RandomTask} from '../models/trandom-task';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  Delivery = uuidv4();
  Improvements = uuidv4();
  Learning = uuidv4();
  PET = uuidv4();
  Experiments = uuidv4();
  SecondBrain = uuidv4();
  Reflection = uuidv4();
  Routine = uuidv4();
  Pleasure = uuidv4();

  private randomTasks: RandomTask[] = [
    {
      id: uuidv4(),
      namespaceId: this.Delivery,
      title: 'Look sprint board',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Delivery,
      title: 'Look bug board',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Improvements,
      title: 'Look ugly code and propose to refactor it',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'daily.dev',
      weight: 3,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'AI Articles proposal',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Youtube videos',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Checkout EPAM courses',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Play with some new technology (like framework or something)',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Repeat your interview questions and update it if necessary',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Team Lead Path',
      weight: 5,
    },
    {
      id: uuidv4(),
      namespaceId: this.Learning,
      title: 'Inbox learning flow',
      weight: 5,
    },
    {
      id: uuidv4(),
      namespaceId: this.PET,
      title: 'think on new tasks && Improvements',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Experiments,
      title: 'Ask AI for homework to use some new technology or improve current',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Experiments,
      title: 'Ask AI for homework',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Experiments,
      title: 'Create / Update (try something) Playground',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Experiments,
      title: 'Look at source code of something and experiment with it',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.SecondBrain,
      title: 'Repeat',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.SecondBrain,
      title: 'Sort',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Check out if you are on your long term path (1-3Y)',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Just write down everything you think is important',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Balcon Reflection && Writing',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Meditation',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Reading',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Reflection,
      title: 'Walking and Reflection',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Routine,
      title: 'Write down typical routine tasks if always postpone and do them one by one',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Pleasure,
      title: 'Shopping',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Pleasure,
      title: 'Games',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Pleasure,
      title: 'Films',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Pleasure,
      title: 'Walking',
      weight: 1,
    },
    {
      id: uuidv4(),
      namespaceId: this.Pleasure,
      title: 'New Restaurant Try',
      weight: 1,
    },
  ]

  private startupNamespaces: Namespace[] = [
    { 
      id: this.Delivery,
      name: 'Delivery',
      priority: 1,
      color: '#87CEFA',
      focusColor: '#1E90FF'
    },
    { 
      id: this.Improvements,
      name: 'Improvements',
      priority: 1,
      color: '#cab2ed', 
      focusColor: '#ab8bd9'
    },
    { 
      id: this.Learning,
      name: 'Learning',
      priority: 2,
      color: '#95F9E3',
      focusColor: '#69EBD0'
    },
    { 
      id: this.PET,
      name: 'PET',
      priority: 2,
      color: '#FFFFE0',
      focusColor: '#FFD700'
    },
    { 
      id: this.Experiments,
      name: 'Experiments',
      priority: 2,
      color: '#D8BFD8',
      focusColor: '#9370DB'
    },
    { 
      id: this.SecondBrain,
      name: 'Second Brain',
      priority: 3,
      color: '#F5DEB3',
      focusColor: '#CD853F'
    },
    { 
      id: this.Reflection,
      name: 'Reflection',
      priority: 4,
      color: '#90EE90',
      focusColor: '#228B22'
    },
    { 
      id: this.Routine,
      name: 'Routine',
      priority: 5,
      color: '#D3D3D3',
      focusColor: '#A9A9A9'
    },
    { 
      id: this.Pleasure,
      name: 'Pleasure',
      priority: 6,
      color: '#b2ebed',
      focusColor: '#35b3b8'
    },
  ]
  
  constructor(private readonly namespacesService: NamespacesService, private readonly randomTasksService: RandomTasksService) {}

  startup() {
    this.initNamespaces();
    this.initRandomTasks();
  }

  initNamespaces() {
    if(!this.namespacesService.isNamespacesExist()) {
      this.namespacesService.updateNamespaces(this.startupNamespaces)
    }
  }

  initRandomTasks() {
    if(!this.randomTasksService.areRandomTasksExists()) {
      this.randomTasksService.updateRandomTasks(this.randomTasks)
    }
  }
}
