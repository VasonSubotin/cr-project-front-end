import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {AmazingTimePickerService} from "amazing-time-picker";
import {FunctionsService} from "../../../services/functions.service";
import {PoliciesService} from "../../../services/policies.service";

@Component({
  selector: 'app-edit-resource-popup',
  templateUrl: './edit-resource-popup.component.html',
})
export class EditResourcePopupComponent implements OnInit {
  idResource;
  policyId: string;
  selectPolicy;
  tosSwitcher = true;
  periodFrom = 0;
  duration = 0;
  isTous = false;
  defaultInputSwitcher = false;
  startAtInput = this.funcService.formattingTime(746);
  stopAtInput =  this.funcService.formattingTime(974);
  startAtInputMinutes = 0;
  stopAtInputMinutes = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public resource,
              private dialogRef: MatDialogRef<EditResourcePopupComponent>,
              public fb: FormBuilder,
              private authService: AuthService,
              private funcService: FunctionsService,
              private atp: AmazingTimePickerService,
              public policiesService: PoliciesService

  ) {
    if(resource.policyId) {
      this.selectPolicy = this.policyForSelect[resource.policyId]?.name || "";
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

            this.startAtInput = this.funcService.formattingTime(res.start);
            this.stopAtInput =  this.funcService.formattingTime(res.stop);
          }
        }
      )
    )

  }
  openDuration() {
    const durationTimePicker = this.atp.open();
    durationTimePicker.afterClose().subscribe(time => {
      const a = time.split(":");
      const startTime = parseInt(a[0]) * 60 + parseInt(a[1]);
      this.duration = startTime;
    });
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

  closeEvent() {
    this.dialogRef.close();
  }

  updateTOU() {
    if (this.isTous) {
      this.authService.putTimeOfUse(this.resource.idResource, this.startAtInputMinutes, this.stopAtInputMinutes).subscribe((res) => {
        console.log(res)
      })
    } else {
      this.authService.postTimeOfUse(this.resource.idResource, this.startAtInputMinutes, this.stopAtInputMinutes).subscribe((res) => {
        console.log(res)
      })
    }

  }

  onSubmit() {
    this.updateResource(this.policyId);
    this.updateTOU();
  }

  updateResource(policyId) {

   this.selectPolicy = this.policyForSelect[policyId || this.resource.policyId].name;
    this.resource.policyId = +policyId || this.resource.policyId;
    this.resource.chargeby_time = +this.duration;
    const body = this.resource;
    this.authService.updateResourceById(this.resource.idResource, body).subscribe((res: any) => {
      this.resource = res;
    });
    this.closeEvent();
  }
}
