import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPodcastsComponent } from './creator-podcasts.component';

describe('CreatorPodcastsComponent', () => {
  let component: CreatorPodcastsComponent;
  let fixture: ComponentFixture<CreatorPodcastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatorPodcastsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorPodcastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
