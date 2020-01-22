import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
 
@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
 
  apikey:string;
  urlMoviedb:string;
  headers: HttpHeaders;

  peliculas:any[] = [];

  constructor( private http: HttpClient ) { 
    this.apikey = '07fb448cc1ac88b873bf55e19ec17865';
    this.urlMoviedb = 'https://api.themoviedb.org/3';
    this.headers = new HttpHeaders({
      'content-Type' : 'application/json'
    });
  }

  
  getCartelera(){

    let desde = new Date();
    let hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    let desdeStr = `${ desde.getFullYear()-1 }-${ desde.getMonth()+1 }-${ desde.getDate() }`;
    console.log(desdeStr);
    let hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth()+1 }-${ hasta.getDate() }`;
    console.log(hastaStr);

    // return this.http.get(`${this.urlMoviedb}/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${this.apikey}`, {headers: this.headers});
    return this.http.get(`${this.urlMoviedb}/discover/movie?region=AR&primary_release_date.gte=2019-09-15&primary_release_date.lte=2020-01-21&api_key=${this.apikey}`, {headers: this.headers});

  }
 
  getPopulares() {
    // return this.http.get(`${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}`, {headers: this.headers});

    return this.http.get(`${this.urlMoviedb}/discover/movie/?region=AR&certification=R&sort_by=vote_average.desc&api_key=${this.apikey}`, {headers: this.headers});
  }

  getPopularesNinos() {
    return this.http.get(`${this.urlMoviedb}/discover/movie/?region=AR&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}`, {headers: this.headers});
  }

  getPelicula( id:string ) {
    return this.http.get(`${this.urlMoviedb}/movie/${ id }?api_key=${this.apikey}`, {headers: this.headers});
  }

  buscarPelicula( texto:string ){
    return this.http.get(`${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }`, {headers: this.headers}).pipe(map(
      
      (res:any) =>
 
             { this.peliculas = res.results; }
        
          ));

   
  }

}
