const videos = [
  {
    title: "Satria14",
    file: "assets/videos/satria14.mp4",
    poster: "assets/thumbs/satria14.jpg",
    duration: "03:22",
    type: "cinematic",
  },
  {
    title: "Suramala",
    file: "assets/videos/suramala.mp4",
    poster: "assets/thumbs/suramala.jpg",
    duration: "03:17",
    type: "cinematic",
  },
  {
    title: "Red Ops",
    file: "assets/videos/red-ops.mp4",
    poster: "assets/thumbs/red-ops.jpg",
    duration: "02:40",
    type: "game",
  },
  {
    title: "Mega Transform",
    file: "assets/videos/mega-transform.mp4",
    poster: "assets/thumbs/mega-transform.jpg",
    duration: "02:08",
    type: "cinematic",
  },
  {
    title: "Unreal Engine Test",
    file: "assets/videos/unreal-engine-test.mp4",
    poster: "assets/thumbs/unreal-engine-test.jpg",
    duration: "01:05",
    type: "game",
  },
  {
    title: "Ahmad Firdaus",
    file: "assets/videos/ahmad-firdaus.mp4",
    poster: "assets/thumbs/ahmad-firdaus.jpg",
    duration: "02:25",
    type: "cinematic",
  },
  {
    title: "AI Clip 1",
    file: "assets/videos/1.mp4",
    poster: "assets/thumbs/1.jpg",
    duration: "00:10",
    type: "short",
  },
  {
    title: "AI Clip 2",
    file: "assets/videos/2.mp4",
    poster: "assets/thumbs/2.jpg",
    duration: "00:10",
    type: "short",
  },
  {
    title: "AI Clip 3",
    file: "assets/videos/3.mp4",
    poster: "assets/thumbs/3.jpg",
    duration: "00:10",
    type: "short",
  },
];

const grid = document.querySelector("#galleryGrid");
const searchInput = document.querySelector("#searchInput");
const chips = document.querySelectorAll("[data-filter]");
const dialog = document.querySelector("#playerDialog");
const modalVideo = document.querySelector("#modalVideo");
const modalTitle = document.querySelector("#modalTitle");
const modalMeta = document.querySelector("#modalMeta");
const featurePlay = document.querySelector("[data-feature-play]");
const closeButton = document.querySelector("[data-close]");

let activeFilter = "all";

function tagLabel(type) {
  if (type === "game") return "Game visual";
  if (type === "short") return "Short clip";
  return "Cinematic";
}

function renderGallery() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = videos.filter((video) => {
    const matchesFilter = activeFilter === "all" || video.type === activeFilter;
    const matchesSearch = video.title.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = filtered
    .map(
      (video, index) => `
        <article class="video-card" tabindex="0" role="button" data-index="${videos.indexOf(video)}">
          <div class="poster">
            <img src="${video.poster}" alt="${video.title} poster" loading="${index < 4 ? "eager" : "lazy"}" />
            <span class="duration">${video.duration}</span>
          </div>
          <div class="card-body">
            <h3>${video.title}</h3>
            <p><span class="tag ${video.type === "game" ? "game" : ""}">${tagLabel(video.type)}</span> - AI video</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function openPlayer(video) {
  modalVideo.pause();
  modalVideo.src = video.file;
  modalVideo.poster = video.poster;
  modalTitle.textContent = video.title;
  modalMeta.textContent = `${video.duration} - ${tagLabel(video.type)}`;
  dialog.showModal();
  modalVideo.play().catch(() => {});
}

grid.addEventListener("click", (event) => {
  const card = event.target.closest(".video-card");
  if (!card) return;
  openPlayer(videos[Number(card.dataset.index)]);
});

grid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".video-card");
  if (!card) return;
  event.preventDefault();
  openPlayer(videos[Number(card.dataset.index)]);
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeFilter = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle("is-active", item === chip));
    renderGallery();
  });
});

searchInput.addEventListener("input", renderGallery);

featurePlay.addEventListener("click", () => {
  const featured = videos.find((video) => video.title === "Suramala");
  openPlayer(featured);
});

closeButton.addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderGallery();
