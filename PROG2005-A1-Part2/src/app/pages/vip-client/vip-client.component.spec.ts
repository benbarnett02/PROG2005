import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipClientComponent } from './vip-client.component';

describe('VipClientComponent', () => {
  let component: VipClientComponent;
  let fixture: ComponentFixture<VipClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VipClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VipClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
