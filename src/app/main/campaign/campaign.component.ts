import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  openCard() {
    // tslint:disable-next-line:typedef
    $('[data-card]').on('click', function() {
      $(this).toggleClass('card--open');
    });
  }

}
