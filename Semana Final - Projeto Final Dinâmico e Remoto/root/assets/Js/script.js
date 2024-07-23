//-------------------------------------------------------------------------------//
// Mapa
const centralLatLong = [139.851331, 36.355094];

fetch('https://json-server-web-api.douglasnicsg.repl.co/unidadesPUC')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.status}`);
        }
        return response.json();
    })
    .then(unidadesPUC => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZG5zZ29tZXMiLCJhIjoiY2xwbjQyNHA3MDYzeDJpa2M5M3hwbWVkbSJ9.Ppd7zBUEKWDoGEp3pbw4_w';

        const mapContainer = document.querySelector('.map'); // Altere '.map' para a classe desejada
        if (!mapContainer) {
            alert("Container 'map' not found.");
        } else {
            const map = new mapboxgl.Map({
                container: mapContainer,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: centralLatLong,
                zoom: 7
            });

            unidadesPUC.forEach((uni) => {
                let popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3><a href="${uni.url}" target="_blank">${uni.descricao}</a></h3><br>${uni.endereco} <br> ${uni.cidade}`);
                const marker = new mapboxgl.Marker({ color: uni.cor })
                    .setLngLat(uni.latlong)
                    .setPopup(popup)
                    .addTo(map);
            });

            function processarGeo(local) {
                let popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3> Estou aqui!!! </h3>`);
                const marker = new mapboxgl.Marker({ color: 'yellow' })
                    .setLngLat([local.coords.longitude, local.coords.latitude])
                    .setPopup(popup)
                    .addTo(map);
            }
        }
    })
    .catch(error => {
        console.error('Erro ao obter dados:', error);
    });

//-------------------------------------------------------------------------------//
// Header
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.createElement('nav');
    nav.className = 'navbar navbar-expand-lg bg-white';

    var container = document.createElement('div');
    container.className = 'container-fluid';

    var logoLink = document.createElement('a');
    logoLink.href = 'index.html';

    var logo = document.createElement('img');
    logo.className = 'logo';
    logo.src = '/assets/img/Screen Shot 2021-10-01 at 8.51.50 PM.png';
    logo.alt = 'Logo';
    logo.width = '300';
    logo.height = '50';

    logoLink.appendChild(logo);

    var toggleButton = document.createElement('button');
    toggleButton.className = 'navbar-toggler';
    toggleButton.type = 'button';
    toggleButton.setAttribute('data-bs-toggle', 'collapse');
    toggleButton.setAttribute('data-bs-target', '#navbarNav');
    toggleButton.setAttribute('aria-controls', 'navbarNav');
    toggleButton.setAttribute('aria-expanded', 'false');
    toggleButton.setAttribute('aria-label', 'Toggle navigation');

    var toggleIcon = document.createElement('span');
    toggleIcon.className = 'navbar-toggler-icon';

    toggleButton.appendChild(toggleIcon);

    container.appendChild(logoLink);
    container.appendChild(toggleButton);

    var navList = document.createElement('ul');
    navList.className = 'navbar-nav';

    var pages = ['INÍCIO', 'EQUIPE', 'FALE CONOSCO'];

    for (var i = 0; i < pages.length; i++) {
        var listItem = document.createElement('li');
        listItem.className = 'nav-item';

        var pageLink = document.createElement('a');
        pageLink.className = 'nav-link';
        pageLink.href = '#'; // Defina a URL correta aqui
        pageLink.textContent = pages[i];

        listItem.appendChild(pageLink);
        navList.appendChild(listItem);
    }

    container.appendChild(navList);
    nav.appendChild(container);

    var header = document.querySelector('header');
    header.appendChild(nav);
});
//-------------------------------------------------------------------------------//
// Carrossel
document.addEventListener('DOMContentLoaded', function () {
    window.conteudodestaque = document.getElementById('destaque');
    fetch('https://json-server-web-api.douglasnicsg.repl.co/noticias')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo JSON: ${response.status}`);
            }
            return response.json();
        })
        .then(noticias => {
            conteudodestaque.innerHTML = `
              <div id="carouselExampleCaptions" class="carousel slide">
                <div class="carousel-indicators">
                  ${noticias.map((_, index) => `
                    <button type="button" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>
                  `).join('')}
                </div>
                <div class="carousel-inner">
                  ${noticias.map((noticia, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                      <img src="${noticia.imagem}" class="d-block mx-auto my-auto" alt="${noticia.alt}" width="70%" height="600vh">
                      <div class="carousel-caption d-none d-md-block">
                        <h5>${noticia.titulo}</h5>
                        <p>${noticia.descricao}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            `;
        });
});

