const apiKey: string ='6cdbf19796ab9dbbfd4a5c84db74bf59';
export const BaseIamgepath=(size:string, path:string)=>{
    return `https://image.tmdb.org/t/p/${size}${path}`

}

export const nowPlayingMovie: string =`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
export const uppcommingMovies: string =`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`
export const populorMovies: string =`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`

export const searchMovies=(keyword:string)=>{
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
}
export const MovieId=(id:number)=>{
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
}
export const MOviecastDetails=(id:number)=>{
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
}