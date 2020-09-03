import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AmazingTimePickerService} from "amazing-time-picker";


@Component({
  selector: 'app-time-stop',
  template: ' <input class="input-system" type="text" (click)="openInputTimeTo()"  [value]=stopAtInput>',
})
export class setTimeStopComponent {
  @Input() stopAtInput;
  @Output() stopAtInputChanged = new EventEmitter<any>();

  constructor(
    private atp: AmazingTimePickerService
  ) {
  }

  openInputTimeTo() {
    const amazingTimeToPicker = this.atp.open({
      time: this.stopAtInput
    });
    amazingTimeToPicker.afterClose().subscribe(time => {
      this.stopAtInput = time;
      const a = time.split(":");
      const stopTime = parseInt(a[0]) * 60 + parseInt(a[1]);
      this.stopAtInputChanged.emit(stopTime);
      console.log(stopTime)
    });
  }
}
