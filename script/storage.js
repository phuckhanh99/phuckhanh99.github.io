"use strict";

// Hàm lưu petArr vào local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Khai báo biết petArry
var defaultPetArr = "[]";

//Hàm chuyển đổi sao dữ liệu từ localstorage sang Array

function getFromStorage(key, defaultVal) {
  return localStorage.getItem(key) ?? defaultVal;
}
