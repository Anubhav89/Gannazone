console.log("Welcome to Gannazone");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('../songs/1.mp3');
let masterPlay = document.getElementById('masterplay')
let progressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "Warriyo", filepath: "songs/1.mp3", coverPath: 'covers/1.jpg'},
    {songName: "Cielo", filepath: "songs/2.mp3", coverPath: 'covers/2.jpg'},
    {songName: "Deaf Key", filepath: "songs/3.mp3", coverPath: 'covers/3.jpg'},
    {songName: "Different", filepath: "songs/4.mp3", coverPath: 'covers/4.jpg'},
    {songName: "Janji", filepath: "songs/5.mp3", coverPath: 'covers/5.jpg'},
    {songName: "Rabba", filepath: "songs/6.mp3", coverPath: 'covers/6.jpg'},
    {songName: "Sakhiyaan", filepath: "songs/10.mp3", coverPath: 'covers/7.jpg'},
    {songName: "Bhula Dena", filepath: "songs/8.mp3", coverPath: 'covers/8.jpg'},
    {songName: "Tu aake dekh le", filepath: "songs/9.mp3", coverPath: 'covers/9.jpg'},
]

songitem.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName; 
});
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener("timeupdate",()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value = progress;
})

progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

//To play/pause the songs from the song list

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex +1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex +1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})