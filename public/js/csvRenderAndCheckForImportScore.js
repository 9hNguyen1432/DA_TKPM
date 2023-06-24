// (A) FILE READER + HTML ELEMENTS

let reader = new FileReader(),
  picker = document.getElementById("fileDS"),
  table = document.getElementById("demoTable");

// (B) READ CSV ON FILE PICK
picker.onchange = () => reader.readAsText(picker.files[0]);
let data = [];
// (C) READ CSV & GENERATE TABLE
reader.onloadend = () => {
  table.innerHTML = "";
  data = CSV.parse(reader.result);
  for (let row of data) {
    let tr = table.insertRow();
    for (let col of row) {
      let td = tr.insertCell();
      td.innerHTML = col;
    }
  }
};

const selectElement = document.getElementById('class');
const year = document.getElementById('yearmenu-dropdown').getAttribute("data-year");

let listStudent = [];
window.onload = async () =>{
  console.log("onload")
  console.log(selectElement.value + year)
  let response = await getListStudent(selectElement.value.trim(), year.trim());
  listStudent = await response.json();
  console.log(listStudent)
}

selectElement.addEventListener('change', async function(event) {
  const class_name = event.target.value;
  let response = await getListStudent(class_name.trim(), year.trim());
  listStudent = await response.json();
  console.log(listStudent)


  // Perform your desired actions based on the selected value
});


function validatedForm(event) {

    // // var class_name = JSON.parse(event.target.getAttribute('data-class'));
    // const arrayString = parentElement.dataset.set;
    // console.log('Array String:', arrayString);
    // const listStudent = JSON.parse(arrayString);
    // console.log('Array:', listStudent);
// Ngăn chặn hành vi mặc định của nút submit
    event.preventDefault();
    console.log(data);

    let isValided = true;

    let idStandardArray =  listStudent.map(e => e.id);
    let idInInputArray = data.map(e=> e[0]).slice(1);
    console.log(idStandardArray);
    console.log(idInInputArray)

    isValided = isValided && areArraysEqual(idStandardArray, idInInputArray)

    if(!isValided){
      document.getElementById('warning').innerHTML = `Danh sách học sinh không hợp lệ, chắc chắn rằng danh sách có số lượng học sinh bằng với sỉ số lớp (${idStandardArray.length}) và ID sinh viên đúng.`;
      //TODO error
      return;
    }
    console.log("check valid: ");
    console.log(isValided);

    let scoresList = data.map(e=> { return [e[2], e[3], e[4]]}).slice(1);
    let checkScore = isValidedListScore(scoresList);

    if(!checkScore.isValid){
      document.getElementById('warning').innerHTML =""
      for(let i =0; i < checkScore.invalidIndex.length; i++){
        document.getElementById('warning').innerHTML = document.getElementById('warning').innerHTML + `Điểm của học sinh ${data[checkScore.invalidIndex[i]+1][1]} không hợp lệ.<br>`;
      }
      //TODO error
      return;
    }
  document.getElementById("myform").submit();
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] != sortedArr2[i]) {
      return false;
    }
  }

  return true;
}

async function getListStudent(class_name, year) {
  let studentData = await fetch(`/class/${class_name}/fetch_list_students?year=${year}`);
  return await studentData;
}

function isValidedListScore(scores){

  let isValid = true;
  let invalidIndex = [];
  for (let i = 0; i < scores.length; i++){
    let isValidElement = (scores[i].length == scores[i].filter(e=> (e>=0 && e<=10)).length);
    isValid = isValid && isValidElement;
    if (isValidElement == false){
      invalidIndex.push(i);
    }
  }
  return {
    isValid, invalidIndex
  }
}



