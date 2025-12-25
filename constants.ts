
import type { ParliamentLayout, PersonData } from './types';
import { PersonColor } from './types';

const firstNames = ['Artur', 'Bruno', 'Carlos', 'Davi', 'Enzo', 'Felipe', 'Gustavo', 'Heitor', 'Igor', 'João', 'Lucas', 'Miguel', 'Nicolas', 'Otto', 'Pedro', 'Rafael', 'Samuel', 'Thiago', 'Victor', 'Alice', 'Beatriz', 'Clara', 'Eduarda', 'Fernanda', 'Gabriela', 'Helena', 'Isabela', 'Júlia', 'Laura'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Melo', 'Barbosa', 'Nunes', 'Mendes', 'Vieira'];

export const generateRandomName = (): string => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
};

export const generateParliamentLayout = (partyDistribution: { name: string, seats: number, color: PersonColor }[]): ParliamentLayout => {
    const people: PersonData[] = [];
    partyDistribution.forEach(({ name, seats, color }) => {
        for (let i = 0; i < seats; i++) {
            people.push({
                id: crypto.randomUUID(),
                color,
                name: generateRandomName(),
                party: name,
                influence: Math.floor(Math.random() * 100) + 1,
                loyalty: Math.floor(Math.random() * 100) + 1,
            });
        }
    });

    // Fill remaining seats if total is less than 48
    const totalSeats = people.length;
    for (let i = 0; i < 48 - totalSeats; i++) {
        people.push({ id: crypto.randomUUID(), color: PersonColor.Empty });
    }

    // Shuffle the people to mix parties in the layout
    for (let i = people.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [people[i], people[j]] = [people[j], people[i]];
    }
    
    // Distribute into rows
    const layout: ParliamentLayout = [];
    const seatsPerRow = 8;
    const numRows = 6;
    for (let i = 0; i < numRows; i++) {
        layout.push(people.slice(i * seatsPerRow, (i + 1) * seatsPerRow));
    }
    
    return layout;
};
