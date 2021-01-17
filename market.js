// Desafio 4 - Simulador de mercado online.

function showOrchids(orq) {
    switch (orq.toLowerCase()) {
        case 'laelia':
            document.getElementById("result").innerHTML = `
            <h1 style="align-self: center;"> Aqui tiene una laelia Tenebrosa </h1>
            <div class="col-sm-6 col-md-4 col-lg-3 item">
            <a href="imagenes/orqIndex1.jpg" data-lightbox="photos" data-toggle="modal" data-target="#myModal3">
                <img class="img-fluid galeriaMainSection__customImg" src="imagenes/Laelia-tenebrosa.jpg" >
                <i class="fa fa-search galeriaMainSection__customImg__hoverEffect"></i>
            </a>

            <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                  <div class="modal-content galeriaMainSection__backgroundModal">
                    <div class="modal-header galeriaMainSection__modalHeader">
                      <button type="button" class="close galeriaMainSection__noMargin" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title  galeriaMainSection__titleModal" id="myModalLabel">Laelia Tenebrosa</h4>
                    </div>
                    <div class="modal-body">
                        <img class="img-fluid" src="imagenes/Laelia-tenebrosa.jpg" >
                    </div>
                  </div>
                </div>
              </div>
        </div>
                            `; 
            break;
        case 'cymbidium':
            document.getElementById("result").innerHTML = `
                <h1 style="align-self: center;"> Aqui tiene una Cymbidium Briggitte-Bardot </h1>
                <div class="col-sm-6 col-md-4 col-lg-3 item">
                            <a href="imagenes/orqIndex1.jpg" data-lightbox="photos" data-toggle="modal" data-target="#myModal4">
                                <img class="img-fluid galeriaMainSection__customImg" src="imagenes/cymbidium-BriggitteBardot.jpg" >
                                <i class="fa fa-search galeriaMainSection__customImg__hoverEffect"></i>
                            </a>

                            <div class="modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content galeriaMainSection__backgroundModal">
                                    <div class="modal-header galeriaMainSection__modalHeader">
                                      <button type="button" class="close galeriaMainSection__noMargin" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title  galeriaMainSection__titleModal" id="myModalLabel">Cymbidium Briggitte Bardot</h4>
                                    </div>
                                    <div class="modal-body">
                                        <img class="img-fluid" src="imagenes/cymbidium-BriggitteBardot.jpg" >
                                    </div>
                                  </div>
                                </div>
                              </div>
                        </div>
            `;
            break;
        case 'cattleya':
            document.getElementById("result").innerHTML = `
            <h1 style="align-self: center;"> Aqui tiene una Cattleya Lodiguesi </h1>
            <div class="col-sm-6 col-md-4 col-lg-3 item">
                            <a href="imagenes/orqIndex1.jpg" data-lightbox="photos" data-toggle="modal" data-target="#myModal6">
                                <img class="img-fluid galeriaMainSection__customImg" src="imagenes/Cat-Lodiguesi.jpg" >
                                <i class="fa fa-search galeriaMainSection__customImg__hoverEffect"></i>
                            </a>

                            <div class="modal fade" id="myModal6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content galeriaMainSection__backgroundModal">
                                    <div class="modal-header galeriaMainSection__modalHeader">
                                      <button type="button" class="close galeriaMainSection__noMargin" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title  galeriaMainSection__titleModal" id="myModalLabel">Cattleya Lodiguessi</h4>
                                    </div>
                                    <div class="modal-body">
                                        <img class="img-fluid" src="imagenes/Cat-Lodiguesi.jpg" >
                                    </div>
                                  </div>
                                </div>
                              </div>
                        </div>
            `;
            break;
        case 'dendrobium':
            document.getElementById("result").innerHTML = `
            <h1 style="align-self: center;"> Aqui tiene una dendrobium Nobile </h1>
            <div class="col-sm-6 col-md-4 col-lg-3 item">
                            <a href="imagenes/orqIndex1.jpg" data-lightbox="photos" data-toggle="modal" data-target="#myModal8">
                                <img class="img-fluid galeriaMainSection__customImg" src="imagenes/dendrobium-nobile.jpg" >
                                <i class="fa fa-search galeriaMainSection__customImg__hoverEffect"></i>
                            </a>

                            <div class="modal fade" id="myModal8" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                <div class="modal-dialog" role="document">
                                  <div class="modal-content galeriaMainSection__backgroundModal">
                                    <div class="modal-header galeriaMainSection__modalHeader">
                                      <button type="button" class="close galeriaMainSection__noMargin" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                      <h4 class="modal-title  galeriaMainSection__titleModal" id="myModalLabel">Dendrobium Nobile</h4>
                                    </div>
                                    <div class="modal-body">
                                        <img class="img-fluid" src="imagenes/dendrobium-nobile.jpg" >
                                    </div>
                                  </div>
                                </div>
                              </div>
                        </div>`;
            break;
        default: 
        document.getElementById("result").innerHTML = `<h1>Lo sentimos, no tenemos el genero solicitado.</h1>` 
    }
}

window.onload = () => {
    let welcome = prompt('Bienvenido al market! Ingrese un genero en el que estaria interesado.');

    showOrchids(welcome);
}

