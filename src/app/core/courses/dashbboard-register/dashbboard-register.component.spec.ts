import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbboardRegisterComponent } from './dashbboard-register.component';

describe('DashbboardRegisterComponent', () => {
  let component: DashbboardRegisterComponent;
  let fixture: ComponentFixture<DashbboardRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbboardRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbboardRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
