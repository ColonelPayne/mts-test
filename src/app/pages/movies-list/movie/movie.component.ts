import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {IMovie} from "../../../interfaces/movie.interface";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {
  _movie: IMovie | null = null;
  @Input()
  set movie(val: IMovie) {
    if (this._movie !== val) {
      this.cdRef.markForCheck();
    }
    this._movie = val;
  }
  @Output() statusChange = new EventEmitter<IMovie>();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  setStatus(): void {
    if (this.movie) {
      this.statusChange.emit(this.movie);
    }

  }

}
