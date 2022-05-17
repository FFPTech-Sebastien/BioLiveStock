import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Gets an item in the storage
 *
 * @param key => the key of the stored item
 * @returns the value with the given key
 */
export const getItem = (key: string): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
        try {
            const value = await AsyncStorage.getItem(key);
            resolve(value != null ? JSON.parse(value) : null);
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Sets an item in the storage
 *
 * @param key => the key of the stored item
 * @param value  => the value to store with the given key
 * @returns void
 */
export const setItem = (key: string, value: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await AsyncStorage.setItem(key, JSON.stringify(value)));
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * Deletes an item in the storage
 *
 * @param key => the key of the stored item
 * @returns void
 */
export const removeItem = (key: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await AsyncStorage.removeItem(key));
        } catch (err) {
            reject(err);
        }
    });
};