//-------------------------------------------------------------------------------//
// Albums
document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("albumContainer");

    // Use a API Fetch para obter os dados do servidor
    fetch("https://json-server-web-api.douglasnicsg.repl.co/menu")
        .then(response => response.json())
        .then(data => {
            // Manipule os dados recebidos e crie dinamicamente os elementos HTML
            data.forEach(function (item) {
                var div = document.createElement("div");
                div.className = "bg-dark-subtle col-md-3 col-sm-6 mb-3 border rounded border-light pt-2";

                var a = document.createElement("a");
                a.href = "javascript:void(0);"; // Torna o elemento 'a' clicável
                // Adiciona um evento de clique ao elemento <a>
                a.addEventListener("click", function () {
                    // Redireciona para detalhealbum.html com o ID do álbum como parâmetro
                    window.location.href = "detalhealbum.html?albumId=" + item.id;
                });

                // Adiciona a classe quando o mouse estiver sobre o elemento <a>
                a.addEventListener("mouseover", function () {
                    a.classList.add("hovered-link");
                });

                // Remove a classe quando o mouse sair do elemento <a>
                a.addEventListener("mouseout", function () {
                    a.classList.remove("hovered-link");
                });

                var img = document.createElement("img");
                img.src = item.url;
                img.alt = item.nome;
                img.className = "img-fluid rounded";

                var caption = document.createElement("div");
                caption.className = "caption text-center";

                var h4 = document.createElement("h4");
                h4.textContent = item.nome;

                var p = document.createElement("p");
                p.textContent = item.descricaorapida;

                caption.appendChild(h4);
                caption.appendChild(p);
                a.appendChild(img);
                a.appendChild(caption);
                div.appendChild(a);
                container.appendChild(div);
            });
        })
        .catch(error => console.error("Erro ao obter dados do servidor:", error));
});

//-------------------------------------------------------------------------------//
// Footer

document.addEventListener('DOMContentLoaded', function () {
    // Criação dos elementos HTML
    var footer = document.createElement('footer');
    var h1 = document.createElement('h1');
    var divLine = document.createElement('div');
    var container = document.createElement('div');
    var row = document.createElement('div');
    var col1 = document.createElement('div');
    var sobre = document.createElement('div');
    var col2 = document.createElement('div');
    var autor = document.createElement('div');

    // Adição de classes aos elementos
    footer.classList.add('footer');
    divLine.classList.add('line');
    container.classList.add('container', 'mt-4');
    row.classList.add('row');
    col1.classList.add('col-md-6');
    sobre.classList.add('sobre');
    col2.classList.add('col-md-6');
    autor.classList.add('autor');

    // Adição de conteúdo aos elementos
    h1.textContent = 'Créditos';
    sobre.innerHTML = '<h2>Sobre</h2><p>Olá! Me chamo Douglas, mais conhecido por Dom. Este é meu segundo site, então foi bastante desafiador. Aprendi a programar na faculdade mesmo, nunca havia feito nada deste tipo antes, mas eu sempre soube que iria gostar. Escolhi essa temática por gostar de carros e da cultura japonesa em geral. Espero que tenham gostado :D </p>';
    autor.innerHTML = '<h2>Autoria</h2><div><img src="/assets/img/Captura de tela 2023-09-30 005234.png" alt="Foto autor" height="100px"><ul><li><b>Aluno:</b> Douglas Nicolas Silva Gomes</li><li><b>Curso:</b> Ciências da Computação - PUC Cor.Eu.</li><li><b>Turma:</b> Manhã</li></ul></div><div><h3>Redes Sociais:</h3><a href="https://www.facebook.com/douglasnsg/"><i class="fa-brands fa-square-facebook fa-2x"></i></a><a href="https://instagram.com/dominick.sg?igshid=OGQ5ZDc2ODk2ZA=="><i class="fa-brands fa-square-instagram fa-2x"></i></a></div>';

    // Anexar os elementos ao DOM
    document.body.appendChild(footer);
    footer.appendChild(h1);
    footer.appendChild(divLine);
    footer.appendChild(container);
    container.appendChild(row);
    row.appendChild(col1);
    col1.appendChild(sobre);
    row.appendChild(col2);
    col2.appendChild(autor);
});

//-------------------------------------------------------------------------------//
// Detalhealbum
// URL do seu servidor JSON
// Função para obter o ID do álbum da URL
function getAlbumIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('albumId');
}

// URL do seu servidor JSON
const jsonServerUrl = 'https://json-server-web-api.douglasnicsg.repl.co/menu';

