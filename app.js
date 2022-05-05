let arr =[];

const renderizar = ( item ) => {
 let lugar = document.getElementById( 'cartas' );
 lugar.innerHTML = '';
 item.forEach( ( item ) => {
     let name = item.name
     let path = item.thumbnail.path 
     let extension = item.thumbnail.extension
    lugar.innerHTML += `
    <div class="carta">
        <button onclick="favoritos('${name}' , '${path}' , '${extension}' )" id="AgregarFavorito(${name})" class="AgregarFavoritos" >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
        </button>
        <button onclick="quitarFavoritos('${name}' , '${path}' , '${extension}')" id="EliminarFavoritos(${name})" class="EliminarFavoritos " >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
        </button>
        <img src="${path + '.' + extension}" alt="">
        <h2>${name}</h2>
    </div>
`;
 });
};

const cargar = async () => { 
    let url = 'https://gateway.marvel.com:443/v1/public/characters?apikey=e3385dba8089b6e50a1be6f8c2fe4b04&ts=1651340733&hash=45c5a8ed9549ab938d288597775573cf&limit=50';
    let getData = await fetch( url );
    let data = await getData.json();
    let superHeroes = data.data.results; 
    renderizar ( superHeroes );
    traerDelLocalStorage(superHeroes);
}

const buscar = async () => {
    let infoBuscar = document.getElementById( 'buscador' ).value;
    if(infoBuscar === ''){
        cargar();
    } else {
        let urlBuscar = `https://gateway.marvel.com:443/v1/public/characters?apikey=e3385dba8089b6e50a1be6f8c2fe4b04&ts=1651340733&hash=45c5a8ed9549ab938d288597775573cf&limit=50&nameStartsWith=${infoBuscar}`;
        let getData = await fetch( urlBuscar );
        let data = await getData.json();
        let superHeroes = data.data.results;
        renderizar( superHeroes );
        traerDelLocalStorage(superHeroes);
    }
}



const favoritos = ( item , path , extension) => {

    let obj = {
        name: item , 
        thumbnail: {
                path: path, 
                extension: extension,
        }
    
    }

    arr.push( obj)
    localStorage.setItem('superHeroes' , JSON.stringify(arr));

    let boton = document.getElementById(`AgregarFavorito(${item})`);
    boton.classList.add('AgregarFavoritos_no_ver');
    
    let botonX = document.getElementById(`EliminarFavoritos(${item})`);
    botonX.classList.add('EliminarFavoritos_ver');
}

const quitarFavoritos = ( item,  path , extension ) => {

   
    arr.forEach( (hero , index) => {
        if( hero.name === item ){ 
          arr.splice( index , 1);
          localStorage.setItem('superHeroes' , JSON.stringify(arr));
        }
        if ( arr.length === 0 ) {
            localStorage.removeItem('superHeroes');
        }
     }) 
   
    let boton = document.getElementById(`AgregarFavorito(${item})`);
    boton.classList.remove('AgregarFavoritos_no_ver');
    
    let botonX = document.getElementById(`EliminarFavoritos(${item})`);
    botonX.classList.remove('EliminarFavoritos_ver');
 
}



 const mostrarFavoritos = () => {
    if(localStorage.getItem( 'superHeroes' )){
        let arregloLocalStorage = JSON.parse( localStorage.getItem( 'superHeroes' ) );
        renderizar( arregloLocalStorage )
        traerDelLocalStorage(arregloLocalStorage)
    } else {
        let lugar = document.getElementById( 'cartas' );
        lugar.innerHTML = 
        `<h1 class="sin-heroe">No tienes ningun personaje agregado a favoritos</h1>`;
        
    }
 }


 const traerDelLocalStorage = ( item ) => {
     let arregloLocalStorage = JSON.parse( localStorage.getItem( 'superHeroes' ) );
    if( arregloLocalStorage === null ){;
        arr = [];
    } else {
        arr = arregloLocalStorage
             arregloLocalStorage.forEach( (local) => {
                item.forEach( (itm) => {
                    if ( local.name === itm.name){
                        let boton = document.getElementById(`AgregarFavorito(${local.name})`);
                        boton.classList.add('AgregarFavoritos_no_ver');
                        let botonX = document.getElementById(`EliminarFavoritos(${local.name})`);
                         botonX.classList.add('EliminarFavoritos_ver');
                    }
                })
            });
    };
}; 


cargar();
