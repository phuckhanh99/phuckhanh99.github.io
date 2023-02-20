"use strict";
const sidebar = document.querySelector(".sidebar-header");
//Animation khi người dùng click vào Sidebar
sidebar.addEventListener("click", function (e) {
  const clicked = e.target.closest("#sidebar-title").parentElement;

  // Cau lenh dieu kien tranh loi
  if (!clicked) return;
  clicked.classList.toggle("active");
});

//
var petArr = JSON.parse(getFromStorage("petArr", defaultPetArr));
const breedArr = JSON.parse(getFromStorage("breedArr", defaultPetArr));
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const formControl = document.querySelectorAll(".form-control");
const tableBodyEl = document.getElementById("tbody");
const btnHelthy = document.getElementById("healthy-btn");
const option = document.createElement("option");
let a = 0;
let conTinue = 0;
//saveToStorage("petArr", JSON.stringify([]));
//
var afterID = [];
let healthyCheck = false;
let healthyPetArr = []; //mảng pet khoẻ mạnh
// hàm đổi Buton,lọc mảng healthy và render row
function changebtn() {
  //kiểm tra và đổi text content button
  if (btnHelthy.textContent === "Show Healthy Pet") {
    btnHelthy.innerHTML = "Show All Pet";
    healthyCheck = true;
  } else {
    btnHelthy.innerHTML = "Show Healthy Pet";
    healthyCheck = false;
  }
  if (healthyCheck) {
    healthyPetArr = petArr.filter(checkTrue); // lọc mảng tìm các mảng đúng yêu cầu bằng filter
    renderTableData(healthyPetArr);
  } else {
    renderTableData(petArr);
  }
}
// hàm check tìm mảng healthy
function checkTrue(id) {
  return id.vaccinated && id.dewormed && id.sterilized === true;
}
btnHelthy.addEventListener("click", changebtn);

//hàm thêm pet mới.
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach(function (e, i) {
    const row = document.createElement("tr");
    //vòng lặp để tạo nhiều hàng thú cưng
    row.innerHTML = `<tr>
      <th scope="row">${e.id}</th>
      <td>${e.petName}</td>
      <td>${e.age}</td>
      <td>${e.type}</td>
      <td>${e.weight} kg</td>
      <td>${e.lengTh} cm</td>
      <td>${e.breed}</td>
      <td>
      <i class="bi bi-square-fill" style="color: ${e.color}"></i>
      </td>
      <td><i class="${
        e.vaccinated === true ? "bi bi-check-circle-fill" : 0
      }"></i></td>
      <td><i class="${
        e.dewormed === true ? "bi bi-check-circle-fill" : 0
      }"></i></td>
      <td><i class="${
        e.sterilized === true ? "bi bi-check-circle-fill" : 0
      }"></i></td>
      <td>${e.date}</td>
      <td>
      <button class="btn btn-danger " onclick="deletePet(${
        i //sử dụng i để xác định dữ liệu
      })">Delete</button>
      </td>
      </tr>
      `;
    tableBodyEl.appendChild(row);
  });
}
renderTableData(petArr);
// Hàm xoá dữ liệu ra khỏi mảng
function deletePet(value) {
  // hàm tìm index của id

  function checkID(id) {
    return id.id == value;
  }

  let i = petArr.findIndex(checkID);

  if (confirm(`Are you sure?`)) {
    petArr.splice(i, 1);
    saveToStorage("petArr", JSON.stringify(petArr));
    renderTableData(petArr);
    btnHelthy.innerHTML = "Show Healthy Pet";
  }
  return;
}

const submit = function () {
  //taọ mảng chứa value id đã nhập
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: ageInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    lengTh: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  function validateData(data) {
    //check if no value to alert please text all selector
    !data.id || !data.petName || !data.age || !data.weight || !data.lengTh
      ? alert("please, fill in blank")
      : (conTinue = 1);

    //kiểm tra tuổi thú
    data.age >= 1 && data.age <= 15
      ? conTinue++
      : alert("Age must be between 1 and 15!");
    //kiểm tra cân nặng
    data.weight >= 1 && data.weight <= 15
      ? conTinue++
      : alert("Weight must be between 1 and 15!");
    //kiểm tra độ dài
    data.lengTh >= 1 && data.lengTh <= 100
      ? conTinue++
      : alert("Length must be between 1 and 100!");
    //kiểm tra type
    data.type == "Select Type" ? alert("Please select Type!") : conTinue++;
    //kiểm tra breed
    data.breed == "Select Breed" ? alert("Please select Breed!") : conTinue++;
    // kiểm tra id có trùng bằng indexof để check vị trí trong array
    if (conTinue === 6) {
      petArr.some((item) => item.id === idInput.value)
        ? alert("ID must unique!")
        : conTinue++;
    }
    //kiểm tra có đủ điều kiện tiếp tục?
    conTinue === 7 ? (conTinue = true) : (conTinue = false);
    return conTinue;
  }

  //hàm clear form
  const clearInput = () => {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
    return data;
  };

  const validate = validateData(data);

  if (validate) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
    saveToStorage("petArr", JSON.stringify(petArr));
    btnHelthy.innerHTML = "Show Healthy Pet";
  }
  if (validate && data.sterilized && data.vaccinated && data.dewormed) {
    healthyPetArr.push(data);
  }
};
//------------------hàm dành cho type input và breed---------------------

// hàm render obtion breed tuỳ theo type
function renderBreed(breedArr) {
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr.forEach((e, i) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${e.breed}</option>`;
    breedInput.appendChild(option);
  });
}
//hàm lọc breedArr khi tuỳ chỉnh type
function checkTypeinput(el) {
  return el.type === typeInput.value;
}
//Hàm showcontent dành cho onchange type
function showContent() {
  renderBreed(breedArr.filter(checkTypeinput));
}
submitBtn.addEventListener("click", submit);
