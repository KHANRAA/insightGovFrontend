import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageZoomerComponent } from './image-zoomer.component';

describe('ImageZoomerComponent', () => {
  let component: ImageZoomerComponent;
  let fixture: ComponentFixture<ImageZoomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageZoomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageZoomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
