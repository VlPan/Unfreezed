export interface Task {
  id: string;
  namespaceId: string;
  title: string;
  isCompleted: boolean;
  isImportant?: boolean;
  isFrozen: FrozenStatus | null;
  frozenReason: string;
  attachedLinks?: Link[];
}

export interface Link {
  caption: string;
  url: string;
}

export enum FrozenStatus {
  Frozen = 'Frozen',
  FollowUp = 'Follow Up',
}