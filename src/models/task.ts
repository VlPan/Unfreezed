export interface Task {
  id: string;
  namespaceId: string;
  title: string;
  isCompleted: boolean;
  isFrozen: boolean;
  frozenReason: string;
}