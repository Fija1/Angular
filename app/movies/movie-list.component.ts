import {Component, OnInit}  from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {IMovie} from './movie';
import {MovieService} from './movie.service';

@Component({
    templateUrl: 'app/movies/movie-list.component.html',
    styleUrls: ['app/movies/movie-list.component.css']
})

export class MovieListComponent implements OnInit {
    pageTitle:string = 'Movie List';
    showDetails:boolean = true;
    listFilter:string;
    errorMessage:string;

    movies:IMovie[];
    movieTitle:string;
    movieActors:string;
    movieGenre:string;
    movieId:any;

    formData:Object; //maak een object van alle data


    constructor(private _movieService:MovieService, private http:Http) {
    }

    toggleDetails():void {
        this.showDetails = !this.showDetails;
    }

    ngOnInit():void {
        this._movieService.getMovies()
            .subscribe(movies => this.movies = movies,
                error => this.errorMessage = <any>error);
    }

    AddMovie() {
        console.log("AddMovie");

        // console.log(this.movieActors); // maak een array van alle data
        //Alles toevoegen aan een json body

        this.formData = {
            "title": this.movieTitle,
            "actors": this.movieActors,
            "genre": this.movieGenre
        };

        console.log(this.formData);

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post('http://localhost:8000/api/movies', this.formData, headers)
            //gebruik subscribe

            .subscribe(
                (res:any) => {
                    alert('Je hebt een film toegevoegd!');
                    //Push naar array
                    this.movies.push(JSON.parse(res._body))
                },
                error => this.errorMessage = <any>error
            );

    };

    EditMovie() {
        //Alles toevoegen aan een json body, zoek id voor juiste film
        this.formData = {
            "title": this.movieTitle,
            "actors": this.movieActors,
            "genre": this.movieGenre
        };

        var id = this.movieId;

        const headers = new Headers();

        headers.append('Content-Type', 'application/json');
        //http
        this.http.patch('http://localhost:8000/api/movies/' + id, this.formData, headers)
            //gebruik subscribe
            .subscribe(
                (res:any) => {
                    var arrayIndex;
                    for (var i = 0; i < this.movies.length; i++) {
                        if (this.movies[i]._id === id) {
                            arrayIndex = i;
                        }
                    }
                    this.movies[arrayIndex] = JSON.parse(res._body);
                    console.log(res);

                },
                error => this.errorMessage = <any>error
            );
    };

    DeleteMovie() {
        //id
        var id = this.movieId;

        //zend delete
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //http
        this.http.delete('http://localhost:8000/api/movies/' + id, headers)
            .subscribe(
                () => {
                    this.DeleteFromArray(id);
                };
        alert('Je hebt een film verwijderd!');
    };

    DeleteFromArray(id:String) {
        var arrayIndex;
        // zoek hetzelfde id in een for loop
        for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i]._id === id) {
                arrayIndex = i;
            }
        }

        //verwijder als er een id is gevonden met hetzelfde id
        this.movies.splice(arrayIndex, 1);
        //DELETE ALL VALUES
        this.movieId = "";
    };

}
