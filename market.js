// Desafio 6 - Arrays.
class Orchid {
  constructor(id, genero, especie, precio, stock, img) {
    this.genero = genero;
    this.especie = especie;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
    this.imagen = img; // Agrego un id para poder remover exactamente una orquidea del carrito si se desea.
  }
  
  isAvailable() {
    return this.stock ? true : false;
  }

  minusStock() {
    this.stock = this.stock - 1;
  }

  plusStock() {
    this.stock = this.stock + 1;
  }                      // Funciones para aumentar/decrementar el stock de orquideas.
}

class Carrito {
  constructor(content, total) {
    this.contentList = content; // Arreglo para el contenido del carrito
    this.total = total; // Valor total del contenido en el carrito   
  }

  addToCarrito(orq) {
    if(orq.isAvailable()) {
      this.contentList = this.contentList.concat([orq]);
      this.total = this.total + orq.precio;
      orq.minusStock();  
    } else {
      alert('Disculpe, nos quedamos sin stock')
    }

    console.log('carrito', this.contentList)
    console.log('total', this.total)
    console.log(orq)
  }

  removeFromCarrito(orq) {
    let idList = this.contentList.map((elem) => elem.id);
    console.log('idList', idList)
    if(idList.includes(orq.id)) {
      this.contentList = this.contentList.filter( (orchid) => orchid.id !== orq.id);
      this.total = this.total - orq.precio;
      orq.plusStock();
    } else {
      alert('La planta no fue agregado al carrito!')
    }

    console.log('carrito', this.contentList)
    console.log('total', this.total)
    console.log(orq)
  }

  getTotal() {
    alert(`El total es: ${this.total}`)
  }
}

let orquideum = [
  new Orchid( 1 ,'Cattleya', 'Lodiguezzi', 2499, 7, "imagenes/Cat-Lodiguesi.jpg"),
  new Orchid( 2 , 'Dendrobium', 'Nobile', 1849, 2, "imagenes/dendrobium-nobile.jpg"),
  new Orchid( 3 ,'Laelia', 'Tenebrosa', 2000, 3, "imagenes/Laelia-tenebrosa.jpg"),
  new Orchid( 4, 'Cymbidium', 'Briggitte-Bardot', 3599, 1, "imagenes/cymbidium-BriggitteBardot.jpg" ),
  new Orchid( 5, 'Cattleya', 'Little-Toshie', 720, 0, "imagenes/cat-LittleToshie.jpg" ),
  new Orchid( 6, 'Cattleya', 'Scholfeldana', 1299, 1,"imagenes/cat-scholfeldana.jpg" ),
  new Orchid( 7, 'Cattleya', 'Sophroniti-Cernua', 4999, 6 ,"imagenes/cat-sophronitiCernua.jpg"),
  new Orchid( 8, 'Odontocidium', 'Susan-Keller', 1800, 7, "imagenes/odonto-SusanKeller.jpg" )
];

let carrito = new Carrito([], 0);
let item = ``;

for (let i = 0; i < orquideum.length; i++) {
  if (orquideum[i].stock > 0) {
    item += `
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100">
            <a href="#"><img class="card-img-top market__img" alt="imagen flor" src=${orquideum[i].imagen}></a>
            <div class="card-body">
              <h4 class="card-title">
                <a href="#">${orquideum[i].genero} ${orquideum[i].especie}</a>
              </h4>
              <h5>$${orquideum[i].precio}</h5>
            </div>
            <div id="cardFooter" class="card-footer">
              <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(orquideum[${i}])">Comprar</button>
              <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(orquideum[${i}])">Sacar del carrito</button>
            </div>
          </div>
        </div>
        `;
  }else {
    item +=
      ` <div class="col-lg-4 col-md-6 mb-4">
          <div class="card h-100">
            <a href="#"><img class="card-img-top market__img" src=${orquideum[i].imagen} alt="imagen flor"></a>
          <div class="card-body">
          <h4 class="card-title">
            <a href="#">${orquideum[i].genero} ${orquideum[i].especie}</a>
          </h4>
          <h5>$${orquideum[i].precio}</h5>
        </div>
        <div class="card-footer">
          <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(orquideum[${i}])">Comprar</button>
          <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(orquideum[${i}])">Sacar del carrito</button>
        </div>
      </div>
    </div>`
  }
}

document.getElementById('menu').innerHTML = item;



















































































































/*function clickCattleya() {
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
*/