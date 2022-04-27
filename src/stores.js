import {writable} from 'svelte/store';

const itemName = "items";
const retrieved = localStorage.getItem(itemName)
const parsed = JSON.parse(retrieved)
export const items = writable(parsed === null ? [] : parsed);

items.subscribe(value =>
    localStorage.setItem(itemName, JSON.stringify(value))
)