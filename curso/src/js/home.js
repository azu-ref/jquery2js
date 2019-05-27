//method for jquery
$.ajax( 'https://randomuser.me/api/', {
    method: 'GET',
    success: function(data) {
        console.log(data)
    },
    error: function(error) {
        console.log(error)
    }
})

//method for vanilla js
fetch('https://randomuser.me/api/sdfsdfsdf')
    .then( function (response) {
        //console.log(response)
        return response.json()
    })
    .then(function (data) {
        console.log('user: ', data.results[0].name.first)
    })
    .catch(function (error){
        console.log(`Algo fallo: ${error}`)
    });


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

    const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
    const animationnList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
    console.log(actionList, dramaList, animationnList)
})()

