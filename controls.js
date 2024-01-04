console.log("Initalizing controls script");

// let audioId = "";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  //variable declaration
  const audio = document.querySelector('[mvr-audio-element="audio"]');
  const seekBar = document.querySelector('input[mvr-audio-element="seek"]');

  const audioList = document.querySelector('[mvr-audio-element="list"]');

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

  const barTitle = document.querySelector('[mvr-audio-meta="title"]');
  const barSpeaker = document.querySelector('[mvr-audio-meta="speaker"]');
  const barArt = document.querySelector('[mvr-audio-meta="art"]');

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
    if (audio.src !== newSource) {
      audio.src = newSource;
      audio.load();
      // Reload the audio element to load the new source triggers metadata reload
      audio.play();
    }
  }

  // Click in Audio List
  audioList.addEventListener("click", function (event) {
    let parent = event.target.closest('[w-el="media_item"]');

    let selectedSource = parent.querySelector(
      '[w-el="media_source"]',
    ).textContent;
    let title = parent.querySelector('[w-el="media_title"]');
    let speaker = parent.querySelector('[w-el="media_speaker"]');
    let thumbnail = parent.querySelector('[w-el="media_art"]');

    // let id = parent.querySelector('[w-el="media_id"]');

    if (selectedSource !== "") {
      changeAudioSource(selectedSource);
      // update metadata
      if (thumbnail.textContent !== null) {
        barArt.src = thumbnail.textContent;
      }
      barTitle.textContent = title.textContent;
      barSpeaker.textContent = speaker.textContent;

      // audioId = id.textContent;
    }
  });
});
