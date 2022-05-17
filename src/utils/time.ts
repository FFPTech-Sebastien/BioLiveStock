/**
 * Simulates a time delay
 *
 * @param timeout number => timeout in milliseconds
 * @returns a promise that resolves after the given timeout
 */
export const wait = (timeout: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};
