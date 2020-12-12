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

  tou = {};
  tosSwitcher = true;
  periodFrom = 0;
  duration = 0;
  isTous = false;
  defaultInputSwitcher = false;

  myGroup =  new FormGroup({
    duration: new FormControl(0),
    policy: new FormControl('0'),
    from: new FormControl(new Date()),    
    to: new FormControl(new Date())
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
    this.authService.timeOfUse(this.resource.idResource).subscribe(((res: {start: number, stop: number}) => {
          if (res) {
            this.isTous = true;

            const start = res.start;
            const from = new Date();
            from.setHours(Math.floor(start / 60));
            from.setMinutes(start % 60);
            
            const stop = res.stop;
            const to = new Date();
            from.setHours(Math.floor(stop / 60));
            from.setMinutes(stop % 60);

            this.myGroup.controls["from"].setValue(from);
            this.myGroup.controls["to"].setValue(to);
            
   
          }
        }
      )
    )

    this.authService.getResourceDataById(this.resource.idResource).subscribe(((res: Resource) => {
      if (res) {
        console.log(res.policyId.toString());

          //this.myGroup.controls["duration"].setValue(res.policyId);
          this.myGroup.controls["policy"].setValue((res.policyId + 1).toString());
          if(res.chargeby_time) {
            this.myGroup.controls["duration"].setValue(res.chargeby_time);
          }

        
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
 

  closeEvent() {
    this.dialogRef.close();
  }

  updateTOU() {
    const start = this.myGroup.value.from.getHours() * 60 + this.myGroup.value.from.getMinutes();
    let stop = this.myGroup.value.to.getHours() * 60 + this.myGroup.value.to.getMinutes();

    if(stop < start) {
      stop = start;
    }

      this.authService.putTimeOfUse(this.resource.idResource, start, stop).subscribe((res) => {
        console.log(res)
      })

  }

  onSubmit() {
    console.log(this.myGroup);
    this.updateResource();
    this.updateTOU();
  }

  updateResource() {
let policy = this.myGroup.value.policy;
    if(policy) {
      this.resource.policyId = policy - 1;
    }
    if(this.myGroup.value.duration) {
      this.resource.chargeby_time = this.myGroup.value.duration;
    }

    const body = this.resource;

    this.authService.updateResourceById(this.resource.idResource, body).subscribe((res: any) => {
      this.resource = res;
    });
    this.closeEvent();
  }
}