// Função para carregar os dados com base no ID do álbum
async function fetchData(albumId) {
    try {
        const response = await fetch(`${jsonServerUrl}/${albumId}`);
        const data = await response.json();
        updateContent(data);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

// Função para atualizar o conteúdo na página
function updateContent(data) {
    const container = document.getElementById('content-container');

    // Limpa o conteúdo atual
    container.innerHTML = '';

    // Cria elementos HTML com base nos dados do álbum
    const div = document.createElement('div');
    div.innerHTML = `
        <h1>${data.nome}</h1>
        <div class="line"></div>
        <div class="container-fluid px-5 mt-2">
            <div class="row">
                <div class="col-md-6">
                    <img src="${data.url}" alt="${data.nome}" class="img-thumbnail">
                </div>
                <div class="col-md-6">
                    <h4>Descrição</h4>
                    <p>${data.descricaorapida}</p>
                    <div class="row">
                        <div class="col-md-8">
                            <h4>Localização</h4>
                            <p>${data.localizacao || ''}</p>
                        </div>
                        <div class="col-md-4">
                            <h4>Data da corrida</h4>
                            <p>${data.data}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Adiciona o novo conteúdo ao contêiner
    container.appendChild(div);
}

// Obtém o ID do álbum da URL
const albumId = getAlbumIdFromUrl();

// Verifica se há um ID de álbum e carrega os dados
if (albumId) {
    fetchData(albumId);
} else {
    console.error('ID do álbum não fornecido na URL.');
}


//-------------------------------------------------------------------------------//
// Detalhe fotos


async function fetchAlbumDetails(albumId) {
    const jsonServerUrl = 'https://json-server-web-api.douglasnicsg.repl.co/menu';
    try {
        const response = await fetch(`${jsonServerUrl}/${albumId}`);
        const data = await response.json();
        updateAlbumDetails(data);
    } catch (error) {
        console.error('Erro ao carregar os detalhes do álbum:', error);
    }
}

async function fetchAlbumImages(albumId) {
    const jsonServerUrl = 'https://json-server-web-api.douglasnicsg.repl.co/fotosalbum';
    try {
        const response = await fetch(`${jsonServerUrl}?idalbum=${albumId}`);
        const imagesData = await response.json();
        updateAlbumImages(imagesData);
    } catch (error) {
        console.error('Erro ao carregar as imagens do álbum:', error);
    }
}

function updateAlbumDetails(data) {
    const detailsContainer = document.getElementById('albumDetailsContainer');
    detailsContainer.innerHTML = '';

    const div = document.createElement('div');
    div.innerHTML = `
        <h1>${data.nome}</h1>
        <div class="line"></div>
        <div class="container-fluid px-5 mt-2">
            <div class="row">
                <div class="col-md-6">
                    <img src="${data.url}" alt="${data.nome}" class="img-thumbnail">
                </div>
                <div class="col-md-6">
                    <h4>Descrição</h4>
                    <p>${data.descricaorapida}</p>
                    <div class="row">
                        <div class="col-md-8">
                            <h4>Localização</h4>
                            <p>${data.localizacao || ''}</p>
                        </div>
                        <div class="col-md-4">
                            <h4>Data da corrida</h4>
                            <p>${data.data}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    detailsContainer.appendChild(div);
}

function updateAlbumImages(imagesData) {
    var imageContainer = document.getElementById('albumImagesContainer');
    imageContainer.innerHTML = '';

    imagesData.forEach(function (image) {
        var col = document.createElement('div');
        col.className = "bg-dark-subtle col-md-3 col-sm-6 mb-3 border rounded border-light pt-2";

        var link = document.createElement('a');
        link.href = image.url;
        link.target = "_blank";

        var img = document.createElement('img');
        img.src = image.url;
        img.alt = image.nome;
        img.className = "img-fluid rounded";

        var caption = document.createElement('div');
        caption.className = "caption text-center";

        var title = document.createElement('h4');
        title.textContent = image.nome;

        if (image.descricao) {
            var description = document.createElement('p');
            description.textContent = image.descricao;
            caption.appendChild(description);
        }

        caption.appendChild(title);

        link.appendChild(img);
        link.appendChild(caption);

        col.appendChild(link);

        imageContainer.appendChild(col);
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let albumId = urlParams.get('albumId');

    if (albumId) {
        // Convert albumId to a number
        albumId = parseInt(albumId, 10);

        // Check if albumId is greater than 2
        if (albumId > 2) {
            console.warn('O ID do álbum é maior que 2. Usando o ID 1 do banco de dados.');
            // Set albumId to 1
            albumId = 1;
        }

        // Fetch album details and images
        await fetchAlbumDetails(albumId);
        await fetchAlbumImages(albumId);
    } else {
        console.error('ID do álbum não fornecido na URL.');
    }
});

