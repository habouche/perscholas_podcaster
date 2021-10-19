import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorEpisodesComponent } from './creator-episodes.component';

describe('CreatorEpisodesComponent', () => {
  let component: CreatorEpisodesComponent;
  let fixture: ComponentFixture<CreatorEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorEpisodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
