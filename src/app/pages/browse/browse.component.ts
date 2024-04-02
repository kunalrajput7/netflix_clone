import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '../../core/components/header/header.component';
import { BannerComponent } from '../../core/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { MovieCarouselComponent } from '../../shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '../../shared/models/video-content.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MovieCarouselComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {

  auth = inject(AuthService);
  movieService = inject(MovieService)
  name = JSON.parse(sessionStorage.getItem("loggedInUser")!).name;
  userProfileImg = JSON.parse(sessionStorage.getItem("loggedInUser")!).picture;
  email = JSON.parse(sessionStorage.getItem("loggedInUser")!).email;

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  bannerDetail$!: Observable<any>;
  bannerVideo$!: Observable<any>;

  ngOnInit(): void {
    this.movieService.getMovies()
      .subscribe(res => {
        console.log(res);
        this.movies = res.results;
        // Once movies are fetched, we'll get banner and trailer details here
        this.bannerDetail$ = this.movieService.getBannerDetail(this.movies[0].id);
        this.bannerVideo$ = this.movieService.getBannerVideo(this.movies[0].id);
      });

    this.movieService.getTvShows()
      .subscribe(res => {
        console.log(res);
        this.tvShows = res.results;
      });

    this.movieService.getRatedMovies()
      .subscribe(res => {
        console.log(res);
        this.ratedMovies = res.results;
      });

    this.movieService.getNowPlayingMovies()
      .subscribe(res => {
        console.log(res);
        this.nowPlayingMovies = res.results;
      });

    this.movieService.getPopularMovies()
      .subscribe(res => {
        console.log(res);
        this.popularMovies = res.results;
      });

    this.movieService.getUpcomingMovies()
      .subscribe(res => {
        console.log(res);
        this.upcomingMovies = res.results;
      });

    this.movieService.getTopRated()
      .subscribe(res => {
        console.log(res);
        this.topRatedMovies = res.results;
      });
  }

  signOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
