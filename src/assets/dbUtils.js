//IndexedDB
export const dbName = "quizDb";
export const storeName = "quizStore";

// Open Database
export function openDB(callback) {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (event) {
        let db = event.target.result;
        db.createObjectStore(storeName, { keyPath: "id" });
    };

    request.onsuccess = function (event) {
        callback(event.target.result);
    };

    request.onerror = function () {
        console.error("Error opening IndexedDB");
    };
}

// Save a Variable
export function saveToDB(key, value) {
    openDB(db => {
        let transaction = db.transaction(storeName, "readwrite");
        transaction.objectStore(storeName).put({ id: key, value });
        transaction.oncomplete = () => console.log("Saved ! attempt " + key + " : " + value);
    });

}
// Fetch All Attempts Data
export function getAllFromDB(callback) {
    openDB(db => {
        let transaction = db.transaction(storeName, "readonly");
        let store = transaction.objectStore(storeName);
        let request = store.getAll();

        request.onsuccess = function () {
            callback(request.result);
        };
    });
}
