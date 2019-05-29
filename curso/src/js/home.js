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
        return data.data.movies
    }

    const $home = document.getElementById('home')
    const $featuringContainer = document.getElementById('featuring')

    //creacion de funcion para agregar atributos a un nuevo elemento creado en el html
    function setAttributes($element, attributes) {
        for (const attribute in attributes) {
          $element.setAttribute(attribute, attributes[attribute]);
        }
      }

    const $form = document.getElementById('form')
    $form.addEventListener('submit', (event) => {
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
    })

    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    //console.log(actionList, dramaList, animationnList)
    
    const $actionContainer = document.getElementById('action')
    const $dramaContainer = document.getElementById('drama')
    const $animationContainer = document.getElementById('animation')

    function videoItemTemplate(movie) {
        return (
            `<div class="primaryPlaylistItem">
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
            showModal()
        })
    }

    function renderMovieList(movieList, $container){
        $container.children[0].remove()
        movieList.forEach(element => {
            const htmlString = videoItemTemplate(element)
            $container.innerHTML += htmlString              
            //console.log(htmlString)
        })
        // console.log($container.children)
        // console.log(movieList)

       for(children of $container.children){
           addEventClick(children)
       }
    }    

    renderMovieList(actionList, $actionContainer)
    renderMovieList(dramaList, $dramaContainer)
    renderMovieList(animationList, $animationContainer)
    
    
    
    
    
    //-------------------SELECTORES---------------------------------------///
    //-------------------SELECTORES---------------------------------------///
       
    
    

   // const $home = $('.home') //jquery method for id or class
    const $modal = document.getElementById('modal') //js method for id
    const $overlay = document.getElementById('overlay')
    const $hideModal = document.getElementById('hide-modal')

    const $modalTitle = $modal.querySelector('h1')
    const $modalImage = $modal.querySelector('img')
    const $modalDescription = $modal.querySelector('p')

    function showModal(){
        $overlay.classList.add('active')
        $modal.style.animation = 'modalIn .8s forwards'
    }

    $hideModal.addEventListener('click', () => {
        $overlay.classList.remove('active')
        $modal.style.animation = 'modalOut .8s forwards'
    })

})()


