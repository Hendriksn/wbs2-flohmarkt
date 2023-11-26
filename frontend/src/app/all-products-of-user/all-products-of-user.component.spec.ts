import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsOfUserComponent } from './all-products-of-user.component';

describe('AllProductsOfUserComponent', () => {
  let component: AllProductsOfUserComponent;
  let fixture: ComponentFixture<AllProductsOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProductsOfUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
