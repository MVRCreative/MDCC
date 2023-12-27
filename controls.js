console.log("Initalizing controls script");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  //variable declaration
    const audio = document.querySelector('[mvr-audio-element="audio"]')
    const playPauseToggle = document.querySelector('[mvr-audio-trigger="click"]')
    const playButton = document.querySelector('[mvr-audio-trigger="play-button"]')
    const pauseButton = document.querySelector('[mvr-audio-trigger="pause-button"]')
    const currentTimeDisplay = document.querySelector('[mvr-audio-time="current-time"]')
    const durationDisplay = document.querySelector('[mvr-audio-time="duration"]')

  //play pause toggle
  playPauseToggle.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playButton.classList.add("hide");
      pauseButton.classList.remove("hide");
    } else {
      audio.pause();
      playButton.classList.remove("hide");
      pauseButton.classList.add("hide");
    }
  });

  //duration on page load
  audio.addEventListener("loadedmetadata", function () {
    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;
  });

  //time update
  audio.addEventListener("timeupdate", function () {
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;

    // Update the seek bar position
    // seekBar.value = audio.currentTime;
  });
});
