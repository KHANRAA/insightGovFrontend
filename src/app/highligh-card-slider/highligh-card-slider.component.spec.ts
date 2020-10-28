import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlighCardSliderComponent } from './highligh-card-slider.component';

describe('HighlighCardSliderComponent', () => {
  let component: HighlighCardSliderComponent;
  let fixture: ComponentFixture<HighlighCardSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighlighCardSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlighCardSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
