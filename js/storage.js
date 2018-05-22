function storeObject(key, obj){
    var objAsString = JSON.stringify(obj);
    localStorage.setItem(key, objAsString);
}

function storeSingleItem(key, item){
    localStorage.setItem(key, item);
}

function getStoredObject(key) {
    var objAsString = localStorage.getItem(key);
    return JSON.parse(objAsString);
}

function getStoredItem(key) {
    return localStorage.getItem(key);
}