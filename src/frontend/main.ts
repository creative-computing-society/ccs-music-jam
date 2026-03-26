// add a search field to select a video and extract the video id
const videoId = "dQw4w9WgXcQ";

// make a request to the proxy backend
// this goes through vite proxy → backend (localhost:8080)
const res = await fetch(`/manifest?id=${videoId}`);

if (!res.ok) {
    console.error("backend failed", await res.text());
    throw new Error("manifest failed");
}

// extract the stream url
const data = await res.json();

// play the video
const videoElement = document.getElementById('video_player');
videoElement.src = data.url;
videoElement.play();