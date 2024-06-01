const image = document.getElementById('cover'),
    title = document.getElementById('channel-title'),
    artist = document.getElementById('channel-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const channel = new Audio();

const songs = [
    {
        path: 'assets/podcats/AFRICA.mp3',
        displayName: 'The African Cast',
        cover: 'assets/AFRICA.jpg',
        artist: 'Ernest Makhaya ',
    },
    {
        path: 'assets/podcats/ASIA.mp3',
        displayName: 'The Asian Cast',
        cover: 'assets/ASIA.png',
        artist: 'James Wagner',
    },
    {
        path: 'assets/podcats/EUROPE.mp3',
        displayName: 'The European Cast',
        cover: 'assets/Europe.jfif',
        artist: 'Edgar Alvarez',
    },
    {
        path: 'assets/podcats/North America.mp3',
        displayName: 'The North American Cast',
        cover: 'assets/north America.png',
        artist: 'Ubaldo Martinez',
    },
    {
        path: 'assets/podcats/SOUTH AMERICA COPA PODCAST.mp3',
        displayName: 'The South American Cast',
        cover: 'assets/south america.png',
        artist: 'Enrique Gutierrez ',
    },
    {
        path: 'assets/podcats/Australia.mp3',
        displayName: 'The Australian Cast',
        cover: 'assets/oceania-flags-helge.jpg',
        artist: 'Chris Johnston',
    },
    {
        path: 'assets/podcats/Antarctica.mp3',
        displayName: 'The Antarctican Cast',
        cover: 'assets/assets/ANTARCTICA.jpg',
        artist: 'Jeff Darlington ',
    }
];

let channelIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pausechannel();
    } else {
        playchannel();
    }
}

function playchannel() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    channel.play();
}

function pausechannel() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    channel.pause();
}

function loadchannel(song) {
    channel.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// Function to toggle the active class on other channels
function toggleActiveClass() {
    const audioPlayers = document.querySelectorAll('.audio-player');
    audioPlayers.forEach((player, index) => {
        player.classList.remove('active'); // Remove active class from all players
        if (index === channelIndex) {
            player.classList.add('active'); // Add active class to the current player
        }
    });
}

// Function to handle click on other channels
function handleChannelClick(index) {
    channelIndex = index;
    loadchannel(songs[channelIndex]);
    toggleActiveClass();
    playchannel();
}

// Add event listeners to other channel elements
const otherChannels = document.querySelectorAll('.audio-player');
otherChannels.forEach((channel, index) => {
    channel.addEventListener('click', () => handleChannelClick(index));
});

// Event listeners for player controls
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changechannel(-1));
nextBtn.addEventListener('click', () => changechannel(1));
channel.addEventListener('ended', () => changechannel(1));

// Function to change channel
function changechannel(direction) {
    const previousChannelIndex = channelIndex;
    channelIndex = (channelIndex + direction + songs.length) % songs.length;
    loadchannel(songs[channelIndex]);
    playchannel();
    toggleActiveClass();

    // Update active state of other channels
    if (previousChannelIndex !== channelIndex) {
        const otherChannels = document.querySelectorAll('.audio-player');
        otherChannels.forEach((channel, index) => {
            if (index === channelIndex) {
                
                channel.classList.add('active');
            } else {
                channel.classList.remove('active');
            }
        });
    }
}

// Initial load of the first song
loadchannel(songs[channelIndex]);
