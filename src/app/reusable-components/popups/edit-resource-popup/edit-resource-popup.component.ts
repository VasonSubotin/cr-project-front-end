import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {AmazingTimePickerService} from "amazing-time-picker";
import {FunctionsService} from "../../../services/functions.service";
import {PoliciesService} from "../../../services/policies.service";
import { Resource } from 'src/app/data/Resource';

@Component({
  selector: 'app-edit-resource-popup',
  templateUrl: './edit-resource-popup.component.html',
  styleUrls: ['./edit-resource-popup.component.scss']
})
export class EditResourcePopupComponent implements OnInit {

  tosSwitcher = true;
  periodFrom = 0;
  duration = 0;
  isTous = false;
  defaultInputSwitcher = false;
  startAtInput = this.funcService.formattingTime(746);
  stopAtInput =  this.funcService.formattingTime(974);
  startAtInputMinutes = 0;
  stopAtInputMinutes = 0;

  myGroup = new FormGroup({
    duration: new FormControl(2),
    policy: new FormControl('0'),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public resource: Resource,
              private dialogRef: MatDialogRef<EditResourcePopupComponent>,
              public fb: FormBuilder,
              private authService: AuthService,
              private funcService: FunctionsService,
              private atp: AmazingTimePickerService,
              public policiesService: PoliciesService

  ) {
  
  }

  @ViewChild("pickerFrom", {static: false}) pickerFrom: ElementRef;
  @ViewChild("pickerTo", {static: false}) pickerTo: ElementRef;
  @ViewChild("pickerToInput", {static: false}) pickerToInput: ElementRef;
  @ViewChild("pickerFromInput", {static: false}) pickerFromInput: ElementRef;
  


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

    this.authService.getResourceDataById(this.resource.idResource).subscribe(((res: Resource) => {
      if (res) {
        console.log(res.policyId.toString());
        this.myGroup = new FormGroup({
          duration: new FormControl(res.policyId),
          policy: new FormControl((res.policyId + 1).toString()),
        });
      }
    }
  )
)

  }


  compareWithFunc = (a: any, b: any) => a == b;

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
    console.log(this.myGroup);
    this.updateResource();
    //this.updateTOU();
  }

  updateResource() {
let policy = this.myGroup.value.policy;
    if(policy) {
      this.resource.policyId = policy - 1;
    }
    
   // this.resource.chargeby_time = +this.duration;
    const body = this.resource;
    console.log(body);
    this.authService.updateResourceById(this.resource.idResource, body).subscribe((res: any) => {
      this.resource = res;
    });
    this.closeEvent();
  }
}
