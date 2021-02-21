import { Component, Input, OnInit } from '@angular/core';
import { UtilesService } from 'src/app/services/utiles.service';

@Component({
  selector: 'app-escudo',
  templateUrl: './escudo.component.html',
  styleUrls: ['./escudo.component.scss'],
})
export class EscudoComponent implements OnInit {

  @Input('titulo') titulo:string = ''

  constructor() { }

  ngOnInit() {


  }

  


}
