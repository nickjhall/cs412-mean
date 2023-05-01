import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { backendEndpoint } from "../../config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {
  }
  callAPI(year: string): Observable<any> | undefined {
    console.log('backend called')
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify({year: year})
    let movies = []
    return this.http.post(backendEndpoint.url+'/getPopularMoviesFromYear', body, {'headers': headers})
  }
}
