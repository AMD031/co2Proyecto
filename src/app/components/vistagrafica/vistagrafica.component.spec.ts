import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistagraficaComponent } from './vistagrafica.component';

describe('VistagraficaComponent', () => {
  let component: VistagraficaComponent;
  let fixture: ComponentFixture<VistagraficaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistagraficaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistagraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
