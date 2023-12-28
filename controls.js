console.log("Initalizing controls script");

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  //variable declaration
  const audio = document.querySelector('[mvr-audio-element="audio"]');
  const audioList = document.querySelector('[mvr-audio-element="list"]');
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
    if (audio.src) {
      if (audio.ended || audio.paused) {
        // if (playButton.classList.contains("hide") || audio.ended || audio.paused) {
        playButton.classList.remove("hide");
        pauseButton.classList.add("hide");
      } else {
        playButton.classList.add("hide");
        pauseButton.classList.remove("hide");
      }
    } else {
      alert("Please select an audio to play.");
    }
  };

  //duration on metadata load
  audio.addEventListener("loadedmetadata", function () {
    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60);
    durationDisplay.textContent =
      durationMinutes +
      ":" +
      (durationSeconds < 10 ? "0" : "") +
      durationSeconds;

    currentTimeDisplay.textContent = "0:00";

    seekBar.value = 0;
    seekBar.min = 0;
    seekBar.max = Math.floor(audio.duration);

    playPauseToggle();
  });

  //time update
  audio.addEventListener("timeupdate", function () {
    if (!isNaN(audio.currentTime) && !isNaN(audio.duration)) {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      currentTimeDisplay.textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

      const durationMinutes = Math.floor(
        (audio.duration - audio.currentTime) / 60,
      );
      const durationSeconds = Math.floor(
        (audio.duration - audio.currentTime) % 60,
      );
      durationDisplay.textContent =
        durationMinutes +
        ":" +
        (durationSeconds < 10 ? "0" : "") +
        durationSeconds;

      // Update the seek bar position
      seekBar.value = audio.currentTime;
    }
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
    if (audio.src) {
      audio.currentTime = seekBar.value;
    } else {
      seekBar.value = 0;
    }
  });

  audio.addEventListener("ended", playPauseToggle);

  function changeAudioSource(newSource) {
    audio.src = newSource;
    audio.load();
    // Reload the audio element to load the new source triggers metadata reload
  }

  audioList.addEventListener("click", function (event) {
    let selectedSource = event.target
      .closest(".audio_list-item")
      .querySelector('[mvr-audio-element="source"]').textContent;
    if (selectedSource !== "") {
      changeAudioSource(selectedSource);
    }
  });
});
