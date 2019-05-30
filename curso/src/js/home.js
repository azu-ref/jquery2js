//method for jquery
// $.ajax( 'https://randomuser.me/api/', {
//     method: 'GET',
//     success: function(data) {
//         console.log(data)
//     },
//     error: function(error) {
//         console.log(error)
//     }
// })

//method for vanilla js
// fetch('https://randomuser.me/api/sdfsdfsdf')
//     .then( function (response) {
//         //console.log(response)
//         return response.json()
//     })
//     .then(function (data) {
//         console.log('user: ', data.results[0].name.first)
//     })
//     .catch(function (error){
//         console.log(`Algo fallo: ${error}`)
//     });


//por defecto fecth usa el metodo get
//ya que no es necesario pasarle
//parametros de configuracion

//---------------------FUNCIONES ASINCRONAS---------------------------//

(async function load() {
    async function getData(url) {
        const response = await fetch(url)
        const data = await response.json()
        if(data.data.movie_count > 0){
            return data.data.movies
            
        }

        throw new Error('No se encontro ningun resultado')
    }

    const $home = document.getElementById('home')
    const $featuringContainer = document.getElementById('featuring')

    //creacion de funcion para agregar atributos a un nuevo elemento creado en el html
    function setAttributes($element, attributes) {
        for (const attribute in attributes) {
          $element.setAttribute(attribute, attributes[attribute]);
        }
      }

    const BASE_URL = 'https://yts.am/api/v2/'

    function featuringTemplate(peli) {
       return (`<div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`)
    }

    const $form = document.getElementById('form')
    $form.addEventListener('submit', async (event) => {
        event.preventDefault()
        $home.classList.add('search-active')
        //creando elemento html y guardando en una constante
        const $loader = document.createElement('img');
        setAttributes($loader, {
            src: 'src/images/loader.gif',
            height: 50,
            width: 50,
        })
        $featuringContainer.append($loader);

        const data = new FormData($form)

        try {
            const peli = await getData(`${BASE_URL}list_movies.json?limit=1&query_term=${data.get('name')}`)
            const HTMLString = featuringTemplate(peli[0])
            $featuringContainer.innerHTML = HTMLString
            
        } catch (error) {
            alert(error.message)
            $loader.remove()
            $home.classList.remove('search-active')
        }
    })

    
    
    //console.log(actionList, dramaList, animationnList)
    
    const $actionContainer = document.getElementById('action')
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.getElementById('animation')
    
    function videoItemTemplate(movie, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
                <div class="primaryPlaylistItem-image">
                <img src="${movie.medium_cover_image}">
                </div>
                <h4 class="primaryPlaylistItem-title">
                ${movie.title}
                </h4>
                </div>`
                
        )
    }

    function addEventClick($element){
        $element.addEventListener('click', () => {
            //alert('click')
            showModal($element)
        })
    }

    function createTemplate(HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }
    
    function renderMovieList(movieList, $container, category){
        $container.children[0].remove()
        movieList.forEach(movie => {
            const htmlString = videoItemTemplate(movie, category)
            const movieElement = createTemplate(htmlString)
            $container.append(movieElement)
            const image = movieElement.querySelector('img')
            image.addEventListener('load', () => {
                image.classList.add('fadeIn')
                
            })
            //console.log(htmlString)
            addEventClick(movieElement)
        })
        // console.log($container.children)
        // console.log(movieList)
        
    }    
    
    const actionList = await getData(`${BASE_URL}list_movies.json?genre=action`)
    renderMovieList(actionList, $actionContainer, 'action')

    const dramaList = await getData(`${BASE_URL}list_movies.json?genre=drama`)
    renderMovieList(dramaList, $dramaContainer, 'drama')

    const animationList = await getData(`${BASE_URL}list_movies.json?genre=animation`)
    renderMovieList(animationList, $animationContainer, 'animation')
    
    
    
    
    
    //-------------------SELECTORES---------------------------------------///
    //-------------------SELECTORES---------------------------------------///
       
    
    

   // const $home = $('.home') //jquery method for id or class
    const $modal = document.getElementById('modal') //js method for id
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')

    function findById(list, id) {
        return list.find((element) => element.id === parseInt(id, 10))
    }
    function findMovie(id, category) {
        switch(category){
            case 'action':{
                return findById(actionList, id)

            }
            case 'drama':{
                return findById(dramaList, id)
            }
            default:{
                return findById(animationList, id)
            }
        }
    }

    function showModal($element){
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'

        const id = $element.dataset.id
        const category = $element.dataset.category
        const dataPeli = findMovie(id, category)
        
        $modalTitle.textContent = dataPeli.title
        $modalDescription.textContent = dataPeli.description_full
        $modalImage.setAttribute('src', dataPeli.medium_cover_image)

    }

    $hideModal.addEventListener('click', () => {
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    })

})()


