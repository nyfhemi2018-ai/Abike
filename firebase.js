import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
apiKey: "AIzaSyADHFLRmPuSSQ9k497udGOA-fl5Cm1DaNA",
authDomain: "abike-s-birthday.firebaseapp.com",
projectId: "abike-s-birthday",
storageBucket: "abike-s-birthday.firebasestorage.app",
messagingSenderId: "698086605831",
appId: "1:698086605831:web:bedcd17061666da20b16a2",
measurementId: "G-H2BWWXTZJJ"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const wishesRef = collection(db,"wishes");

const form = document.getElementById("wishForm");
const wall = document.getElementById("wishWall");


async function render(){

if(!wall) return;

wall.innerHTML="";

const snapshot = await getDocs(wishesRef);

snapshot.forEach((docItem)=>{

const w = docItem.data();
const id = docItem.id;

wall.innerHTML += `

<div class="col-md-4">
<div class="card p-3 shadow">

<h5>${w.name}</h5>

<p>${w.message}</p>

<button onclick="deleteWish('${id}')" 
class="btn btn-danger btn-sm mt-2">
Delete
</button>

</div>
</div>

`;

});

}


if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const message = document.getElementById("message").value;

await addDoc(wishesRef,{
name:name,
message:message,
created:Date.now()
});

form.reset();

render();

});

}


window.deleteWish = async function(id){

let password = prompt("Admin password");

if(password==="admin123"){

await deleteDoc(doc(db,"wishes",id));

render();

}

}


render();