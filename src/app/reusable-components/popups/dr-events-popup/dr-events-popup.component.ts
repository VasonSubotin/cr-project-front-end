import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { PoliciesService } from '../../../services/policies.service';
import { Resource } from 'src/app/data/Resource';

@Component({
  selector: 'app-dr-events-popup',
  templateUrl: './dr-events-popup.component.html',
  styleUrls: ['./dr-events-popup.component.scss'],
})
export class DREventsPopupComponent implements OnInit {
  
  myGroup = new FormGroup({
 
    from: new FormControl(new Date()),
    to: new FormControl(new Date()),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public resource: Resource,
    private dialogRef: MatDialogRef<DREventsPopupComponent>,
    public fb: FormBuilder,
    public policiesService: PoliciesService
  ) {}


  ngOnInit(): void {
 
  }

  compareWithFunc = (a: any, b: any) => a == b;

  closeEvent() {
    this.dialogRef.close();
  }

  onSubmit() {

  }

  updateResource() {
    
  }
}
