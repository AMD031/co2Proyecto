import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginPage } from './pages/login/login.page';
// import { HomePage } from './pages/home/home.page';
// import { GraficaPage } from './pages/grafica/grafica.page';
// import { DetallesPage } from './pages/detalles/detalles.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Co2Service } from './services/co2.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    // HomePage,
    // GraficaPage,
    // DetallesPage,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
export class AppModule {}
