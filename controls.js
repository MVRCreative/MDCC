console.log("Initalizing controls script");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  //variable declaration
  const audio = document.querySelector('[mvr-audio-element="audio"]');
  const seekBar = document.querySelector('input[mvr-audio-element="seek"]');
  const playPauseWrapper = document.querySelector(
    '[mvr-audio-trigger="click"]',
  );
  const playButton = document.querySelector(
    '[mvr-audio-trigger="play-button"]',
  );
  const pauseButton = document.querySelector(
    '[mvr-audio-trigger="pause-button"]',
  );
  const currentTimeDisplay = document.querySelector(
    '[mvr-audio-time="current-time"]',
  );
  const durationDisplay = document.querySelector('[mvr-audio-time="duration"]');
  const timeSkip = document.querySelector('[mvr-audio-time="skip"]');
  const timeRewind = document.querySelector('[mvr-audio-time="rewind"]');

  //play pause toggle
  playPauseWrapper.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    playPauseToggle();
  });

  // play/pause toggle function
  const playPauseToggle = function () {
    if (playButton.classList.contains("hide") || audio.ended) {
      playButton.classList.remove("hide");
      pauseButton.classList.add("hide");
    } else {
      playButton.classList.add("hide");
      pauseButton.classList.remove("hide");
    }
  };

  //duration on page load
  audio.addEventListener("loadedmetadata", function () {
    var durationMinutes = Math.floor(audio.duration / 60);
    var durationSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;

    seekBar.min = 0;
    seekBar.max = Math.floor(audio.duration);
  });

  //time update
  audio.addEventListener("timeupdate", function () {
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    currentTimeDisplay.textContent =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    var durationMinutes = Math.floor((audio.duration - audio.currentTime) / 60);
    var durationSeconds = Math.floor((audio.duration - audio.currentTime) % 60);
    durationDisplay.textContent =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;

    // Update the seek bar position
    seekBar.value = audio.currentTime;
  });

  // Skip and Rewind
  timeSkip.addEventListener("click", function () {
    audio.currentTime += 10;
  });
  timeRewind.addEventListener("click", function () {
    audio.currentTime -= 10;
  });

  // Update the audio playback position when the seek bar is dragged
  seekBar.addEventListener("input", function () {
    audio.currentTime = seekBar.value;
  });

  audio.addEventListener("ended", playPauseToggle);
});
