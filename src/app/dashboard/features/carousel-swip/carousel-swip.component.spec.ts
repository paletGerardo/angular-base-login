import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSwipComponent } from './carousel-swip.component';

describe('CarouselSwipComponent', () => {
  let component: CarouselSwipComponent;
  let fixture: ComponentFixture<CarouselSwipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselSwipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselSwipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
