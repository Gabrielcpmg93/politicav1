
export enum PersonColor {
  Orange = 'orange',
  Yellow = 'yellow',
  LightGreen = 'lightGreen',
  DarkGreen = 'darkGreen',
  Blue = 'blue',
  Empty = 'empty',
}

export interface PersonData {
  id: string;
  color: PersonColor;
  statusIcon?: 'clock' | 'star';
}

export type ParliamentLayout = PersonData[][];

export interface Law {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  budget: number;
}
