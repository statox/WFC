import { writable } from 'svelte/store';
import type { Connections } from './components/types';

const KEY = 'connections';

const defaultConnections = {
    0: {
        N: [0, 1, 3],
        S: [0, 1]
    },
    1: {
        N: [0, 1, 3],
        E: [1, 2, 3],
        S: [0, 1],
        W: [1, 2]
    },
    2: {
        E: [1, 2, 3],
        W: [1, 2]
    },
    3: {
        S: [0, 1],
        W: [1, 2]
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
