import {Component, OnInit} from '@angular/core';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  faEnvelopeOpenText = faEnvelopeOpenText;

  constructor() {
  }

  ngOnInit(): void {
  }

}
