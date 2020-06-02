import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';
import { Comments } from '../interfaces/comments';




@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  id: string;
  post$: Observable<Post>;
  comments: Array<Comments> = [];
  get filteredComments() {
    return this.comments
      .filter(c => 
        this.commentSearchText == '' ||
        this.contains(c.name, this.commentSearchText) ||
        this.contains(c.email, this.commentSearchText) ||
        this.contains(c.body, this.commentSearchText)
    )
  }
  commentSearchText: string = '';
  constructor(private api: ApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.post$ = this.api.getPost(id)
    this.getComments(id);
  }

  ngOnInit() {
  }

  contains(str:string, serachText: string){
    return str.toLowerCase().indexOf(serachText.toLowerCase()) > -1
  }

  getComments(id: string) {
    return this.api.getComments(id)
      .pipe(first())
      .subscribe(comments => {
        this.comments = comments;
        this.commentSearchText = '';
      });
  }

}
