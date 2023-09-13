let currentMusic = 0;

const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playBtn = document.querySelector(".play-btn");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");

const ctrlIcon = document.getElementById("ctrlIcon");


playBtn.addEventListener('click', () => {

    if (playBtn.className.includes('play')) {
        music.play();
    } else {
        music.pause();
    }

    playBtn.classList.add('pause');
    disk.classList.add('pause');

    if (ctrlIcon.classList.contains("fa-pause")) {

        playBtn.classList.remove('pause');
        playBtn.classList.add('play');

        disk.classList.add('pause');
        disk.classList.remove('play');


        music.pause();

        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");

    } else {
        playBtn.classList.add('pause');
        playBtn.classList.remove('play');

        disk.classList.remove('pause');
        disk.classList.add('play');



        music.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");


    }



})



// setup music 




const setMusic = (i) => {
    seekBar.value = 0;   // set range value to 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    disk.style.backgroundImage = `url('${song.cover}')`;

    currentMusic.innerHTML = "00:00";
    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)


}


setMusic(0);


// formating time in minute and seconds format 

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`
    }

    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }

    return `${min} : ${sec}`;
}




// seek bar running 


setInterval(() => {
    seekBar.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);

    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        forwardBtn.click();



    }
}, 1200)





seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})




const playMusic = () => {
    music.play();



    if (music.play()) {

        playBtn.classList.add('pause');
        playBtn.classList.remove('play');

        disk.classList.add('play');

        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

    }
}



// forward and back button function 


forwardBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;



    } else {

        currentMusic++

    }

    setMusic(currentMusic);
    playMusic();
});




backwardBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;

    } else {

        currentMusic--;
    }

    setMusic(currentMusic);
    playMusic();
});

