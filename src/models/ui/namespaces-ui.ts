import {Namespace} from '../namespace';
import {Task} from '../task';

export interface NamespaceUI extends Namespace {
  tasks: Task[]
  isFrozen?: boolean;
  blockedByPriority?: boolean;
}