const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");
const ouvirButtons = document.querySelectorAll(".btn-ouvir");

let currentPage = "home";
let currentArtist = "";

// Registrar o Service Worker (verifique o nome do arquivo: aqui está 'sw.js')
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js') // ajuste para o nome correto do seu service worker
      .then((reg) => console.log("Service Worker registrado!", reg))
      .catch((err) => console.error("Erro ao registrar SW:", err));
  });
}

// Lidar com a instalação PWA
let deferredPrompt;
const installBtn = document.getElementById("btn-instalar");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  if (installBtn) {
    installBtn.style.display = "inline-block";

    // Evitar múltiplos event listeners no botão
    if (!installBtn.hasListener) {
      installBtn.addEventListener("click", async () => {
        installBtn.style.display = "none";
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou instalar o PWA");
        } else {
          console.log("Usuário recusou instalar o PWA");
        }
        deferredPrompt = null;
      });
      installBtn.hasListener = true;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  console.log("Divas 2000 App carregado!");

  setupNavigation();
  setupArtistButtons();
  initializeBootstrapComponents();
  handleInitialNavigation();
});

function setupNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute("data-page");
      navigateToPage(targetPage);

      window.location.hash = targetPage;
    });
  });

  window.addEventListener("popstate", () => {
    handleInitialNavigation();
  });
}

function handleInitialNavigation() {
  const hash = window.location.hash.substring(1);
  if (hash && ["home", "artistas", "videos", "sobre"].includes(hash)) {
    navigateToPage(hash);
  } else {
    navigateToPage("home");
  }
}

function navigateToPage(pageName) {
  if (pageName === currentPage) return;

  pages.forEach((page) => page.classList.remove("active"));
  navLinks.forEach((link) => link.classList.remove("active"));

  const pageEl = document.getElementById(pageName);
  const navLink = document.querySelector(`[data-page="${pageName}"]`);

  if (pageEl && navLink) {
    pageEl.classList.add("active");
    navLink.classList.add("active");
  }

  window.scrollTo(0, 0);

  currentPage = pageName;

  if (pageName === "videos" && currentArtist) {
    loadVideosForArtist(currentArtist);
  }

  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (navbarCollapse.classList.contains("show")) {
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
  }
}

function setupArtistButtons() {
  ouvirButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const artista = button.getAttribute("data-artista");
      currentArtist = artista;

      navigateToPage("videos");

      loadVideosForArtist(artista);
    });
  });
}

function loadVideosForArtist(artista) {
  const spinner = document.getElementById("loading-spinner");
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";
  spinner.style.display = "block";

  buscarVideos(artista)
    .then((videos) => {
      renderizarVideos(videos);
      spinner.style.display = "none";
    })
    .catch((error) => {
      console.error("Erro ao buscar vídeos:", error);
      videoContainer.innerHTML = `
        <div class="col-12 text-center">
          <div class="alert alert-danger">
            Erro ao carregar vídeos. Por favor, tente novamente mais tarde.
          </div>
        </div>
      `;
      spinner.style.display = "none";
    });
}

function initializeBootstrapComponents() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const carousel = document.querySelector(".carousel");
  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 3000,
      wrap: true,
    });
  }
}

function createVideoModal(videoId, title) {
  const existingModal = document.getElementById("videoModal");
  if (existingModal) {
    existingModal.remove();
  }

  const modalHTML = `
    <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="videoModalLabel">${title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div class="modal-body p-0">
            <div class="ratio ratio-16x9">
              <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" title="YouTube video" allowfullscreen allow="autoplay"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const videoModal = new bootstrap.Modal(document.getElementById("videoModal"));
  videoModal.show();

  document
    .getElementById("videoModal")
    .addEventListener("hidden.bs.modal", function () {
      document.getElementById("videoModal").remove();
    });
}

function renderizarVideos(videos) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (!videos || videos.length === 0) {
    videoContainer.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-warning">
          Nenhum vídeo encontrado para esta artista.
        </div>
      </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.className = "col-sm-6 col-md-4 col-lg-3 video-item";
    videoCard.innerHTML = `
      <div class="card cartao h-100">
        <div class="video-thumbnail position-relative">
          <img src="${video.thumbnail}" class="card-img-top" alt="${video.title}">
          <i class="fas fa-play-circle play-icon position-absolute top-50 start-50 translate-middle"></i>
        </div>
        <div class="card-body">
          <h6 class="card-title">${limitText(video.title, 60)}</h6>
          <p class="card-text small">${limitText(video.channelTitle, 30)}</p>
        </div>
      </div>
    `;

    videoCard.addEventListener("click", () => {
      createVideoModal(video.videoId, video.title);
    });

    videoContainer.appendChild(videoCard);
  });
}

function limitText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Exporta para escopo global se precisar
window.renderizarVideos = renderizarVideos;
