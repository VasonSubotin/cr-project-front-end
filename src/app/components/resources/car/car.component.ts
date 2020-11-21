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

  @Output() resourceDelete  = new EventEmitter<number>();

  constructor(private router: Router, 
    public policiesService: PoliciesService) {}
 
  navigateByResource(idResource: string) {

    this.router.navigate([`/resource/${idResource}`]);
  }

  onDelete() {
      console.log(this.index);
    this.resourceDelete.emit(this.index);
  }
  
}
