import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AmazingTimePickerService} from "amazing-time-picker";
import {FunctionsService} from "../../../../services/functions.service";


  @Component({
    selector: 'app-time-start',
    template: ' <input class="input-system"  type="text" (click)="openInputFrom()"  [value]=startAtInput>',
  })
export class setTimeStartComponent {
    @Input() startAtInput;
    @Output() startAtInputChanged = new EventEmitter<any>();

    constructor(
      private atp: AmazingTimePickerService,
      private funcService: FunctionsService,

    ) {}
    openInputFrom() {
      const amazingTimePicker = this.atp.open({
        time: this.startAtInput
      });
      amazingTimePicker.afterClose().subscribe(time => {
        const a = time.split(":");
        const startTime = parseInt(a[0]) * 60 + parseInt(a[1]);
        this.startAtInput =this.funcService.formattingTime(startTime);
        this.startAtInputChanged.emit(startTime);
      });
    }
  }
