const DB_NAME = 'LibraryDatabase';
const DB_VERSION = 2;
const STORE_BOOKS = 'books';
const STORE_CART = 'cart';
const STORE_WISHLIST = 'wishlist';

export const openDB = () => {
    return new Promise((resolve, reject) => {
        if (!('indexedDB' in window)) {
            reject('Браузер не підтримує IndexedDB');
            return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
    
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            
            if (!db.objectStoreNames.contains(STORE_BOOKS)) {
                db.createObjectStore(STORE_BOOKS, { keyPath: 'id' });
            }

            if (!db.objectStoreNames.contains(STORE_CART)) {
                db.createObjectStore(STORE_CART, { keyPath: 'id' }); 
            }

            if (!db.objectStoreNames.contains(STORE_WISHLIST)) {
                db.createObjectStore(STORE_WISHLIST, { keyPath: 'id' });
            }
        };

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
};

// === BOOKS ===
export const saveBooksToCache = async (books) => {
    await saveData(STORE_BOOKS, books);
};
export const getBooksFromCache = async () => {
    return await getData(STORE_BOOKS);
};

// === CART (Кошик) ===
export const saveCartToCache = async (cartItems) => {
    await saveData(STORE_CART, cartItems);
};
export const getCartFromCache = async () => {
    return await getData(STORE_CART);
};

// === WISHLIST (Список бажань) ===
export const saveWishlistToCache = async (idsArray) => {
    const dataToSave = idsArray.map(id => ({ id }));
    await saveData(STORE_WISHLIST, dataToSave);
};

export const getWishlistFromCache = async () => {
    const data = await getData(STORE_WISHLIST);
    return data.map(item => item.id);
};

const saveData = async (storeName, data) => {
    try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.clear(); 
        data.forEach(item => store.put(item));
    } catch (err) {
        console.error(`Помилка запису в ${storeName}:`, err);
    }
};

const getData = async (storeName) => {
    try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readonly');
        return new Promise((resolve) => {
            const req = tx.objectStore(storeName).getAll();
            req.onsuccess = () => resolve(req.result || []);
            req.onerror = () => resolve([]);
        });
    } catch (err) {
        return [];
    }
};