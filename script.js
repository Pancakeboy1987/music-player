const musicContainer = document.querySelector(".music-container");
const pauseBtn = document.querySelector("#pause");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

///song titles

const songs = ["Color Your Night", "BIG SHOT", "THE WORLD REVOLVING"];

// track of songs

let songIndex = 1;

//initially load song info Dom

loadSong(songs[songIndex]);

//update song details

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `styles/images/${song}.jpg`;
}



function playSong(){
  musicContainer.classList.add('play')
  pauseBtn.querySelector('i.fas').classList.remove('fa-play')
  pauseBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play();
}

function pauseSong(){
  musicContainer.classList.remove('play')
  pauseBtn.querySelector('i.fas').classList.add('fa-play')
  pauseBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause();
}

function prevSong(){
  songIndex-=1
  if(songIndex<0){
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}


function nextSong(){
  songIndex+=1
  if(songIndex==songs.length){
    songIndex=0;
  }
  loadSong(songs[songIndex])
  playSong()
}

function updateProgress(e){
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime/duration)*100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e){
  const width  = this.clientWidth
  const clickX = e.offsetX
  const duration  =audio.duration

  audio.currentTime = (clickX/width)*duration

}

//event listeners
pauseBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying===true) {
    pauseSong();
  } else {
    playSong();
  }
});



//changing songs


prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)