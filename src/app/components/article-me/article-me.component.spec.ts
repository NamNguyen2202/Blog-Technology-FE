import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleMeComponent } from './article-me.component';

describe('ArticleMeComponent', () => {
  let component: ArticleMeComponent;
  let fixture: ComponentFixture<ArticleMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArticleMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
