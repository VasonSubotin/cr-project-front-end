import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PoliciesService } from '../../../services/policies.service';
import { Resource } from 'src/app/data/Resource';

@Component({
  selector: 'app-dr-events-popup',
  templateUrl: './dr-events-popup.component.html',
  styleUrls: ['./dr-events-popup.component.scss'],
})
export class DREventsPopupComponent implements OnInit {
  
  myGroup: FormGroup;
 
 
 

  constructor(
    @Inject(MAT_DIALOG_DATA) public resource: Resource,
    private dialogRef: MatDialogRef<DREventsPopupComponent>,
    public fb: FormBuilder,
    public policiesService: PoliciesService,
    public authService: AuthService
  ) {
    this.myGroup =  this.fb.group({
      events: this.fb.array([]) ,
    });
  }


  ngOnInit(): void {
 
    this.authService
    .getDrEventsById(this.resource.idResource)
    .subscribe((res: [{ start: number; stop: number, active: boolean }]) => {
      if (res) {
        res.forEach(event => {
          const start = event.start;
          const from = new Date();
          from.setHours(Math.floor(event.start / 60));
          from.setMinutes(start % 60);
  
          const stop = event.stop;
          const to = new Date();
          to.setHours(Math.floor(stop / 60));
          to.setMinutes(stop % 60);

          this.events.push(this.fb.group({
            to,
            from
          }));

        })
     

    
      }
    });

  }

  compareWithFunc = (a: any, b: any) => a == b;

  closeEvent() {
    this.dialogRef.close();
  }
  get events() : FormArray {
    return this.myGroup.get("events") as FormArray
  }
  

  onSubmit() {
    console.log("submit");
    const body = this.myGroup.value.events.map(event => {
      console.log(event);
      const start =
      event.from.getHours() * 60 +
      event.from.getMinutes();
    let stop =
      event.to.getHours() * 60 +
    event.to.getMinutes();

    if (stop < start) {
      stop = start;
    }

      return {
from: start, to: stop
      } 
    });

    this.authService
      .postDrEventsById(this.resource.idResource, body)
      .subscribe((res: any) => {
       
      });
    this.closeEvent();
  }

  newEvent(): FormGroup {
    return this.fb.group({
      to: "",
      from: ""
    })
 }


 
removeEvent(i:number) {
  this.events.removeAt(i);
}
 

 addEvents() {
  this.events.push(this.newEvent());
}


}
