const DB_NAME = 'LibraryDatabase';
const DB_VERSION = 2; // ⚠️ ВАЖЛИВО: Підняли версію, щоб створити нові таблиці
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
        
        // Цей код спрацює автоматично, бо ми змінили версію з 1 на 2
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            
            // 1. Сховище Книг (якщо ще немає)
            if (!db.objectStoreNames.contains(STORE_BOOKS)) {
                db.createObjectStore(STORE_BOOKS, { keyPath: 'id' });
            }

            // 2. Сховище Кошика (НОВЕ)
            if (!db.objectStoreNames.contains(STORE_CART)) {
                db.createObjectStore(STORE_CART, { keyPath: 'id' }); // id книги
            }

            // 3. Сховище Вішліста (НОВЕ)
            // У вішлісті ми зберігаємо тільки ID, тому структура буде { id: 123 }
            if (!db.objectStoreNames.contains(STORE_WISHLIST)) {
                db.createObjectStore(STORE_WISHLIST, { keyPath: 'id' });
            }
        };

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
    });
};

// === BOOKS (Залишаємо як було) ===
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
    // IndexedDB любить об'єкти, тому перетворюємо [1, 5] -> [{id: 1}, {id: 5}]
    const dataToSave = idsArray.map(id => ({ id }));
    await saveData(STORE_WISHLIST, dataToSave);
};

export const getWishlistFromCache = async () => {
    const data = await getData(STORE_WISHLIST);
    // Перетворюємо назад: [{id: 1}, {id: 5}] -> [1, 5]
    return data.map(item => item.id);
};

// === УНІВЕРСАЛЬНІ ФУНКЦІЇ (Щоб не дублювати код) ===
const saveData = async (storeName, data) => {
    try {
        const db = await openDB();
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.clear(); // Чистимо старе
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