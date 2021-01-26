import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  Router } from '@angular/router';
import { PoliciesService } from 'src/app/services/policies.service';

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent {

  @Input() resource: any;
  @Input() index: number;
  @Input() policyName?: string;

  @Output() resourceDelete  = new EventEmitter<number>();

  constructor(private router: Router) {}
 
  navigateByResource(idResource: string) {

    this.router.navigate([`/resource/${idResource}`]);
  }

  onDelete() {
    this.resourceDelete.emit(this.index);
  }

  round(soc: number) {
    return Math.round(soc * 100)
  }

  image() {
    return this.resource.smResource?.imagePath ? `https://chargeevnow.com:8443/${this.resource.smResource?.imagePath}` : `../../../assets/imgs/cars.png`;
  }
  
}
