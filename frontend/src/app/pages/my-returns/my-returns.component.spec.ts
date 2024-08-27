import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReturnsComponent } from './my-returns.component';

describe('MyReturnsComponent', () => {
  let component: MyReturnsComponent;
  let fixture: ComponentFixture<MyReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyReturnsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
