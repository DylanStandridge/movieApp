
export interface MovieDetailResponse {
    items: MovieDetails,
    error: Error | null
}
export interface MovieDetails {
    id: string,
    title: string,
    originalTitle: string,
    fullTitle: string,
    type: string,
    year: string,
    image:string,
    releaseDate:string,
    runtimeMins: string,
    runtimeStr: string,
    plot: string,
    plotLocal:string,
    plotLocalIsRtl: false,
    awards: string,
    contentRating: string,
    genres: '',
    boxOffice: BoxOffice,
    stars: string,
    writers: string,
    directors: string,
}

export interface GenreObject {
    value: string
}
export interface BoxOffice {
    budget: string,
    openingWeekendUSA: string,
    grossUSA: string,
    cumulativeWorldwideGross: string,
  }