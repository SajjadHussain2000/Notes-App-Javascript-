console.log("script is loaded");
shownotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click",function(e){
    console.log("event listner is working");
    let addtxt = document.getElementById('addTxt');
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    shownotes();

});

//function to show notes from localStorage
function shownotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html += `
        <div class="card selectcard my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index+1}</h5>
                  <p class="card-text">${element}</p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
              </div>
        </div>`;
    });

    let noteselem = document.getElementById('notes');
    if(notesObj.length != 0)
    {
        noteselem.innerHTML = html;
    } 
    else{
        noteselem.innerHTML = `Noting to show! Add your notes`;
    }
}

//function to delete a note
function deleteNote(index){
    console.log(`note is deleted with index : ${index}`);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}


// search functionality
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('selectcard');
    Array.from(noteCards).forEach(function(element){
    console.log(element);

        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});