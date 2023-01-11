const addBox=document.querySelector(".add-box"),
popupBox= document.querySelector(".popup-box"),
popuptitle= popupBox.querySelector("header p"),
titleTag=popupBox.querySelector("input"),
descTag=popupBox.querySelector("textarea"),
closeIcon=popupBox.querySelector("header i"),
addBtn=popupBox.querySelector("button");

const months = ["january","February", "march" ,"april", "may", "june", "july", "august", "September","october", "november", "december"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isupdate= false, updateid;

addBox.addEventListener("click",()=>{
    popupBox.classList.add("show");
    titleTag.focus();
})


closeIcon.addEventListener("click",()=>{
    isupdate=false;
    titleTag.value="";
    descTag.value="";
    addBtn.innerText="Add note";
    popuptitle.innerText="Add a mew Note";
    popupBox.classList.remove("show");
})


function showNOtes(){
    const rem = document.querySelectorAll(".note");
    rem.forEach(note => note.remove());



    notes.forEach((note, index)=>{
        let  leTag=  `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description} </span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="setting">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li  onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Remove</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", leTag);
    })
}

showNOtes()

function deleteNote(noteid){
    let confirmn= confirm("Are you sure you want to delete node");
    if(!confirmn)return;
    notes.splice(noteid, 1);
    localStorage.setItem("notes" , JSON.stringify(notes));
    showNOtes();
}

function updateNote(noteid, title, desc){
    isupdate=true;
    updateid=noteid;
    addBox.click();
     titleTag.value=title;
    descTag.value=desc;
    addBtn.innerText="update note";
    popuptitle.innerText="update a note";
    console.log(noteid, desc, title);
}

function showMenu(elem){
    
    elem.parentElement.classList.add("show");
    
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    })
}



addBtn.addEventListener("click",(e)=>{
     e.preventDefault();
     let noteTile= titleTag.value,
    noteDesc= descTag.value;
    if(noteTile || noteDesc) {
        let dateobj= new Date(),
         month= months[dateobj.getMonth()],
         day= dateobj.getDay(),
         year= dateobj.getFullYear();

         let noteinfo = {
            title: noteTile, description: noteDesc, date: `${month}, ${day} , ${year}`,
         }

            if(!isupdate){
                    notes.push(noteinfo);
            }else{
                isupdate=false; 
                notes[updateid] = noteinfo;
            }
         
         
         localStorage.setItem("notes" , JSON.stringify(notes));
        
        closeIcon.click();
        showNOtes();
    }

   
})