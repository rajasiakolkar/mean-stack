import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model'
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit
//,OnDestroy
{


  // posts = [
  //   { title: 'First Post', content: 'First Post\'s Content' },
  //   { title: 'Second Post', content: 'Second Post\'s Content' },
  //   { title: 'Third Post', content: 'Third Post\'s Content' },
  //   { title: 'Fourth Post', content: 'Fourth Post\'s Content' }
  // ]

  posts: Post[] =[];
  private postsSub: Subscription;
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10];
  userIsAuthenticated = false;
  userId: string
  private authStatusSub: Subscription;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  // ngOnDestroy(): void {
  //   this.postsSub.unsubscribe();
  //   this.authStatusSub.unsubscribe();
  // }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsService.getPostUpdateListener().subscribe(
      (postData: {posts: Post[], postCount: number} ) => {
        this.totalPosts = postData.postCount;
        this.isLoading = false;
        this.posts = postData.posts;
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onDelete(postId: string){
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onChangedPage (pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

}
