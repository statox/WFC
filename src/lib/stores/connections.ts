import { writable } from 'svelte/store';
import type { Connections } from '../types/types';

const KEY = 'connections';

const defaultConnections = {
    1: {
        N: [1, 2, 4],
        E: [0],
        S: [1, 2],
        W: [0]
    },
    2: {
        N: [1, 2, 4],
        E: [2, 3, 4],
        S: [1, 2],
        W: [2, 3]
    },
    3: {
        N: [0],
        E: [2, 3, 4],
        S: [0],
        W: [2, 3]
    },
    4: {
        N: [0],
        E: [0],
        S: [1, 2],
        W: [2, 3]
    }
};

let connections = writable<Connections>(defaultConnections);

try {
    const storedStr = window.localStorage.getItem(KEY);

    if (storedStr !== null) {
        try {
            connections = writable<Connections>(JSON.parse(storedStr) as Connections);
        } catch (e) {
            console.error('Couldnt load local storage');
        }
    }

    connections.subscribe((value) => {
        window.localStorage.setItem(KEY, JSON.stringify(value));
    });
} catch {
    // Without this catch vite fails to render the pages on the server
    // and the build doesn't finish.
    // So this is a hack to prevent build failures
}

const deleteConnections = () => {
    connections.set({});
};

export { deleteConnections, connections };
