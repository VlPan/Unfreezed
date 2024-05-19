export const sortByBoolean = (x: boolean, y: boolean) => (x === y) ? 0 : x ? -1 : 1;
export const sortByBooleanReversed = (x: boolean, y: boolean) => (x === y) ? 0 : x ? 1 : -1;