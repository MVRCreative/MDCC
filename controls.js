console.log("Initalizing controls script");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  //variable declaration
  var audio = document.getElementById("audioTarget");
  var playPauseToggle = document.querySelector(".play_toggle-wrapper");
  var playButton = document.getElementById("playButton");
  var pauseButton = document.getElementById("pauseButton");
  var currentTimeDisplay = document.getElementById("currentTime");
  var durationDisplay = document.getElementById("duration");

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
