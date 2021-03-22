/**
 * Generates a color hash for the specified string
 * @param text
 * @returns hsl color prop
 */
export function hashColor(text: string) {
    const hash = [...text].reduce<number>((prev: number, curr: string) => {
        return curr.charCodeAt(0) + ((prev << 5) - prev);
    }, 0);

    return `hsl(${hash % 360}, 100%, 80%)`;
}
