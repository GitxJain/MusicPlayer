console.log("welcome to apple music");

//audioElement stores the audio file supposed to play
let audioElement = new Audio();

let songIndex = 0;
//gets the play button
let masterPlay = document.getElementById('masterPlay');

// gets the sound ka slider 
let progressBar = document.getElementById('myprogressBar');

// to play music using the 4 raftaarein song bars on the screen

let songInfo = document.querySelector(".songInfo");


let songs = [
    {songName: "Raftaarein - SRK", filePath: "1.mp3", coverPath:"raftaarein_cover.jpg" , duration:"04:50"},
    {songName: "Desi Hood - Krish Rao", filePath: "2.mp3", coverPath:"desiHood_cover.jpg",duration:"02:32"},
    {songName: "Khutti - Diljit Dosanjh", filePath: "3.mp3", coverPath:"khutti_cover.jpg",duration:"02:12"},
    {songName: "Life is Good - Drake & Future", filePath: "4.mp3", coverPath:"life_is_good_cover.jpg",duration:"03:57"}

]

//Handling the event based on click of main play button
masterPlay.addEventListener('click',()=>{

    // here , basically if audioElement(your music file) is paused , or the current time is less than zero
    // you play the audio file 
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        // once we press play , we want the pause button to change to play button
          masterPlay.classList.remove('fa-play');
        // masterPlay button ke class properties mein play button ka icon bhi hai , toh isliye masterPlay.classList.remove
        masterPlay.classList.add('fa-pause')
    }
    else{
        // pauses the audio
        audioElement.pause();

        // once audio is playing and you click on the masterplay button , you want pause icon to be removed and play icon to be put
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});





//Update the progress bar and sync with the current playing time

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //Now to update the slider how much it moves for the amount of seconds played
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);

    // jo progress record hoga , that will be the value of progressBar (in length) at that point in time , and it will keep updating every instant
    myprogressBar.value = progress;

});

// Now if we click somewhere ahead on the slider , we want the song to play from that point
myprogressBar.addEventListener('change',()=>{

    audioElement.currentTime = (myprogressBar.value/100)*audioElement.duration;

    // basically here , if a change occurs in the progressBar , we want the currentTime to change to the progress that has occured
})




//If we add multiple song bars (that have class name 'songItem') and we dont want to manually go in index.html and change their names,
// we can use a forEach loop


let songItems = Array.from(document.getElementsByClassName('songItem'));  //here , we used Array.from to convert elements with the class name 'songItem' into an array , to apply forEach loop on it

songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;   //the [0] here is used to set the 1st image element ka src as the coverPath. If there were multiple image elements , using [0] would mean that itne image elements mein se first wale ka hi src attribute change karna hai
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
})




let mini_playBtn = Array.from(document.getElementsByClassName("songItemPlay"));

const makeAllPlays=()=>{
    mini_playBtn.forEach((element)=>{        // function defined to make all button pauses when one song played, so that multiple songs are not showing play button at the same time
        element.classList.remove("fa-pause");
        element.classList.add("fa-play");
    })
}

mini_playBtn.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();  // Reset all play buttons to play icons

        if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
            // If the clicked song is already playing, pause it
            audioElement.pause();
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
        } else {
            // Play the selected song
            audioElement.src = songs[index].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");

            // Update the main play button to reflect the playing state
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');

            // Update the song info in the bottom banner
            songInfo.innerText = songs[index].songName;
        }
    });


});


// Now we want to operate for the backward play and forward play button

// Play 

let backwardPlay = document.getElementById("backward");

let currentSongIndex = 0;

backwardPlay.addEventListener('click',()=>{
   
currentSongIndex --;

if(currentSongIndex<0){
    currentSongIndex = songs.length - 1;
}

audioElement.currentTime = 0;
audioElement.pause();

audioElement.src = songs[currentSongIndex].filePath;
audioElement.currentTime = 0;
audioElement.play();

makeAllPlays();
mini_playBtn[currentSongIndex].classList.remove('fa-play');
mini_playBtn[currentSongIndex].classList.add('fa-pause');

 // Update the main play button to reflect the playing state
 masterPlay.classList.remove('fa-play');
 masterPlay.classList.add('fa-pause');

 // Update the song info in the bottom banner
 songInfo.innerText = songs[currentSongIndex].songName;


});

currentSongIndex = 0;

// now , doing it for forward play 

let forward = document.getElementById("forward");

forward.addEventListener('click',()=>{

    currentSongIndex++;

    if(currentSongIndex>3){
        currentSongIndex=0;
    }

    audioElement.currentTime = 0;
    audioElement.pause();

    audioElement.src = songs[currentSongIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();  // here , makeAllPlays makes all the buttons to pause , and for the song that is playing , for it we do alag se classList remove and add , after this function call
    mini_playBtn[currentSongIndex].classList.remove("fa-play");
    mini_playBtn[currentSongIndex].classList.add("fa-pause");

    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");

    songInfo.innerText = songs[currentSongIndex].songName;
});