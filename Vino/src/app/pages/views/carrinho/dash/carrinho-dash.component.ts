import { Component, OnInit, ViewChild } from '@angular/core';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-carrinho-dash',
  templateUrl: './carrinho-dash.component.html',
  styleUrls: ['./carrinho-dash.component.scss']
})
export class CarrinhoDashComponent implements OnInit {

  @ViewChild('stepper') private myStepper: MatHorizontalStepper;
  public h_step;
  public load: boolean;

  constructor() {
    //this.load = true;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.h_step = this.myStepper
  }
}
