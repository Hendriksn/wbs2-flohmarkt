import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteArticleComponent } from './favorite-article.component';

describe('FavoriteArticleComponent', () => {
  let component: FavoriteArticleComponent;
  let fixture: ComponentFixture<FavoriteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
