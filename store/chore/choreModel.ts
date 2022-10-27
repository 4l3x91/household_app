export interface Chore {
  id: string;
  householdId: string;
  name: string;
  description: string;
  interval: number;
  energy: number;
  archived: boolean;
}
