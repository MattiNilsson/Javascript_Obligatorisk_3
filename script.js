let loadedImages = document.getElementById("loadedImages")
let displayBreed = document.getElementById("displayBreed")
let subBreedDisplay = document.getElementById("subDisplay")
let forButton = document.getElementById("forButton")
let breed = window.location.hash;
let subBreed = "";
let imgTag = "image";
let breedTag = "breeds";
console.log(breed);

if(breed === ""){
    breed = "";
    imgTag = "image";
    breedTag = "breeds";
    subBreedDisplay.setAttribute("style","display:none");
}else{
    breed = window.location.hash.substr(1) + "-";
    let splitted = breed.split("-");
    console.log(splitted);
    breed = splitted[0];
    if(splitted[1] !== ""){
        subBreed = "/" + splitted[1]
    }
    imgTag = "images";
    breedTag = "breed/";
    displayBreed.textContent = window.location.hash.substr(1);
    subBreedDisplay.setAttribute("style","display:block");
    parseSubList();
}
console.log(breed)
function reqListener(){
    console.log(this.responseText);
    console.log(this.status);
    parseList(this.responseText);
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
    oreq.open("GET", "https://dog.ceo/api/"+breedTag+breed+subBreed+"/"+imgTag+"/random/3");
    oreq.send();

    let reloadImage = document.createElement("button");
    reloadImage.textContent = "Reload"
    forButton.appendChild(reloadImage);
    reloadImage.addEventListener("click", function(){
        loadedImages.innerHTML = "";
        forButton.innerHTML = "";
        getImages();
    })
}

let dropdown = document.getElementById("dropdown");

dropdown.addEventListener("change", function(){
    subBreedDisplay.setAttribute("style","display:block");
    breed = this.value;
    subBreed = "";
    window.location.hash = breed;
    displayBreed.textContent = this.value;
    loadedImages.innerHTML = "";
    forButton.innerHTML = "";
    imgTag = "images"
    breedTag = "breed/"
    getImages();
    parseSubList();
})

function parseList(parseText){
    let parsed = JSON.parse(parseText);
    console.log(parsed)
    let keys = Object.keys(parsed.message);
    for(let i = 0; i < keys.length; i++){
        let newOption = document.createElement("option");
        dropdown.appendChild(newOption);
        newOption.textContent = keys[i];
        console.log(keys[i])
        if(keys[i] === breed){
            newOption.selected = true;
        }
    }
}

let subListDisplay = document.getElementById("subList");

function parseSubList(){
    subXhr = new XMLHttpRequest();
    subXhr.addEventListener("load", parseSub);
    subXhr.open("GET", "https://dog.ceo/api/breed/"+breed+"/list");
    subXhr.send();
}
function parseSub(){
    subListDisplay.innerHTML = "";
    console.log(this.responseText);
    console.log(this.status);
    let subParsed = JSON.parse(this.responseText);
    console.log(subParsed);
    if(subParsed.message.length === 0){
        console.log("empty")
        subBreedDisplay.setAttribute("style","display:none");
    }
    for(let i = 0; i < subParsed.message.length; i++){
        if(i === 0){
            let newOption = document.createElement("option");
            subListDisplay.appendChild(newOption);
            console.log(subParsed.message[i]);
            newOption.textContent = "Select a sub-breed";
            newOption.disabled = true;
        }
        let newOption = document.createElement("option");
        subListDisplay.appendChild(newOption);
        console.log(subParsed.message[i]);
        newOption.textContent = subParsed.message[i];
        if("/" +subParsed.message[i] === subBreed){
            newOption.selected = true;
        }
    }
}

subListDisplay.addEventListener("change", function(){
    subBreed = "/" + this.value;
    window.location.hash = breed + "-" +this.value;
    displayBreed.textContent = breed + "-" + this.value;
    loadedImages.innerHTML = "";
    forButton.innerHTML = "";
    console.log(this.value);
    getImages();
})