import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegretButtonComponent } from './regret-button.component';

describe('RegretButtonComponent', () => {
  let component: RegretButtonComponent;
  let fixture: ComponentFixture<RegretButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegretButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegretButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
