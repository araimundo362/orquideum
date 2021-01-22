// Desafio 5 - Objetos.
class Orchid {
  constructor(genero, especie, precio, stock) {
    this.genero = genero;
    this.especie = especie;
    this.precio = precio;
    this.stock = stock;
  } 
}

function createCattleya(especie) {
  return new Orchid('Cattleya', especie, 2000, 10);
}

 function createDendrobium(especie) {
  return new Orchid('Dendrobium', especie, 1000, 10);
}

function createCymbidium(especie) {
  return new Orchid('Cymbidium', especie, 4000, 10);
}

function createLaelia(especie) {
  return new Orchid('Laelia', especie, 3000, 10);
}




/*let orquideum = [
  new Orchid('Cattleya', 'lodiguesi', 2499, 7),
  new Orchid('Dendrobium', 'Nobile', 1849, 2),
  new Orchid('Laelia', 'Tenebrosa', 2000, 3),
  new Orchid('Cymbidium', 'Briggitte-Bardot', 3599, 1 ),
];

let carrito = new Carrito([], 0);*/

function clickCattleya() {
    let especie = prompt('Ingrese su especie');
    if (especie.toLowerCase() === 'lodiguesi') {
      let cat = createCattleya(especie);
      showOrchids(cat);
    } else {
      alert('Lo sentimos, no se encontro la especie recibida')
    }
}

function clickDendrobium() {
  let especie = prompt('Ingrese su especie');
  if (especie.toLowerCase() === 'nobile') {
    let den = createDendrobium(especie);
    showOrchids(den);
  } else {
    alert('Lo sentimos, no se encontro la especie recibida')
  }
}

function clickLaelia() {
  let especie = prompt('Ingrese su especie');
  if (especie.toLowerCase() === 'tenebrosa') {
    let lae = createLaelia(especie);
    showOrchids(lae);
  } else {
    alert('Lo sentimos, no se encontro la especie recibida')
  }
}

function clickCymbidium() {
  let especie = prompt('Ingrese su especie');
  if (especie.toLowerCase() === 'briggitte-bardot') {
    let cym = createCymbidium(especie);
    showOrchids(cym);
  } else {
    alert('Lo sentimos, no se encontro la especie recibida')
  }
}


function showOrchids(orq) {
    switch (orq.genero.toLowerCase()) {
        case 'laelia':
            document.getElementById("result").innerHTML = `
            <h1 style="align-self: center;"> Aqui tiene una ${orq.genero} ${orq.especie} </h1>
            <h2 style="align-self: center;">Precio: ${orq.precio}</h2>
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
                <h1 style="align-self: center;"> Aqui tiene una ${orq.genero} ${orq.especie} </h1>
                <h2 style="align-self: center;">Precio: ${orq.precio}</h2>
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
            <h1 style="align-self: center;"> Aqui tiene una ${orq.genero} ${orq.especie} </h1>
            <h2 style="align-self: center;">Precio: ${orq.precio}</h2>
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
            <h1 style="align-self: center;"> Aqui tiene una ${orq.genero} ${orq.especie} </h1>
            <h2 style="align-self: center;">Precio: ${orq.precio}</h2>
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
