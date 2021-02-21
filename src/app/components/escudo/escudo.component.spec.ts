import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EscudoComponent } from './escudo.component';

describe('EscudoComponent', () => {
  let component: EscudoComponent;
  let fixture: ComponentFixture<EscudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscudoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EscudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
