console.log("Hola");

fetch("PodcastRss.xml.xml")
.then(response => response.text())
.then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    const posts = xml.querySelectorAll('post');
    const informacionElements = document.querySelectorAll(".informacion");

    for (let i = 0; i < informacionElements.length; i++) {
        let ficha = '';
        let postIndex = i; // Índice del post correspondiente a esta ficha

        if (postIndex < posts.length) {
            let titulo = posts[postIndex].getAttribute("titulo");
            let fecha = posts[postIndex].getAttribute("fecha");
            let nombre = posts[postIndex].querySelector("nombre").textContent;
            let avatar = posts[postIndex].querySelector("avatar").textContent;
            let introduccion = posts[postIndex].querySelector("introduccion").textContent;
            let descripcion = posts[postIndex].querySelector("descripcion").textContent;
            let num_visualizaciones = posts[postIndex].querySelector("num_visualizaciones").textContent;
            let num_comentarios = posts[postIndex].querySelector("num_comentarios").textContent;
            let num_megusta = posts[postIndex].querySelector("num_megusta").textContent;

            ficha = `
            <div class="ficha">
                <div class="datostop">
                    <img src="${avatar}" width="40px" height="25px">
                    <div class="datos">
                        <span>${nombre} <i class="fa-solid fa-crown" style="color: #93969a;"></i> <br></span>
                        <span>${fecha}</span>
                    </div>
                    <span id="iconoinfo"><i class="fa fa-ellipsis-v" style="color: #93969a;"></i></span>
                </div>
                <h5>${titulo}</h5>
                <div class="parrafo">
                    <p>${introduccion}</p>
                    <p>${descripcion}</p>
                </div>
                <div class="opiniones">
                    <ul>
                        <li id="primero">${num_visualizaciones} visualizacion</li>
                        <li>${num_comentarios} comentarios</li>
                        <li>${num_megusta}<i class="fa-regular fa-heart" style="color: #ff0000;"></i></li>
                    </ul>
                </div>
            </div>
            `;
        }

        informacionElements[i].innerHTML = ficha;
    }
})
.catch(error => {
    console.error('Error al obtener los datos:', error);
});

    
