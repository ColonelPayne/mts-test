import {ChangeDetectorRef, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {IMovie} from "../interfaces/movie.interface";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  movies$: BehaviorSubject<IMovie[]> = new BehaviorSubject<IMovie[]>([]);

  constructor() { }

  getMovies(searchTerm: string = ''): Observable<IMovie[]> {
    return this.movies$.pipe(map((movies: IMovie[]) => movies.filter(r => r.name.includes(searchTerm))));
    // return this.movies$.asObservable();
  }

  addMovie(movie: IMovie) {
    let moviesList: IMovie[] = [];
    if (this.movies$.value) {
      const currentMovies = this.movies$.value; // Get the current array
      let maxValue = 0;
      const values = Object.values(currentMovies);
      values.map((el) => {
        const valueFromObject = el.id;
        maxValue = Math.max(maxValue, valueFromObject);
      });
      movie['id'] = maxValue + 1;
      moviesList = [...currentMovies, movie]; // Create a new array with the added item
    } else {
      moviesList = [movie];
    }

    this.movies$.next(moviesList);
  }

  updateMovie(movie: IMovie) {
    let moviesList: IMovie[] = [];
    if (this.movies$.value && movie) {
      let currentMovies = this.movies$.value;
      currentMovies = currentMovies.filter(item => item.id !== movie.id);
      moviesList = [...currentMovies, movie].sort((a, b) => a.id - b.id);
    }
    this.movies$.next(moviesList);
  }

  setAllMoviesOnline(): Observable<IMovie[]> {
    if (this.movies$.value) {
      let currentMovies = this.movies$.value;
      currentMovies.map(item => item.isOnline = true);
      this.movies$.next([...currentMovies]);
    }

    return this.movies$;
  }

}
