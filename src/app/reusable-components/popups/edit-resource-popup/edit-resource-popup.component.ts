import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {AmazingTimePickerService} from "amazing-time-picker";

@Component({
  selector: 'app-edit-resource-popup',
  templateUrl: './edit-resource-popup.component.html',
})
export class EditResourcePopupComponent implements OnInit {
  idResource;
  policyId;
  selectPolicy;
  tosSwitcher = true;
  periodFrom = 0;
  periodTo = 0;
  isTous = false;
  defaultInputSwitcher = false;
  startAtInput = 1080;
  stopAtInput = 1440;
  startAtInputMinutes = 0;
  stopAtInputMinutes = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<EditResourcePopupComponent>,
              public fb: FormBuilder,
              private authService: AuthService,
  ) {
    if(resource.policyId) {
      this.selectPolicy = this.policyForSelect[resource.policyId].name
    }
  }

  @ViewChild("pickerFrom", {static: false}) pickerFrom: ElementRef;
  @ViewChild("pickerTo", {static: false}) pickerTo: ElementRef;
  @ViewChild("pickerToInput", {static: false}) pickerToInput: ElementRef;
  @ViewChild("pickerFromInput", {static: false}) pickerFromInput: ElementRef;
  policyForSelect: any = [
    {value: 0, name: 'green policy. (optimized to CO2 marginal emission)'},
    {value: 1, name: 'monetary policy (optimized to energy market pricing)'},
    {value: 2, name: 'simple policy (charge as fast as possible)'}
  ];

  ngOnInit(): void {
    this.authService.timeOfUse(this.resource.idResource).subscribe(((res: any) => {
          if (res) {
            this.isTous = true;
/*
            this.startAtInput = res.start;
*/
          //  this.startAtInput = 1080;

            this.stopAtInput = res.stop;
            this.pickerFrom.nativeElement.target.value = res.start;
            this.pickerFrom.nativeElement.target.value = res.stop;
          }
        }
      )
    )

  }

  useTos() {
    this.tosSwitcher = !this.tosSwitcher;
  }
  startAtInputChanged (event) {
    this.startAtInputMinutes = event
  }
  stopAtInputChanged (event) {
    this.stopAtInputMinutes = event
  }

  onChange(policyId) {
    this.policyId = policyId;
  }

  changeDuration(data) {
    let date = new Date(data.value);
    this.resource.chargeby_time = (date.getHours() * 60) + date.getMinutes();
  }

  closeEvent() {
    this.dialogRef.close();
  }

  updateTOU() {
    if (this.isTous) {
      this.authService.putTimeOfUse(this.resource.idResource, this.periodFrom, this.periodTo).subscribe((res) => {
        console.log(res)
      })
    } else {
      this.authService.postTimeOfUse(this.resource.idResource, this.periodFrom, this.periodTo).subscribe((res) => {
        console.log(res)
      })
    }

  }

  onSubmit() {
    this.updateResource(this.policyId);
    this.updateTOU();
  }

  updateResource(policyId) {
    console.log(this.startAtInput);
    console.log(this.stopAtInput);
/*    this.selectPolicy = this.policyForSelect[policyId || this.resource.policyId].name;
    this.resource.policyId = +policyId || this.resource.policyId;
    const body = this.resource;
    this.authService.updateResourceById(this.resource.idResource, body).subscribe((res: any) => {
      this.resource = res;
    });
    this.closeEvent();*/
  }
}
