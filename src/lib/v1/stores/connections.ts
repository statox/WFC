import { writable } from 'svelte/store';
import type { Connections } from '../types/types';

const KEY = 'v1/connections';

const defaultConnections = {
    0: {
        N: [0, 3, 5],
        E: [0, 1, 5],
        S: [0, 3, 4],
        W: [0, 1, 4]
    },
    1: {
        N: [1, 2, 4],
        E: [0, 1, 5],
        S: [1, 2, 5],
        W: [0, 1, 4]
    },
    2: {
        N: [1, 2, 4],
        E: [2, 3, 4],
        S: [1, 2, 5],
        W: [2, 3, 5]
    },
    3: {
        N: [0, 3, 5],
        E: [2, 3, 4],
        S: [0, 3, 4],
        W: [2, 3, 5]
    },
    4: {
        N: [0, 3, 5],
        E: [0, 5, 1],
        S: [1, 2, 5],
        W: [2, 3, 5]
    },
    5: {
        N: [1, 2, 4],
        E: [2, 3, 4],
        S: [0, 3, 4],
        W: [0, 1, 4]
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
