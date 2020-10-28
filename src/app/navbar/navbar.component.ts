import {Component, OnInit} from '@angular/core';
import {faCoffee, faDonate, faArrowDown, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faCoffee = faCoffee;
  faDonate = faDonate;
  faArrowDown = faArrowDown;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
  }

}
