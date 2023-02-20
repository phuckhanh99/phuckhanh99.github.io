"use strict";
// Khai báo các biến chung
const breedArr = JSON.parse(getFromStorage("breedArr", defaultPetArr));
var petArr = JSON.parse(getFromStorage("petArr", defaultPetArr));
const sidebar = document.querySelector(".sidebar-header");
const idInput = document.getElementById("input-id");
const typeInput = document.getElementById("input-type");
const nameInput = document.getElementById("input-name");
const breedInput = document.getElementById("input-breed");
const findBtn = document.getElementById("find-btn");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
//Animation khi người dùng click vào Sidebar
sidebar.addEventListener("click", function (e) {
  const clicked = e.target.closest("#sidebar-title").parentElement;
  // Cau lenh dieu kien tranh loi
  if (!clicked) return;
  clicked.classList.toggle("active");
});
// Hàm render breed đầy đủ
function renderFullbreed(breedArr) {
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr.forEach((e, i) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${e.breed}</option>`;
    breedInput.appendChild(option);
  });
}

//hàm render table mới.
function renderTableData(Arr) {
  tableBodyEl.innerHTML = "";
  Arr.forEach((e) => {
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
        e.vaccinated === true ? "bi bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="${
        e.dewormed === true ? "bi bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="${
        e.sterilized === true ? "bi bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td>${e.date}</td>
      </tr>
      `;
    tableBodyEl.appendChild(row);
  });
}
// Hàm render breed đã có
renderFullbreed(breedArr);
const submitFind = function () {
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    type: typeInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  function findPet(e) {
    // điều kiện để tìm pet
    return (
     (e.id.includes(`${data.id}`) || //dùng includes để lọc kí tự trong string
        !data.id) &&
      (!data.petName || e.petName.includes(`${data.petName}`)) &&
      (e.type === data.type || data.type === "Select Type") &&
      (e.breed === data.breed || data.breed === "Select Breed") &&
      (e.vaccinated === data.vaccinated || !data.vaccinated) &&
      (e.sterilized === data.sterilized || !data.sterilized) &&
      (e.dewormed === data.dewormed || !data.dewormed)
    );
  }
  renderTableData(petArr.filter(findPet));
  //console.log(petArr);
};
findBtn.addEventListener("click", submitFind);
