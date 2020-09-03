import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AmazingTimePickerService} from "amazing-time-picker";


  @Component({
    selector: 'app-time-start',
    template: ' <input class="input-system"  type="text" (click)="openInputFrom()"  [value]=startAtInput>',
  })
export class setTimeStartComponent implements OnInit{
    @Input() startAtInput;
    @Output() startAtInputChanged = new EventEmitter<any>();

    constructor(
      private atp: AmazingTimePickerService
    ) {}
    openInputFrom() {
      const amazingTimePicker = this.atp.open({
        time: `${this.startAtInput % 60 == 0}:${this.startAtInput % 60}`
      });
      amazingTimePicker.afterClose().subscribe(time => {
        this.startAtInput = time;
        const a = time.split(":");
        const stopTime = parseInt(a[0]) * 60 + parseInt(a[1]);
        this.startAtInputChanged.emit(stopTime);
        console.log(time)
      });
    }
  ngOnInit(): void {
      console.log(this.startAtInput)
    this.startAtInput = `${this.startAtInput / 60 }:${this.startAtInput % 60}`;
  }
  }
