import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {POLICIES} from "../../constants/policies";
import {tap} from "rxjs/operators";
import {EditResourcePopupComponent} from "../../reusable-components/popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html'
})


export class HistoryComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.getHistory(21).subscribe((res: any) => {
   console.log(res)
    });
  }

}
