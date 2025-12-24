
import type { ParliamentLayout, PersonData } from './types';
import { PersonColor } from './types';

const createPerson = (color: PersonColor, statusIcon?: 'clock' | 'star'): PersonData => ({
  id: crypto.randomUUID(),
  color,
  statusIcon,
});

export const initialParliamentLayout: ParliamentLayout = [
  [
    createPerson(PersonColor.Orange), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow), createPerson(PersonColor.Yellow),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue),
  ],
  [
    createPerson(PersonColor.Orange), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow), createPerson(PersonColor.Yellow),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue),
  ],
  [
    createPerson(PersonColor.Orange), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow), createPerson(PersonColor.Yellow),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue),
  ],
  [
    createPerson(PersonColor.Orange), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow, 'clock'), createPerson(PersonColor.Yellow),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue),
  ],
  [
    createPerson(PersonColor.Orange), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow), createPerson(PersonColor.Yellow),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue),
  ],
  [
    createPerson(PersonColor.Orange, 'star'), createPerson(PersonColor.Orange),
    createPerson(PersonColor.Yellow), createPerson(PersonColor.Yellow, 'star'),
    createPerson(PersonColor.LightGreen), createPerson(PersonColor.DarkGreen),
    createPerson(PersonColor.DarkGreen), createPerson(PersonColor.Blue, 'star'),
  ],
];
