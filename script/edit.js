"use strict";
let i = 0;
var petArr = JSON.parse(getFromStorage("petArr", defaultPetArr));
const breedArr = JSON.parse(getFromStorage("breedArr", defaultPetArr));
const sidebar = document.querySelector(".sidebar-header");
const selectEdit = document.querySelector(".bi-pencil-square");
let conTinue = 0;
const tableBodyEl = document.getElementById("tbody");
const selectMain = document.getElementById("main");

//Animation khi người dùng click vào Sidebar
sidebar.addEventListener("click", function (e) {
  const clicked = e.target.closest("#sidebar-title").parentElement;

  // Cau lenh dieu kien tranh loi
  if (!clicked) return;
  clicked.classList.toggle("active");
});
//Render table pet khi nhấn vào edit.
function renderEdit(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((e, i) => {
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
    <button class="btn btn-warning" onclick="EditPet(${
      i //sử dụng e để xác định dữ liệu
    })">Edit</button>
    </td>
    </tr>
    `;
    tableBodyEl.appendChild(row);
  });
}
renderEdit(petArr);
// Hàm render form của pet khi nhấn edit
function EditPet(i) {
  console.log(petArr[i]);
  selectMain.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `<div class="row justify-content-center align-items-center mt-4">
            <div class="col-lg-6 col-lg-offset-4">
              <form>
                <div class="form-group row mb-3">
                  <label for="input-id" class="col-sm-3 col-form-label"
                    >Pet ID</label
                  >
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="input-id"
                      placeholder="Input ID"
                    disabled
                      />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="input-name" class="col-sm-3 col-form-label"
                    >Pet Name</label
                  >
                  <div class="col-sm-5">
                    <input
                      type="text"
                      class="form-control"
                      id="input-name"
                      placeholder="Input Name"
                    />
                  </div>
                  <label
                    for="input-age"
                    class="col-sm-1 col-form-label"
                    style="text-align: right"
                    >Age</label
                  >
                  <div class="col-sm-3">
                    <input
                      type="number"
                      class="form-control"
                      id="input-age"
                      placeholder="age"
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="input-type" class="col-sm-3 col-form-label"
                    >Type</label
                  >
                  <div class="col-sm-9">
                    <select
                      class="form-control"
                      id="input-type"
                    onchange="showContentedit(${i})"
                    >
                     <option>Select Type</option>
                      <option>Dog</option>
                      <option>Cat</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label for="input-weight" class="col-sm-3 col-form-label"
                    >Weight</label
                  >
                  <div class="col-sm-3">
                    <input
                      type="number"
                      class="form-control"
                      id="input-weight"
                      placeholder="weight"
                    />
                  </div>
                  <label
                    for="input-length"
                    class="col-sm-3 col-form-label"
                    style="text-align: right"
                    >Length</label
                  >
                  <div class="col-sm-3">
                    <input
                      type="number"
                      class="form-control"
                      id="input-length"
                      placeholder="lengTh"
                    />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-sm-3 col-form-label">Color</label>
                  <div class="col-sm-3">
                    <input
                      type="color"
                      class="form-control"
                      id="input-color-1"
                />
                  </div>
                  <label
                    for="input-breed"
                    class="col-sm-3 col-form-label"
                    style="text-align: right"
                    >Breed</label
                  >
                  <div class="col-sm-3">
                    <select class="form-control" id="input-breed">
                      <option>Select Breed</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <div class="col-sm-3"></div>
                  <div class="custom-control custom-checkbox col-sm-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="input-vaccinated"
                     
                    />
                    <label class="custom-control-label" for="input-vaccinated"
                      >Vaccinated</label
                    >
                  </div>
                  <div class="custom-control custom-checkbox col-sm-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="input-dewormed"
                   
                    />
                    <label class="custom-control-label" for="input-dewormed"
                      >Dewormed</label
                    >
                  </div>
                  <div class="custom-control custom-checkbox col-sm-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="input-sterilized"
                    />
                    <label class="custom-control-label" for="input-sterilized"
                      >Sterilized</label
                    >
                  </div>
                </div>
                <button type="button" class="btn btn-primary" id="submit-btn">
                  Submit
                </button>`;

  selectMain.appendChild(div);
  // khai báo các bộ chọn với main
  const idInput = document.getElementById("input-id");
  const nameInput = document.getElementById("input-name");
  const ageInput = document.getElementById("input-age");
  const weightInput = document.getElementById("input-weight");
  const lengthInput = document.getElementById("input-length");
  const colorInput = document.getElementById("input-color-1");
  const breedInput = document.getElementById("input-breed");
  const vaccinatedInput = document.getElementById("input-vaccinated");
  const dewormedInput = document.getElementById("input-dewormed");
  const sterilizedInput = document.getElementById("input-sterilized");
  const typeInput = document.getElementById("input-type");
  const submitBtn = document.getElementById("submit-btn");
  //Gán giá trị để hiển thị theo
  idInput.value = petArr[i].id;
  nameInput.value = petArr[i].petName;
  ageInput.value = petArr[i].age;
  weightInput.value = petArr[i].weight;
  lengthInput.value = petArr[i].lengTh;
  colorInput.value = petArr[i].color;
  typeInput.value = petArr[i].type;
  breedInput.value = petArr[i].breed;
  vaccinatedInput.checked = petArr[i].vaccinated;
  dewormedInput.checked = petArr[i].dewormed;
  sterilizedInput.checked = petArr[i].sterilized;
  // hàm biến đổi breed theo type
  renderBreed(breedArr.filter(checkTypeinput));
  //-------------------------------
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
      !data.petName || !data.age || !data.weight || !data.lengTh
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

      //kiểm tra có đủ điều kiện tiếp tục?
      conTinue === 6 ? (conTinue = true) : (conTinue = false);
      return conTinue;
    }

    const validate = validateData(data);

    if (validate) {
      petArr[i] = data;
      renderEdit(petArr);
    }
  };
  submitBtn.addEventListener("click", submit);
}
//------------------hàm dành cho type input và breed---------------------

// hàm render obtion breed tuỳ theo type
function renderBreed(breedArr) {
  const breedInput = document.getElementById("input-breed");
  breedInput.innerHTML = ``;
  breedArr.forEach((e, i) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${e.breed}</option>`;
    breedInput.appendChild(option);
  });
}
//hàm lọc breedArr khi tuỳ chỉnh type
function checkTypeinput(el) {
  const typeInput = document.getElementById("input-type");
  return el.type === typeInput.value;
}
//Hàm showcontent dành cho onchange type
function showContentedit(i) {
  renderBreed(breedArr.filter(checkTypeinput));
}
