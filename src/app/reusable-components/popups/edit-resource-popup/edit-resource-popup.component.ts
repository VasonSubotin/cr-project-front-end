import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-edit-resource-popup',
  templateUrl: './edit-resource-popup.component.html',
})
export class EditResourcePopupComponent {
  idResource;
  policyId;
  selectPolicy;
  tosSwitcher = true;

  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<EditResourcePopupComponent>,
              public fb: FormBuilder,
              private authService: AuthService
  ) {
   // this.selectPolicy = this.policyForSelect[resource.policyId].name
  }

  @ViewChild("pickerFrom", {static: false}) pickerFrom: ElementRef;
  policyForSelect: any = [
    {value: 0, name: 'green policy. (optimized to CO2 marginal emission)'},
    {value: 1, name: 'monetary policy (optimized to energy market pricing)'},
    {value: 2, name: 'simple policy (charge as fast as possible)'}
  ];
  startAt = new Date(20, 30);
  useTos(){
    console.log(this.pickerFrom)
    this.tosSwitcher = !this.tosSwitcher;
  }
  eventChange(qwe) {
    console.log(qwe)

  }

  onChange(policyId) {
    this.policyId = policyId
    console.log(policyId)
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    /*
        this.events.push(`${type}: ${event.value}`);
    */
    console.log(event.value)
  }
  closeEvent() {
    this.dialogRef.close();
  }
  onSubmit() {
    this.updateResource(this.policyId);
  }

  updateResource(policyId) {
    this.selectPolicy = this.policyForSelect[policyId].name;
    this.resource.policyId = +policyId;
    const body = this.resource;
    this.authService.updateResourceById(this.idResource, body).subscribe((res: any) => {
      this.resource = res;
    })
    this.closeEvent();
  }
}
