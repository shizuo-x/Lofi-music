let songs = [
    {songName: "Back To The Norm", filePath: "assets/music/1.mp3", id: 0},
    {songName: "Excursion", filePath: "assets/music/2.mp3", id: 1},
    {songName: "Neopolitin Guustavv", filePath: "assets/music/3.mp3", id: 2},
    {songName: "Nothing changes everything is different", filePath: "assets/music/4.mp3", id: 3},
    {songName: "Summer Rain", filePath: "assets/music/5.mp3", id: 4},
    {songName: "Summer Time", filePath: "assets/music/6.mp3", id: 5},
    {songName: "The Ceremony", filePath: "assets/music/7.mp3", id: 6},
    {songName: "Waiting for You", filePath: "assets/music/8.mp3", id: 7},
    {songName: "Water World", filePath: "assets/music/9.mp3", id: 8},
    {songName: "_Away", filePath: "assets/music/10.mp3", id: 9},
    {songName: "3PM", filePath: "assets/music/11.mp3", id: 10},
    {songName: "al pasito timeless", filePath: "assets/music/12.mp3", id: 11},
    {songName: "Calcium", filePath: "assets/music/13.mp3", id: 12},
    {songName: "Change", filePath: "assets/music/14.mp3", id: 13},
    {songName: "Decisions", filePath: "assets/music/15.mp3", id: 14},
    {songName: "Float", filePath: "assets/music/16.mp3", id: 15},
    {songName: "i brought her flowers.", filePath: "assets/music/17.mp3", id: 16},
    {songName: "Lincoln Heights", filePath: "assets/music/18.mp3", id: 17},
    {songName: "lost school stuff", filePath: "assets/music/19.mp3", id: 18},
    {songName: "Nepenthe", filePath: "assets/music/10.mp3", id: 19},

];

let dupeSongs = [
    {songName: "Back To The Norm", filePath: "assets/music/1.mp3", id: 0},
    {songName: "Excursion", filePath: "assets/music/2.mp3", id: 1},
    {songName: "Neopolitin Guustavv", filePath: "assets/music/3.mp3", id: 2},
    {songName: "Nothing changes everything is different", filePath: "assets/music/4.mp3", id: 3},
    {songName: "Summer Rain", filePath: "assets/music/5.mp3", id: 4},
    {songName: "Summer Time", filePath: "assets/music/6.mp3", id: 5},
    {songName: "The Ceremony", filePath: "assets/music/7.mp3", id: 6},
    {songName: "Waiting for You", filePath: "assets/music/8.mp3", id: 7},
    {songName: "Water World", filePath: "assets/music/9.mp3", id: 8},
    {songName: "_Away", filePath: "assets/music/10.mp3", id: 9},
    {songName: "3PM", filePath: "assets/music/11.mp3", id: 10},
    {songName: "al pasito timeless", filePath: "assets/music/12.mp3", id: 11},
    {songName: "Calcium", filePath: "assets/music/13.mp3", id: 12},
    {songName: "Change", filePath: "assets/music/14.mp3", id: 13},
    {songName: "Decisions", filePath: "assets/music/15.mp3", id: 14},
    {songName: "Float", filePath: "assets/music/16.mp3", id: 15},
    {songName: "i brought her flowers.", filePath: "assets/music/17.mp3", id: 16},
    {songName: "Lincoln Heights", filePath: "assets/music/18.mp3", id: 17},
    {songName: "lost school stuff", filePath: "assets/music/19.mp3", id: 18},
    {songName: "Nepenthe", filePath: "assets/music/10.mp3", id: 19},

];

// declarations 

let audio = new Audio("../music/1.mp3");


// setting the song names 

songs.forEach((element, i) => {
    document.getElementsByClassName("songName")[i].innerText = songs[i].songName;
});


// main playing engine + continous shuffled playback

let indexTemp = 0;
var bongIndex = 0;

function playSong(name) {

    if(typeof name === "number") {
        indexTemp = name;
        console.log("current song index = "+indexTemp);
    };

    // audio.pause();

    if(name === "next") {
        audio.pause();
        console.log("landed in next");
        audio.src=songs[bongIndex+1].filePath;
        bongIndex++
        audio.play();
         
        songs.forEach(element => {
            audio.onended = function() {
                bongIndex++
                playSong(bongIndex);
                audio.src=songs[bongIndex].filePath;
                audio.play();
            }
        });

    } else if(name === "prev") {
        audio.pause();
        console.log("landed in prev");
        audio.src=songs[bongIndex-1].filePath;
        bongIndex--
        audio.play();

        songs.forEach(element => {
            audio.onended = function() {
                bongIndex++
                audio.src=songs[bongIndex].filePath;
                audio.play();
            }
        });

    } else {

        audio.src=dupeSongs[indexTemp].filePath;
        audio.play();
        console.log("index now in else is "+indexTemp);
        let shift = dupeSongs.shift();
        console.log(dupeSongs);

        dupeSongs.forEach(element => {
            audio.onended = function() {
                bongIndex++
                playSong(indexTemp);
    
            }
        });
    }

};

// events and other functions 

let shuffler = function() {

    audio.pause();
    let oneOfRemaining = Math.round(Math.random() * (dupeSongs.length-1));
    playSong(oneOfRemaining);
    document.getElementById("pp").innerText="pause";

    dupeSongs.forEach(element => {
        audio.onended = function() {

            let index = Math.round(Math.random() * (dupeSongs.length-1));
            playSong(index);
            dupeSongs = dupeSongs.filter(x => {
                return x.id != index;
            });

        }
    });

}

document.getElementById("shuffle").addEventListener("click", shuffler);

let eventHandler = function(e) {
        
    if(dupeSongs.length === 20) {
        let songIndex = 0;
        playSong(songIndex);
        e.target.innerText = "pause";
    } else if(dupeSongs.length<=19 && audio.currentTime>0 && !audio.paused) {
        audio.pause();
        console.log("paused");
        document.getElementById("pp").innerText="play";
    } else if(audio.paused || audio.currentTime<=0) {
        audio.play();
        console.log("played");
        document.getElementById("pp").innerText="pause";
    }
    
};

document.getElementById("pp").addEventListener("click", eventHandler);

let nextHandler = function() {
    audio.pause();
    console.log(audio);
}

let nexter = function() {
    let signaln = "next";
    playSong(signaln)
}
let prever = function() {
    let signalb = "prev";
    playSong(signalb)
}

document.getElementById("next").addEventListener("click", nexter);
document.getElementById("back").addEventListener("click", prever);


// footer date :

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
document.getElementById("timer").innerText = time;


// archives

    // let kym = document.createTextNode("  ⊛");
    // document.getElementsByClassName("songName")[index].appendChild(kym);

    // window.addEventListener("load", (e) => {

    // var num = Math.random();
    // num = Math.floor(num * 6) + 1;

    // document.querySelector("body").style.background="url('assets/videos/v"+num+".gif')";

//     // if(num === 1) {
//     //     document.querySelector("body").style.backgroundImage="url('./assets/bg-1.jpeg')";
//     // } else {
//     //     document.querySelector("body").style.backgroundImage="url('./assets/bg-2.jpg')";
//     // }

// });


