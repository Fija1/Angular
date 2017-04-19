"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var movie_service_1 = require("./movie.service");
var MovieListComponent = (function () {
    function MovieListComponent(_movieService, http) {
        this._movieService = _movieService;
        this.http = http;
        this.pageTitle = 'Movie List';
        this.showDetails = true;
    }
    MovieListComponent.prototype.toggleDetails = function () {
        this.showDetails = !this.showDetails;
    };
    MovieListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._movieService.getMovies()
            .subscribe(function (movies) { return _this.movies = movies; }, function (error) { return _this.errorMessage = error; });
    };
    MovieListComponent.prototype.AddMovie = function () {
        var _this = this;
        console.log("AddMovie");
        // console.log(this.movieActors); // maak een array van alle data
        //Alles toevoegen aan een json body
        this.formData = {
            "title": this.movieTitle,
            "actors": this.movieActors,
            "genre": this.movieGenre
        };
        console.log(this.formData);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post('http://localhost:8000/api/movies', this.formData, headers)
            .subscribe(function (res) {
            alert('Je hebt een film toegevoegd!');
            //Push naar array
            _this.movies.push(JSON.parse(res._body));
        }, function (error) { return _this.errorMessage = error; });
    };
    ;
    MovieListComponent.prototype.EditMovie = function () {
        var _this = this;
        //Alles toevoegen aan een json body, zoek id voor juiste film
        this.formData = {
            "title": this.movieTitle,
            "actors": this.movieActors,
            "genre": this.movieGenre
        };
        var id = this.movieId;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //http
        this.http.patch('http://localhost:8000/api/movies/' + id, this.formData, headers)
            .subscribe(function (res) {
            var arrayIndex;
            for (var i = 0; i < _this.movies.length; i++) {
                if (_this.movies[i]._id === id) {
                    arrayIndex = i;
                }
            }
            _this.movies[arrayIndex] = JSON.parse(res._body);
            console.log(res);
        }, function (error) { return _this.errorMessage = error; });
    };
    ;
    MovieListComponent.prototype.DeleteMovie = function () {
        var _this = this;
        //id
        var id = this.movieId;
        //zend delete
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        //http
        this.http.delete('http://localhost:8000/api/movies/' + id, headers)
            .subscribe(function () {
            _this.DeleteFromArray(id);
        });
        alert('Je hebt een film verwijderd!');
    };
    ;
    MovieListComponent.prototype.DeleteFromArray = function (id) {
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
    ;
    return MovieListComponent;
}());
MovieListComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/movies/movie-list.component.html',
        styleUrls: ['app/movies/movie-list.component.css']
    }),
    __metadata("design:paramtypes", [movie_service_1.MovieService, http_1.Http])
], MovieListComponent);
exports.MovieListComponent = MovieListComponent;
//# sourceMappingURL=movie-list.component.js.map