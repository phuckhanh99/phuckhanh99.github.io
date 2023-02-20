"use strict";
const sidebar = document.querySelector(".sidebar-header");
const inputBreed = document.querySelector("#input-breed");
const inputType = document.querySelector("#input-type");
const submitBtn = document.querySelector("#submit-btn");
const breedArr = JSON.parse(getFromStorage("breedArr", defaultPetArr));
const tableBodyEl = document.querySelector("tbody");

//Animation khi người dùng click vào Sidebar
sidebar.addEventListener("click", function (e) {
  const clicked = e.target.closest("#sidebar-title").parentElement;
  // Cau lenh dieu kien tranh loi
  if (!clicked) return;
  clicked.classList.toggle("active");
});
// Hàm thêm breed
function renderTableBreed(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((e, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${e.breed}</td>
    <td>${e.type}</td>
    
    <td>
    <button class="btn btn-danger " onclick="deleteBreed(${
      i //sử dụng PetArr.a để xác định dữ liệu
    })">Delete</button>
    </td>
    </tr>`;
    tableBodyEl.appendChild(row);
  });
}
renderTableBreed(breedArr);
// Hàm xoá dữ liệu ra khỏi mảng
function deleteBreed(value) {
  // hàm tìm index của id

  function checkID(id) {
    return id.id == value;
  }

  let i = breedArr.findIndex(checkID);

  if (confirm(`Are you sure?`)) {
    breedArr.splice(i, 1);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    renderTableBreed(breedArr);
  }
  return;
}
// Hàm nhận input
const submitBreed = function () {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  // Hàm kiểm tra breed
  function validateBreed(data) {
    var checkType = data.type === "Dog" || data.type === "Cat";

    var conTinue = !data.breed || !checkType;
    if (conTinue) {
      alert("please, fill in blank");
    }

    return !conTinue;
  }
  // Hàm clear form
  const clearinputBreed = () => {
    inputBreed.value = "";
    inputType.value = "";
    return data;
  };
  const validate = validateBreed(data);

  if (validate) {
    breedArr.push(data);
    clearinputBreed();
    renderTableBreed(breedArr);
    saveToStorage("breedArr", JSON.stringify(breedArr));
  }
};

submitBtn.addEventListener("click", submitBreed);
