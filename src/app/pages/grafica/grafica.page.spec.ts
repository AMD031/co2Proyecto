import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GraficaPage } from './grafica.page';

describe('GraficaPage', () => {
  let component: GraficaPage;
  let fixture: ComponentFixture<GraficaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GraficaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
