import { Component, OnInit } from '@angular/core';
import { Co2Service } from 'src/app/services/co2.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

 
  constructor(  private co2: Co2Service) {
    

  }
  ngOnInit(): void {
    
    this.co2.getAllLast().subscribe(
        (datos) => {
           console.log(datos);
        }
    )

  }




}
