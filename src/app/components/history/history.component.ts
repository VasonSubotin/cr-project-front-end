import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})


export class HistoryComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.getHistory(16).subscribe((res: any) => {
   console.log(res)
    });
  }

}
