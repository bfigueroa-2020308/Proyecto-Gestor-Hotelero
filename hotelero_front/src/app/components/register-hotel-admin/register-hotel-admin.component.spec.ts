import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHotelAdminComponent } from './register-hotel-admin.component';

describe('RegisterHotelAdminComponent', () => {
  let component: RegisterHotelAdminComponent;
  let fixture: ComponentFixture<RegisterHotelAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterHotelAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHotelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
