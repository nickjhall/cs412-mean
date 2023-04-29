import { Component } from '@angular/core';
import data from '../assets/popularMovies.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ps6';
  movies: any = []

  getData() {
    this.movies = data.results//= data.results;
  }
}
