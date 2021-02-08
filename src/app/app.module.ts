import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { GraficaPage } from './pages/grafica/grafica.page';
import { DetallesPage } from './pages/detalles/detalles.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Co2Service } from './services/co2.service';

import { VistagraficaComponent } from './components/vistagrafica/vistagrafica.component';



import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { effectsArr } from '../store/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from 'src/store/app.reducer';

import { environment } from '../environments/environment';



import { AppRoutingModule } from './app-routing.module';
import { BotonAtrasComponent } from './components/boton-atras/boton-atras.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    HomePage,
    GraficaPage,
    DetallesPage,
    VistagraficaComponent,
    BotonAtrasComponent,
  ],
  entryComponents: [GraficaPage, DetallesPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot(effectsArr),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Co2Service,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
