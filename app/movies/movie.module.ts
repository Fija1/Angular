import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailGuard } from './movie-guard.service';

import { MovieFilterPipe } from './movie-filter.pipe';
import { MovieService } from './movie.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      { path: 'movies/movie/:id',
        canActivate: [ MovieDetailGuard],
        component: MovieDetailComponent
      }
    ])
  ],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieFilterPipe
  ],
  providers: [
    MovieService,
    MovieDetailGuard
  ]
})
export class MovieModule {}
