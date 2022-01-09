let isplaying = false;

var play = document.getElementById("play");
var music = document.querySelector("audio");
var img = document.querySelector("img");
var artist = document.getElementById("artist");
var title = document.getElementById("title");
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var list = document.getElementById("playlist");
var arrow = document.getElementById("arrow");
var song_div = document.querySelector(".each_song_div");
var ul = document.getElementById("ul");
var song = document.querySelector("li");

var progress = document.getElementById("progress");

let total_duration = document.getElementById("duration");

let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div")




/**play**/
function playMusic() {
    isplaying = true;
    music.play();

    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    img.classList.add("anime");



};

/**pause**/


function pauseMusic() {
    isplaying = false;
    music.pause();
    play.classList.add("fa-play");
    play.classList.remove("fa-pause");
    img.classList.remove("anime");


};


play.addEventListener('click', () => {
    /*
             if(isplaying){
                 pauseMusic();
             }else{
                 playMusic();
             }
              */
    isplaying ? pauseMusic() : playMusic();

});



//changing song
const songs = [{
        id: 0,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 1,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 2,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    },
    {
        id: 3,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 4,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 5,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    },
    {
        id: 6,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 7,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 8,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    },
    {
        id: 9,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 10,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 11,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    },
    {
        id: 12,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 13,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 14,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    },
    {
        id: 15,
        name: "1",
        title: "AADAT",
        artist: "AATIF ASLAM"
    },
    {
        id: 16,
        name: "2",
        title: "DIL DE DIYA",
        artist: "RAHUL JAIN"
    },
    {
        id: 17,
        name: "3",
        title: "sas",
        artist: "RAHUL JAIN"
    }
];



function loadSong(songs) {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";

}

loadSong(songs[0]);

songIndex = 0;
const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}


/*********progressbar*********** */
music.addEventListener("timeupdate", (event) => {
    const {
        currentTime,
        duration
    } = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;
    /*music total duration update*/
    console.log(event);


    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    let tot_duration = `${min_duration}:${sec_duration}`;
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }

    /*music current _duration update*/
    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);
    if (sec_currentTime < 10) {
        sec_currentTime = `0${sec_currentTime}`;
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.textContent = `${tot_currentTime}`;
});

/***********click on progress bar*********** */
progress_div.addEventListener("click", (event) => {

    const {
        duration
    } = music;

    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
    // console.log(move_progress);

    music.currentTime = move_progress;

});
/************/
music.addEventListener("ended", nextSong);
/******click next prev************* */
next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);


/**********show list**********/

var show = false;

function showLIST() {
    if (show == false) {
        list.classList.add("show_playlist");
        arrow.classList.replace("fa-chevron-right", "fa-chevron-left");
        ul.innerHTML = output;
        show = true;

    } else {
        list.classList.remove("show_playlist");
        arrow.classList.replace("fa-chevron-left", "fa-chevron-right");
        show = false;
    }

};


arrow.addEventListener('click', showLIST);

/******list***** */

var output = " ";

for (var i = 0; i < songs.length; i++) {
    output += "<li ><div class='each_song_div' id=" + i + "><h2 id='song_heading'>" + songs[i].title + "</h2><span></span></div>";
}



/**********song play from playlist********** */


ul.addEventListener('click', function (e) {

    let element = e.target;
    element.childNodes[1].classList.add("play_anime");
    const songIndex = element.attributes.id.value;
    loadSong(songs[songIndex]);
    playMusic();
});



document.onkeydown = function (e) {
    if (e.keyCode == 32 && !isplaying) {
        playMusic();
    } else {
        pauseMusic();
    }
}
