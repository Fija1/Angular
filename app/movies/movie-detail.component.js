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
var router_1 = require("@angular/router");
var movie_service_1 = require("./movie.service");
var MovieDetailComponent = (function () {
    function MovieDetailComponent(_route, _router, _movieService) {
        this._route = _route;
        this._router = _router;
        this._movieService = _movieService;
        this.pageTitle = 'Movie Detail';
    }
    MovieDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._route.params.subscribe(function (params) {
            var id = params['id'];
            _this.getMovie(id);
        });
    };
    MovieDetailComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    MovieDetailComponent.prototype.getMovie = function (id) {
        var _this = this;
        this._movieService.getMovie(id).subscribe(function (movie) { return _this.movie = movie; }, function (error) { return _this.errorMessage = error; });
    };
    MovieDetailComponent.prototype.onBack = function () {
        this._router.navigate(['/movies']);
    };
    MovieDetailComponent.prototype.onRatingClicked = function (message) {
        this.pageTitle = 'Movie Detail: ' + message;
    };
    return MovieDetailComponent;
}());
MovieDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/movies/movie-detail.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        movie_service_1.MovieService])
], MovieDetailComponent);
exports.MovieDetailComponent = MovieDetailComponent;
//# sourceMappingURL=movie-detail.component.js.map