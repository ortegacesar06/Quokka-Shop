import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMenssageComponent } from './control-menssage.component';

describe('ControlMenssageComponent', () => {
  let component: ControlMenssageComponent;
  let fixture: ComponentFixture<ControlMenssageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlMenssageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMenssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
