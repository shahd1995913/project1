'use strict';
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('results');
let goats = [];//0-7
let attempts = 1;
let maxAttempts = 10;

function GoatImage(goatName) {
    //sweater-goat.jpg
    //['sweater-goat','jpg']
    this.gName = goatName.split('.')[0];
    this.img = 'images/' + goatName;
    this.votes = 0;
    this.views = 0;
    goats.push(this);
}

let goatsImages = ['cruisin-goat.jpg', 'float-your-goat.jpg', 'goat-away.jpg', 'goat-out-of-hand.jpg', 'kissing-goat.jpg', 'sassy-goat.jpg', 'smiling-goat.jpg', 'sweater-goat.jpg', 'goat9.jpg'];

for (let i = 0; i < goatsImages.length; i++) {
    new GoatImage(goatsImages[i]);
}
console.log(goats);

function randomIndex() {
    // Math.random();//0-1
    //0-1 >>> 0.5 0.6 0.001
    return Math.floor(Math.random() * goats.length);
}
let leftIndex;
let rightIndex;
function renderRandomImg() {

    leftIndex = randomIndex();//0 cruisin-goat.jpg
    rightIndex = randomIndex();//5 sassy-goat.jpg
    while (leftIndex === rightIndex) {
        leftIndex = randomIndex();
    }

    leftImgEl.setAttribute('src', goats[leftIndex].img);
    rightImgEl.setAttribute('src', goats[rightIndex].img);
    leftImgEl.setAttribute('alt', goats[leftIndex].gName);
    rightImgEl.setAttribute('alt', goats[rightIndex].gName);
    leftImgEl.setAttribute('title', goats[leftIndex].gName);
    rightImgEl.setAttribute('title', goats[rightIndex].gName);
    goats[leftIndex].views++;
    goats[rightIndex].views++;

}
// console.log(goats);
renderRandomImg();
// let goat1 = new GoatImage('cruisin-goat.jpg');
// let goat2 = new GoatImage('float-your-goat.jpg');
// let goat3 = new GoatImage('goat-away.jpg');
// let goat4 = new GoatImage('goat-out-of-hand.jpg');
// let goat5 = new GoatImage('kissing-goat.jpg');
// let goat6 = new GoatImage('sassy-goat.jpg');
// let goat7 = new GoatImage('smiling-goat.jpg');
// let goat8 = new GoatImage('sweater-goat.jpg');

leftImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);

function handelClicks(event) {
    if (attempts <= maxAttempts) {
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            goats[leftIndex].votes++;
        }
        else if (clickedImg === 'rightImg') {
            goats[rightIndex].votes++;
        }
        renderRandomImg();
        // console.log(clickedImg);
        console.log(goats);
    } else {
        let ulEl = document.getElementById('results');
        for (let i = 0; i < goats.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${goats[i].gName} has ${goats[i].votes} votes and ${goats[i].views} views .`
            ulEl.appendChild(liEl);
        }
        leftImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
    }
    attempts++;
}