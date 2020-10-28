import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MainComponent} from './main/main.component';
import {HighlighCardSliderComponent} from './main/highligh-card-slider/highligh-card-slider.component';
import {FooterComponent} from './footer/footer.component';
import {GalleryComponent} from './main/gallery/gallery.component';
import {BlogsComponent} from './main/blogs/blogs.component';
import {DonateComponent} from './main/donate/donate.component';
import {ContactComponent} from './main/contact/contact.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    HighlighCardSliderComponent,
    FooterComponent,
    GalleryComponent,
    BlogsComponent,
    DonateComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
