let loadedImages = document.getElementById("loadedImages")
let displayBreed = document.getElementById("displayBreed")
let breed = window.location.hash;
let imgTag = "image"
let breedTag = "breeds"
console.log(breed);

if(breed === ""){
    breed = "";
    imgTag = "image"
    breedTag = "breeds"
}else{
    breed = window.location.hash.substr(1);
    imgTag = "images"
    breedTag = "breed/"
    displayBreed.textContent = window.location.hash.substr(1);
}
console.log(breed)
function reqListener(){
    console.log(this.responseText);
    console.log(this.status);
    parseList(this.responseText)
    getImages();
}
xhr = new XMLHttpRequest();
xhr.addEventListener("load", reqListener);
xhr.open("GET", "https://dog.ceo/api/breeds/list/all");
xhr.send();

function loadImage(){
    console.log(this.responseText);
    console.log(this.status);
    let parsed = JSON.parse(this.responseText);
    console.log(parsed)
    let keys = Object.keys(parsed.message);
    console.log(keys);
    for(let i = 0; i < keys.length; i++){
      let newImage = document.createElement("img");
      loadedImages.appendChild(newImage);
      newImage.src = parsed.message[i];
    }
}

function getImages(){
    oreq = new XMLHttpRequest();
    oreq.addEventListener("load", loadImage);
    oreq.open("GET", "https://dog.ceo/api/"+breedTag+breed+"/"+imgTag+"/random/3");
    oreq.send();

    let reloadImage = document.createElement("button");
    reloadImage.textContent = "Reload"
    loadedImages.appendChild(reloadImage);
    reloadImage.addEventListener("click", function(){
        loadedImages.innerHTML = "";
        getImages();
    })
}

let dropdown = document.getElementById("dropdown");

dropdown.addEventListener("change", function(){
    breed = this.value;
    window.location.hash = this.value;
    displayBreed.textContent = this.value;
    loadedImages.innerHTML = "";
    imgTag = "images"
    breedTag = "breed/"
    getImages();
})

function parseList(parseText){
    let parsed = JSON.parse(parseText);
    console.log(parsed)
    let keys = Object.keys(parsed.message);
    console.log(keys);
    for(let i = 0; i < keys.length; i++){
        let newOption = document.createElement("option");
        dropdown.appendChild(newOption);
        newOption.textContent = keys[i];
    }
}
console.log()