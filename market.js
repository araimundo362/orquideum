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

// Armo la lista de generos para poder filtrar. 

let filters = ``;
let auxGen = [];

for(i=0; i < orquideum.length; i++) {
  if (!auxGen.includes(orquideum[i].genero)) {
    auxGen.push(orquideum[i].genero);
    filters += `
                  <div class="market__aside__filterContainer">
                      <h6>${orquideum[i].genero}</h6>
                      <input id="input${orquideum[i].especie}" type="checkbox" onchange="filterByName(orquideum[${i}], event)">
                  </div>
              `
  }
}
// Agrego las opciones de filtro
document.getElementById('filtersName').innerHTML = filters;

//Lista filtrada
let filterList = [];
let filterItems = ``;

function checkForOrchid(orq, ar) {
  for (i=0; i < ar.length; i++) {
    if (ar[i].genero === orq.genero) {
      return true;
    }
  }

  return false;
} 

function filterByName(orq) {
  // Me fijo si la orquidea ya fue agregada al filtro o no. En caso positivo la saco del arreglo filtrado y los elementos. En caso negativo, la agrego y filtro
  if (checkForOrchid(orq, filterList)) {
    filterList = filterList.filter((orch) => orch.genero !== orq.genero);
  } else {
    filterList = filterList.concat(orquideum.filter((orch) => orch.genero === orq.genero));
  }

  if(!filterList.length) {
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

  } else {
    filterItems = ``;
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].stock > 0) {
        filterItems += `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top market__img" alt="imagen flor" src=${filterList[i].imagen}></a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="#">${filterList[i].genero} ${filterList[i].especie}</a>
                  </h4>
                  <h5>$${filterList[i].precio}</h5>
                </div>
                <div id="cardFooter" class="card-footer">
                  <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(filterList[${i}])">Comprar</button>
                  <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(filterList[${i}])">Sacar del carrito</button>
                </div>
              </div>
            </div>
            `;
      }else {
        filterItems +=
          ` <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top market__img" src=${filterList[i].imagen} alt="imagen flor"></a>
              <div class="card-body">
              <h4 class="card-title">
                <a href="#">${filterList[i].genero} ${filterList[i].especie}</a>
              </h4>
              <h5>$${filterList[i].precio}</h5>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(filterList[${i}])">Comprar</button>
              <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(filterList[${i}])">Sacar del carrito</button>
            </div>
          </div>
        </div>`
      }
    }
  
    //Borro el elemento menu del DOM.
    document.getElementById('menu').remove();
    //Creo el contenido con el nuevo listado.
    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'itemList');
    newDiv.id = 'menu';
  
    document.getElementById('contentContainer').appendChild(newDiv).innerHTML = filterItems;
  }
};
