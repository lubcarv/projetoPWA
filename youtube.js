const API_KEY = "AIzaSyDj4-7_2mLtqPgHGln7kEoOnEG83g7sXKo";
const MAX_RESULTS = 8; // Número de vídeos a serem retornados

/**
 *
 * @param {string} artista - Nome da artista para buscar vídeos
 * @returns {Promise<Array>} - Array de objetos com informações dos vídeos
 */
async function buscarVideos(artista) {
  try {
    document.getElementById("loading-spinner").style.display = "block";

    const searchTerm = `${artista} official music video`;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
      searchTerm
    )}&maxResults=${MAX_RESULTS}&type=video&key=${API_KEY}`;

    const response = await axios.get(url);

    if (
      !response.data ||
      !response.data.items ||
      response.data.items.length === 0
    ) {
      console.log("Nenhum vídeo encontrado para esta artista");
      return [];
    }

    const videos = response.data.items.map((item) => {
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails.high.url ||
          item.snippet.thumbnails.default.url,
        channelTitle: item.snippet.channelTitle,
        publishTime: new Date(item.snippet.publishTime).toLocaleDateString(
          "pt-BR"
        ),
      };
    });

    await new Promise((resolve) => setTimeout(resolve, 800));

    return videos;
  } catch (error) {
    console.error("Erro ao buscar vídeos do YouTube:", error);

    return getMockVideos(artista);
  } finally {
    document.getElementById("loading-spinner").style.display = "none";
  }
}

/**
 *
 * @param {string} artista -
 * @returns {Array} -
 */
function getMockVideos(artista) {
  console.log("Usando vídeos mockados para", artista);

  const mockVideosData = {
    Beyoncé: [
      {
        videoId: "ViwtNLUqkMY",
        title: "Beyoncé - Single Ladies (Put a Ring on It)",
        description: "Vídeo oficial de Single Ladies",
        thumbnail: "https://i.ytimg.com/vi/ViwtNLUqkMY/hqdefault.jpg",
        channelTitle: "Beyoncé",
        publishTime: "15/10/2009",
      },
      {
        videoId: "bnVUHWCynig",
        title: "Beyoncé - Halo",
        description: "Vídeo oficial de Halo",
        thumbnail: "https://i.ytimg.com/vi/bnVUHWCynig/hqdefault.jpg",
        channelTitle: "Beyoncé",
        publishTime: "22/12/2009",
      },
      {
        videoId: "Ob7vObnFUJc",
        title: "Beyoncé - Crazy In Love ft. JAY-Z",
        description: "Vídeo oficial de Crazy In Love",
        thumbnail: "https://i.ytimg.com/vi/Ob7vObnFUJc/hqdefault.jpg",
        channelTitle: "Beyoncé",
        publishTime: "22/06/2010",
      },
      {
        videoId: "k4YRWT_Aldo",
        title: "Beyoncé - Irreplaceable",
        description: "Vídeo oficial de Irreplaceable",
        thumbnail: "https://i.ytimg.com/vi/k4YRWT_Aldo/hqdefault.jpg",
        channelTitle: "Beyoncé",
        publishTime: "25/10/2009",
      },
    ],
    "Britney Spears": [
      {
        videoId: "CduA0TULnow",
        title: "Britney Spears - ...Baby One More Time",
        description: "Vídeo oficial de Baby One More Time",
        thumbnail: "https://i.ytimg.com/vi/CduA0TULnow/hqdefault.jpg",
        channelTitle: "Britney Spears",
        publishTime: "25/10/2009",
      },
      {
        videoId: "LOZuxwVk7TU",
        title: "Britney Spears - Toxic",
        description: "Vídeo oficial de Toxic",
        thumbnail: "https://i.ytimg.com/vi/LOZuxwVk7TU/hqdefault.jpg",
        channelTitle: "Britney Spears",
        publishTime: "25/10/2009",
      },
      {
        videoId: "elueA2rofoo",
        title: "Britney Spears - Oops!...I Did It Again",
        description: "Vídeo oficial de Oops I Did It Again",
        thumbnail: "https://i.ytimg.com/vi/elueA2rofoo/hqdefault.jpg",
        channelTitle: "Britney Spears",
        publishTime: "25/10/2010",
      },
      {
        videoId: "PZYSiWHW8V0",
        title: "Britney Spears - Womanizer",
        description: "Vídeo oficial de Womanizer",
        thumbnail: "https://i.ytimg.com/vi/PZYSiWHW8V0/hqdefault.jpg",
        channelTitle: "Britney Spears",
        publishTime: "25/10/2008",
      },
    ],
    Rihanna: [
      {
        videoId: "uelHwf8o7_U",
        title: "Eminem ft. Rihanna - Love The Way You Lie",
        description: "Vídeo oficial de Love The Way You Lie",
        thumbnail: "https://i.ytimg.com/vi/uelHwf8o7_U/hqdefault.jpg",
        channelTitle: "Eminem",
        publishTime: "05/08/2010",
      },
      {
        videoId: "tg00YEETFzg",
        title: "Rihanna - Pon de Replay (Internet Version)",
        description: "Vídeo oficial de Pon de Replay",
        thumbnail: "https://i.ytimg.com/vi/tg00YEETFzg/hqdefault.jpg",
        channelTitle: "Rihanna",
        publishTime: "25/10/2009",
      },
      {
        videoId: "ehcVomMexkY",
        title: "Rihanna - SOS",
        description: "Vídeo oficial de SOS",
        thumbnail: "https://i.ytimg.com/vi/ehcVomMexkY/hqdefault.jpg",
        channelTitle: "Rihanna",
        publishTime: "05/09/2011",
      },
      {
        videoId: "pa14VNsdSYM",
        title: "Rihanna - Only Girl (In The World)",
        description: "Vídeo oficial de Only Girl",
        thumbnail: "https://i.ytimg.com/vi/pa14VNsdSYM/hqdefault.jpg",
        channelTitle: "Rihanna",
        publishTime: "20/11/2010",
      },
    ],
    "Christina Aguilera": [
      {
        videoId: "eAfyFTzZDMM",
        title: "Christina Aguilera - Genie In a Bottle",
        description: "Vídeo oficial de Genie In a Bottle",
        thumbnail: "https://i.ytimg.com/vi/eAfyFTzZDMM/hqdefault.jpg",
        channelTitle: "Christina Aguilera",
        publishTime: "24/10/2009",
      },
      {
        videoId: "kIDWgqDBNXA",
        title: "Christina Aguilera - Beautiful",
        description: "Vídeo oficial de Beautiful",
        thumbnail: "https://i.ytimg.com/vi/kIDWgqDBNXA/hqdefault.jpg",
        channelTitle: "Christina Aguilera",
        publishTime: "03/10/2009",
      },
      {
        videoId: "dg8QgUIKXHw",
        title: "Christina Aguilera - Candyman",
        description: "Vídeo oficial de Candyman",
        thumbnail: "https://i.ytimg.com/vi/dg8QgUIKXHw/hqdefault.jpg",
        channelTitle: "Christina Aguilera",
        publishTime: "28/10/2009",
      },
      {
        videoId: "Fqxgt0QzMHI",
        title: "Christina Aguilera - Fighter",
        description: "Vídeo oficial de Fighter",
        thumbnail: "https://i.ytimg.com/vi/Fqxgt0QzMHI/hqdefault.jpg",
        channelTitle: "Christina Aguilera",
        publishTime: "16/11/2009",
      },
    ],
    "Lady Gaga": [
      {
        videoId: "qrO4YZeyl0I",
        title: "Lady Gaga - Bad Romance",
        description: "Vídeo oficial de Bad Romance",
        thumbnail: "https://i.ytimg.com/vi/qrO4YZeyl0I/hqdefault.jpg",
        channelTitle: "Lady Gaga",
        publishTime: "23/11/2009",
      },
      {
        videoId: "bESGLojNYSo",
        title: "Lady Gaga - Poker Face",
        description: "Vídeo oficial de Poker Face",
        thumbnail: "https://i.ytimg.com/vi/bESGLojNYSo/hqdefault.jpg",
        channelTitle: "Lady Gaga",
        publishTime: "22/12/2009",
      },
      {
        videoId: "2Hjp0vgS_Xk",
        title: "Lady Gaga - Born This Way",
        description: "Vídeo oficial de Born This Way",
        thumbnail: "https://i.ytimg.com/vi/2Hjp0vgS_Xk/hqdefault.jpg",
        channelTitle: "Lady Gaga",
        publishTime: "27/02/2011",
      },
      {
        videoId: "pco91kroVgQ",
        title: "Lady Gaga - Applause",
        description: "Vídeo oficial de Applause",
        thumbnail: "https://i.ytimg.com/vi/pco91kroVgQ/hqdefault.jpg",
        channelTitle: "Lady Gaga",
        publishTime: "19/08/2013",
      },
    ],
    "Katy Perry": [
      {
        videoId: "0KSOMA3QBU0",
        title: "Katy Perry - Dark Horse (Official) ft. Juicy J",
        description: "Vídeo oficial de Dark Horse",
        thumbnail: "https://i.ytimg.com/vi/0KSOMA3QBU0/hqdefault.jpg",
        channelTitle: "Katy Perry",
        publishTime: "20/02/2014",
      },
      {
        videoId: "QGJuMBdaqIw",
        title: "Katy Perry - Firework",
        description: "Vídeo oficial de Firework",
        thumbnail: "https://i.ytimg.com/vi/QGJuMBdaqIw/hqdefault.jpg",
        channelTitle: "Katy Perry",
        publishTime: "28/10/2010",
      },
      {
        videoId: "CevxZvSJLk8",
        title: "Katy Perry - Roar",
        description: "Vídeo oficial de Roar",
        thumbnail: "https://i.ytimg.com/vi/CevxZvSJLk8/hqdefault.jpg",
        channelTitle: "Katy Perry",
        publishTime: "05/09/2013",
      },
      {
        videoId: "F57P9C4SAW4",
        title: "Katy Perry - California Gurls ft. Snoop Dogg",
        description: "Vídeo oficial de California Gurls",
        thumbnail: "https://i.ytimg.com/vi/F57P9C4SAW4/hqdefault.jpg",
        channelTitle: "Katy Perry",
        publishTime: "11/06/2010",
      },
    ],
  };

  return mockVideosData[artista] || mockVideosData["Beyoncé"];
}

/**
 * Renderiza os vídeos na interface
 * @param {Array} videos - Array de objetos com informações dos vídeos
 */
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
        <div class="video-thumbnail">
          <img src="${video.thumbnail}" class="card-img-top" alt="${
      video.title
    }">
          <i class="fas fa-play-circle play-icon"></i>
        </div>
        <div class="card-body">
          <h6 class="card-title">${limitText(video.title, 60)}</h6>
          <p class="card-text small">${limitText(video.channelTitle, 30)}</p>
        </div>
      </div>
    `;

    videoCard.addEventListener("click", () => {
      if (window.createVideoModal) {
        window.createVideoModal(video.videoId, video.title);
      } else {
        const url = `https://www.youtube.com/watch?v=${video.videoId}`;
        window.open(url, "_blank");
      }
    });

    videoContainer.appendChild(videoCard);
  });
}

/**
 *
 * @param {string} text - O
 * @param {number} maxLength
 * @returns {string} -
 */
function limitText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

window.buscarVideos = buscarVideos;
window.renderizarVideos = renderizarVideos;
