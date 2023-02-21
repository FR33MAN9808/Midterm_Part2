const APIKEY = "6178b3bd1079d7544756f5cfe1885656"
const genres = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'}
];

let movieData;
const fetchMovies = async () => {
    try {
        return await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`)
    } catch (error) {
        console.log("Error occur", error)
    }
}

async function getData() {
    const {data} = await fetchMovies();
    let movieResult = data["results"];
    movieData = movieResult.map((movieObject) => {
        return{
            imageURL: movieObject.poster_path,
            title: movieObject.name || movieObject.title,
            releasedYear: movieObject.first_air_date || movieObject.release_date,
            description: movieObject.overview,
            genre: movieObject.genre_ids
        }
    });
    generateUI(movieData);
}

function getGenre(genreArray){
    for (let i = 0; i < genreArray.length; i++) {
        for (let j = 0; j < genres.length; j++) {
            if(genreArray[i] == genres[j].id){
                genreArray[i] = genres[j].name;
            }
            
        }
        
    }
}

const generateUI = (movieArray) => {
    let movieSection = document.getElementById('movie-section');
    movieSection.innerHTML = "";

    movieArray.forEach((movieObject) => {
        getGenre(movieObject.genre)
        let movieSection = document.getElementById('movie-section');
        let movieContainer = document.createElement('div');
        movieSection.appendChild(movieContainer);
        movieContainer.innerHTML = `
        <img src=https://image.tmdb.org/t/p/w300/${movieObject.imageURL}>
        <h1>${movieObject.title}</h1>
        <time>Released at: ${movieObject.releasedYear}</time>
        <p>Genre: ${movieObject.genre}</p>
        <p>${movieObject.description}</p>
        `
    });
}

const fetchMovieByKeyword = async () => {

    const keyword = document.getElementById('searched-keyword');

    try {
        console.log(keyword.value)
        return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${keyword.value}&page=1&include_adult=false`);
    } catch(error) {
        console.log(error);
        alert("There was an error", error);
    }
}

async function getMovieDataByKeyword() {
    const { data } = await fetchMovieByKeyword();

    let movieResult = data["results"];
    movieData = movieResult.map((movieObject) => {
        return{
            imageURL: movieObject.poster_path,
            title: movieObject.name || movieObject.title,
            releasedYear: movieObject.first_air_date || movieObject.release_date,
            description: movieObject.overview,
            genre: movieObject.genre_ids
        }
    });
    console.log(movieData,"searched")
    generateUI(movieData);
}

getData();