/**
 * Return an error object.
 *
 * @param e an error
 * @returns an error object
 */
export function errorInstance(e: Error | unknown): NodeJS.ErrnoException {
    if (e instanceof Error) {
        return e;
    } else {
        return new Error(String(e));
    }
}
