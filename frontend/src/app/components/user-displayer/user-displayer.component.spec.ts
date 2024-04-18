import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDisplayerComponent } from './user-displayer.component';

describe('UserDisplayerComponent', () => {
  let component: UserDisplayerComponent;
  let fixture: ComponentFixture<UserDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDisplayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
