console.log("Welcome To Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Charlie Puth - Attention", filePath: "songs/1.mp3", coverPath: "1.jpg"},
    {songName: "Charlie Puth - We Don't Talk Anymore (feat. Selena Gomez)", filePath: "songs/2.mp3", coverPath: "2.jpg"},
    {songName: "Clean Bandit - Rockabye (feat. Sean Paul & Anne-Marie)", filePath: "songs/3.mp3", coverPath: "3.jpg"},
    {songName: "Justin Bieber - As Long As You Love Me ft. Big Sean", filePath: "songs/4.mp3", coverPath: "4.jpg"},
    {songName: "Pitbull - Rain Over Me ft. Marc Anthony", filePath: "songs/5.mp3", coverPath: "5.jpg"},
    {songName: "Shawn Mendes - Lost In Japan", filePath: "songs/6.mp3", coverPath: "6.jpg"},
    {songName: "Shawn Mendes, Camila Cabello - Señorita", filePath: "songs/7.mp3", coverPath: "7.jpg"},
    {songName: "The Chainsmokers - Closer", filePath: "songs/8.mp3", coverPath: "8.jpg"},
    {songName: "The Chainsmokers - Sick Boy", filePath: "songs/9.mp3", coverPath: "9.jpg"},
    {songName: "ZAYN - Dusk Till Dawn ft. Sia", filePath: "songs/10.mp3", coverPath: "10.jpg"}
];

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause on masterPlay button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        updatePlayIcons(songIndex);
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
        gif.style.opacity = 0;
    }
});

// Update seek bar as song plays
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Change song position when seek bar is used
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play icons to play-circle
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Update icons correctly when a song is played
const updatePlayIcons = (index) => {
    makeAllPlays();
    let currentPlayButton = document.getElementById(index);
    currentPlayButton.classList.remove('fa-play-circle');
    currentPlayButton.classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
};

// Play/Pause individual song from the list
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            // Pause if same song is playing
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            updatePlayIcons(songIndex);
            gif.style.opacity = 1;
        }
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayIcons(songIndex);
    gif.style.opacity = 1;
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = songIndex <= 0 ? 0 : songIndex - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updatePlayIcons(songIndex);
    gif.style.opacity = 1;
});
