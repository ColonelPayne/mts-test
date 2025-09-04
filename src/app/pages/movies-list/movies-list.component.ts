import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MoviesService} from "../../services/movies.service";
import {IMovie} from "../../interfaces/movie.interface";
import {debounceTime, Observable} from "rxjs";

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {

  searchForm = new FormGroup({
    term: new FormControl(''),
  });

  movieForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    isOnline: new FormControl(false),
  });

  movies$: Observable<IMovie[] | null> = new Observable<IMovie[] | null>();

  constructor(private movieService: MoviesService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.showAllMovies();
    this.searchForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
      value => {
        if (value.term && value.term.length >= 3) {
          this.movies$ = this.movieService.getMovies(value.term.trim());
        } else {
          this.showAllMovies();
        }
      }
    )
  }

  showAllMovies(): void {
    this.movies$ = this.movieService.getMovies('');
  }

  addMovie(): void {
    const addedMovie: IMovie = this.movieForm.value as IMovie;
    this.movieService.addMovie(addedMovie);
    this.movieForm.reset();
  }

  changeMovie(movie: IMovie): void {
    this.movieService.updateMovie(movie);
  }

  setAllMoviesOnline(): void {
    this.movies$ = this.movieService.setAllMoviesOnline()
  }

  trackById(index: number, item: IMovie): number {
    return item.id;
  }

}
