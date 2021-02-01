// Desafio 9 - Eventos.

/********************************************************************************************************************* */
// Clase Orquidea: genero, especie, precio, id e imagen. 
// Metodos: isAvailable checkea si hay disponibilidad de stock en cuanto a lo que pide el cliente, minusStock resta el stock de acuerdo a lo que pide el cliente,
// plusStock suma al stock lo que se remueva del carrito.
class Orchid {
  constructor(id, genero, especie, precio, stock, img) {
    this.genero = genero;
    this.especie = especie;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
    this.imagen = img; // Agrego un id para poder remover exactamente una orquidea del carrito si se desea.
  }
  
  isAvailable(cant) {
    return cant < this.stock ? true : false;
  }

  minusStock(cant) {
    this.stock = this.stock - cant;
  }

  plusStock(cant) {
    this.stock = this.stock + cant;
  }                 
}

/************************************************************************************************************************** */
// Clase carrito: LLevamos un array para el contenido. Y un valor que es el total del mismo.
//Metodos : addToCarrito agrega N elementos al carrito. removeFromCarrito saca un elemento seleccionado del carrito.
class Carrito {
  constructor(content, total) {
    this.contentList = content;
    this.total = total;
  }


  addToCarrito(orq) {
    let cant =  document.getElementById(`input${orq.id}`).value;
    console.log('cantidad a agregar', cant)
    if(cant && orq.isAvailable(cant)) {
      for(let j=0 ; j<cant; j++) {
        this.contentList = this.contentList.concat([orq]);
      }
      this.total = this.total + cant * orq.precio;
      orq.minusStock(cant);  
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
    if(idList.includes(orq.id)) { // [1,1,1,1, 2, 5] ???
      let prevLength = this.contentList.length;
      this.contentList = this.contentList.filter( (orchid) => orchid.id !== orq.id);
      this.total = this.total - (prevLength - this.contentList.length) * orq.precio;
      orq.plusStock(prevLength - this.contentList.length);
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

/******************************************************************************************************** */
// orquideum y carrito, Variables principales del ecommerce
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

// Generacion del contenido HTML  de nuestra pagina. 
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
              <input placeholder="Cantidad" value="0" class="form-control form-control-rounded" type="number" id="input${orquideum[i].id}">
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
          <input placeholder="Cantidad" value="" class="form-control form-control-rounded" type="number" id="input${orquideum[i].id}">
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

/************************************************************************************************************************************ */
// Filtros
// Se armo un filtro por genero, y precio.
let filters = ``;
let filterPrices = ``;
let auxGen = [];

for(i=0; i < orquideum.length; i++) {
  if (!auxGen.includes(orquideum[i].genero)) {
    auxGen.push(orquideum[i].genero);
    filters += `
                  <div class="market__aside__filterContainer">
                      <h6>${orquideum[i].genero}</h6>
                      <input id="input${orquideum[i].especie}" type="checkbox" onchange="filterByName(orquideum[${i}])">
                  </div>
              `
  }
}

filterPrices += `
                  <div class="market__aside__filterContainer">
                      <h6>Hasta 1000$</h6>
                      <input id="inputPrice1" name="filterPrice" type="radio" onchange="filterByPrice(0,1000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>1001$ - 2000$</h6>
                      <input id="inputPrice2" type="radio" name="filterPrice" onchange="filterByPrice(1001,2000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>2001$ - 3000$</h6>
                      <input id="inputPrice3" name="filterPrice" type="radio" onchange="filterByPrice(2001,3000)">
                  </div>
                  <div class="market__aside__filterContainer">
                      <h6>Desde 3000$</h6>
                      <input id="inputPrice4" type="radio" name="filterPrice" onchange="filterByPrice(3000,99999)">
                  </div>
              `

// Agrego las opciones de filtro
document.getElementById('filtersName').innerHTML = filters;
document.getElementById('filtersPrice').innerHTML = filterPrices;

//Lista filtrada
let filterList = [];

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
// Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
};

let priceFilteredList = [];
let filterItems = ``;

function filterByPrice(desde, hasta) {
  //Filtro desde el arreglo original las que esten en el precio.
  priceFilteredList = orquideum.filter((orq) => desde <= orq.precio && orq.precio <= hasta);
  // Llamo a esta funcion para setear el estado filtrado (teniendo en cuenta el otro filtro)
  setFilterState(filterList, priceFilteredList);
}

function setFilterState(filterArray, priceFilterArray) {
  let newFilterState = [];

  // Hago una interseccion entre los arreglos en caso de tener distintos filtros. 
  // Si alguno es vacio, "devuelvo" el otro. 
  // Si los 2 son vacios, volvemos al estado original
  if(priceFilterArray.length && filterArray.length) {
    for(i=0; i<filterArray.length; i++) {
      if(priceFilterArray.includes(filterArray[i])) {
        newFilterState.push(filterArray[i]);
      }
    }
  } else {
    if (!filterArray.length) {
      newFilterState = priceFilterArray;
    }
    if(!priceFilterArray.length) {
      newFilterState = filterArray;
    }
    if(!priceFilterArray.length && !filterArray.length){
      newFilterState = orquideum;
    }
  }

  filterItems = ``;
    for (let i = 0; i < newFilterState.length; i++) {
      if (newFilterState[i].stock > 0) {
        filterItems += `
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top market__img" alt="imagen flor" src=${newFilterState[i].imagen}></a>
                <div class="card-body">
                  <h4 class="card-title">
                    <a href="#">${newFilterState[i].genero} ${newFilterState[i].especie}</a>
                  </h4>
                  <h5>$${newFilterState[i].precio}</h5>
                  <input placeholder="Cantidad" value="" class="form-control form-control-rounded" type="number" id="input${newFilterState[i].id}">
                </div>
                <div id="cardFooter" class="card-footer">
                  <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(newFilterState[${i}])">Comprar</button>
                  <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(newFilterState[${i}])">Sacar del carrito</button>
                </div>
              </div>
            </div>
            `;
      }else {
        filterItems +=
          ` <div class="col-lg-4 col-md-6 mb-4">
              <div class="card h-100">
                <a href="#"><img class="card-img-top market__img" src=${newFilterState[i].imagen} alt="imagen flor"></a>
              <div class="card-body">
              <h4 class="card-title">
                <a href="#">${newFilterState[i].genero} ${newFilterState[i].especie}</a>
              </h4>
              <h5>$${newFilterState[i].precio}</h5>
              <input placeholder="Cantidad" value="" class="form-control form-control-rounded" type="number" id="input${newFilterState[i].id}">
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-primary" onclick="carrito.addToCarrito(newFilterState[${i}])">Comprar</button>
              <button type="button" class="btn btn-primary" onclick="carrito.removeFromCarrito(newFilterState[${i}])">Sacar del carrito</button>
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