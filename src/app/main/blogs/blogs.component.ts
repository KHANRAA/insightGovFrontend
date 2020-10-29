import { Component, OnInit } from '@angular/core';
import { BlogModel } from './blog.model';
import { faHeart, faShare, faUser, faStar, faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  faHeart = faHeart;
  faShare = faShare;
  faUser = faUser;
  faStar = faStar;
  faCalendar = faCalendar;
  blogs: BlogModel[] = [
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
    new BlogModel(1, 'First Blog', 'This is my first blog', 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
      Date.now().toString(), 30, 'Akash Khanra', true),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
