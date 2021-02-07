import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BotonAtrasComponent } from './boton-atras.component';

describe('BotonAtrasComponent', () => {
  let component: BotonAtrasComponent;
  let fixture: ComponentFixture<BotonAtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonAtrasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BotonAtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
