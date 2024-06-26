import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAllComponent } from './article-all.component';

describe('ArticleAllComponent', () => {
  let component: ArticleAllComponent;
  let fixture: ComponentFixture<ArticleAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
