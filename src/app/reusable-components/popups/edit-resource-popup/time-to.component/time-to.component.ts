import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AmazingTimePickerService} from "amazing-time-picker";
import {FunctionsService} from "../../../../services/functions.service";


@Component({
  selector: 'app-time-stop',
  template: ' <input class="input-system" type="text" (click)="openInputTimeTo()"  [value]=stopAtInput>',
})
export class setTimeStopComponent {
  @Input() stopAtInput;
  @Output() stopAtInputChanged = new EventEmitter<any>();

  constructor(
    private atp: AmazingTimePickerService,
    private funcService: FunctionsService,

  ) {
  }

  openInputTimeTo() {
    const amazingTimePicker = this.atp.open({
      time: this.stopAtInput
    });
    amazingTimePicker.afterClose().subscribe(time => {
      const a = time.split(":");
      const startTime = parseInt(a[0]) * 60 + parseInt(a[1]);
      this.stopAtInput =this.funcService.formattingTime(startTime);
      this.stopAtInputChanged.emit(startTime);
    });
  }
}
