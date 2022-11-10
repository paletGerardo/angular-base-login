import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipCarouselComponent } from './swip-carousel.component';

describe('SwipCarouselComponent', () => {
  let component: SwipCarouselComponent;
  let fixture: ComponentFixture<SwipCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwipCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwipCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
