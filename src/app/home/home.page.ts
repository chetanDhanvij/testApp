import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  posts$: Observable<Array<Post>>;
  constructor(private api: ApiService) {
    this.posts$ = this.api.getPosts();
  }
}
