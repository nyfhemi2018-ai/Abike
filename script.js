document.addEventListener("DOMContentLoaded", function(){

const params = new URLSearchParams(window.location.search);
const isHer = params.get("for") === "abike";
const form = document.getElementById('wishForm');
const wall = document.getElementById('wishWall');
const upload = document.getElementById('mediaUpload');
const recordBtn = document.getElementById('recordBtn');
const preview = document.getElementById('previewVideo');

const lightBtn = document.getElementById("lightBtn");
const songBtn = document.getElementById("songBtn");
const noteBtn = document.getElementById("noteBtn");

const songPlayer = document.getElementById("songPlayer");
const romanticMusic = document.getElementById("romanticMusic");




// RENDER WISHES
function render(){

wall.innerHTML='';

wishes.slice().reverse().forEach((w,index)=>{

let mediaHTML='';

if(w.media){

if(w.mediaType === 'image'){
mediaHTML=`<img src="${w.media}" class="img-fluid rounded mb-2">`
}

if(w.mediaType === 'video'){
mediaHTML=`<video src="${w.media}" controls class="w-100 mb-2"></video>`
}

}

wall.innerHTML += `

<div class="col-md-4">
<div class="card p-3">

<h5>${w.name}</h5>

<p>${w.message || ''}</p>

${mediaHTML}

<button onclick="deleteWish(${index})"
class="btn btn-sm btn-danger mt-2">
Delete
</button>

</div>
</div>

`;

});

}


// FORM SUBMIT
if(form){

form.addEventListener('submit',function(e){

e.preventDefault();

const name=document.getElementById('name').value;
const message=document.getElementById('message').value;

let file = upload.files[0];

if(file){

const reader = new FileReader();

reader.onload=function(){

let type=file.type.startsWith("image")?"image":"video";

wishes.push({
name,
message,
media:reader.result,
mediaType:type
});



form.reset();
render();

}

reader.readAsDataURL(file);

}else{

wishes.push({name,message});



form.reset();
render();

}

});

}


// VIDEO RECORD PREVIEW
if(recordBtn){

recordBtn.addEventListener('click', async ()=>{

let stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

preview.style.display='block';
preview.srcObject=stream;

});

}


// DELETE WISH
window.deleteWish=function(index){

let password = prompt("Admin password");

if(password==="admin123"){

wishes.splice(index,1);

render();

}else{

alert("Wrong password");

}

}


// PRIVATE MESSAGE FLOW
window.showPrivateMessage=function(){

document.getElementById("introScreen").style.display="none";
document.getElementById("privateMessage").style.display="flex";

}


window.showWishWall=function(){

document.getElementById("privateMessage").style.display="none";
document.getElementById("mainSite").style.display="block";

}


// TURN ON LIGHT
if(lightBtn){

lightBtn.addEventListener("click",()=>{

document.body.classList.add("lights-on");

lightBtn.innerText="Lights On ✨";

});

}


// PLAY MAIN SONG
if(songBtn){

songBtn.addEventListener("click",()=>{

songPlayer.play();

songBtn.innerText="Playing 🎵";

});

}


// OPEN LOVE NOTE
if(noteBtn){

noteBtn.addEventListener("click",()=>{

document.getElementById("introScreen").style.display="none";

document.getElementById("privateMessage").style.display="flex";

if(romanticMusic){
romanticMusic.volume=0.3;
romanticMusic.play();
}

});

}


// SECRET LINK CONTROL
if(!isHer){

document.getElementById("introScreen").style.display="none";
document.getElementById("privateMessage").style.display="none";
document.getElementById("mainSite").style.display="block";

}else{

document.getElementById("mainSite").style.display="none";

}

render();

});