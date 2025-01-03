/**
 * Utility for interacting with localStorage in a type-safe manner.
 */

export const localStorageHelper = {
  productsKey: 'mercibizuhb_products',
  salesKey: 'mercibizuhb_sales',

  /**
   * Get an item from localStorage.
   * @param key - The key of the item to retrieve.
   * @returns The parsed value of the item or `null` if not found.
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(
        `Error parsing localStorage item with key "${key}":`,
        error
      );
      return null;
    }
  },

  /**
   * Set an item in localStorage.
   * @param key - The key of the item.
   * @param value - The value to store.
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(
        `Error setting localStorage item with key "${key}":`,
        error
      );
    }
  },

  /**
   * Remove an item from localStorage.
   * @param key - The key of the item to remove.
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(
        `Error removing localStorage item with key "${key}":`,
        error
      );
    }
  },

  /**
   * Clear all items in localStorage.
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

export default localStorageHelper;
