import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { movies } from 'src/app/models/movies.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';


@Component({
  selector: 'app-viewmovie',
  templateUrl: './viewmovie.component.html',
  styleUrls: ['./viewmovie.component.css']
})
export class ViewmovieComponent {
  movie!:movies;
  leoposter:string="assets/images/vijay-leo-movie-stills-hd-wallpapers-1200px-4288182.jpg"

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute, private movieservice: MovieserviceService) {
  
    this.movie=data.row
  }
 
}
