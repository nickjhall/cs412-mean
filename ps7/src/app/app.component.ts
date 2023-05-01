import { Component } from '@angular/core';
import { BackendService} from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Find the most popular movies in any year!';

  movies = []
  fromCache: boolean | undefined
  constructor(private backend: BackendService) {
  }
  getData(year: string) {
    this.backend.callAPI(year)?.subscribe(
      response => {
        let movieData = response['movieData']
        this.movies = movieData.results
        this.fromCache = response['fromCache']
      }
    )
  }
}
