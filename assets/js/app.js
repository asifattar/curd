const cl= console.log;

const stdForm =document.getElementById(`stdForm`);
const fNameControl = document.getElementById(`FName`);
const lNameControl = document.getElementById(`lName`);
const contactControl = document.getElementById(`contact`);
const EmailControl = document.getElementById(`Email`);
const stdInfoContainer = document.getElementById(`stdInfoContainer`);
const submitBtn = document.getElementById(`submitBtn`);
const updateBtn = document.getElementById(`updateBtn`);

let stdArray = [];

function setStdDataInStorage(){

}

const onEdithandler = (ele)=>{
    cl(`edited`, ele)
    let getId = ele.getAttribute(`data-id`);
    localStorage.setItem("updateId" , getId);
    cl(getId)
    let getObj = stdArray.find(std => std.id === getId)
    cl(getObj);
    fNameControl.value = getObj.fName;
    lNameControl.value = getObj.lname;
    contactControl.value = getObj.contact;
    EmailControl.value = getObj.Email;

    submitBtn.classList.add(`d-none`);
    updateBtn.classList.remove(`d-none`);
}

// const onDeleteHandler = (eve) =>{
//     cl(eve);
//     let deleteId = ele.dataset.id;
//     cl(deleteId)
//     let findindex = ele.findindex( std => std.id === deleteid);
//     stdArray.splice(findindex , 1);
//     localStorage.setItem("setstdInfo" , JSON.stringify(stdArray)); 
//     ele.parentElement.parentElement.remove()
// }

const onDeleteHandler = (eve) => {
    console.log(eve);
    let deleteId = eve.dataset.id;
    console.log(deleteId);
    let findIndex = stdArray.findIndex(std => std.id === deleteId);
    stdArray.splice(findIndex, 1);
    setStdDataInStorage()
    eve.parentElement.parentElement.remove();
  };

const templating = (arr)=>{
    let result = ` `;
    arr.forEach((std , i) => {
        result += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${std.fName}</td>
                            <td>${std.lname}</td>
                            <td>${std.Email}</td>
                            <td>${std.contact}</td>
                            <td>
                                <button class="btn btn-info" data-id="${std.id}" onclick="onEdithandler(this)">edit</button>

                            </td>
                            <td>
                                <button class="btn btn-danger" data-id="${std.id}" onclick="onDeleteHandler(this)">delete</button>
                            </td>
                        </tr>`
    })
    stdInfoContainer.innerHTML=result;
}

if(localStorage.getItem("setstdInfo")){
    stdArray=JSON.parse(localStorage.getItem("setstdInfo"));
    templating(stdArray)
}

const onStudSubmit = (eve) => {
    eve.preventDefault();
    let obj = {
        fName :  fNameControl.value,
        lname : lNameControl.value,
        Email : EmailControl.value,
        contact : contactControl.value,
        id : uuid(),
    }
    stdArray.push(obj)
    setStdDataInStorage()
    cl(stdArray);
    templating(stdArray);
    stdForm.reset()

}
cl(`submit`)

const onstudUpdate = (e) => {
    let getupdatedId = localStorage.getItem("updateId");
    //cl(getupdatedId)
    //cl(`updated ~!!~`)
    stdArray.forEach(std  => {
        if(getupdatedId === std.id){
            std.fName = fNameControl.value;
            std.lname = lNameControl.value;
            std.Email = EmailControl.value;
            std.contact = contactControl.value;
        }
    });
    setStdDataInStorage()
    templating(stdArray);
    // let tr = [...document.querySelector(`[data-id = ` + getupdatedId + `]`).closest("tr").children];
    // tr[1].innerHTML=fNameControl.value;
    // tr[2].innerHTML=lNameControl.value;
    // tr[3].innerHTML=EmailControl.value;
    // tr[4].innerHTML=contactControl.value;
    // renderTable(stdArray);
    stdForm.reset();
    submitBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");


}

stdForm.addEventListener(`submit`, onStudSubmit)
updateBtn.addEventListener(`click` , onstudUpdate)
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  //var userID=uuid();//something like: "ec0c22fa-f909-48da-92cb-db17ecdb91c5"