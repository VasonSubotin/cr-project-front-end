import {Component, OnInit} from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { PoliciesService } from 'src/app/services/policies.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})


export class HistoryComponent implements OnInit {
  constructor(public historyService: HistoryService, 
    public policiesService: PoliciesService) {
  }
  ngOnInit(): void {
    this.historyService.getHistoryList();
    this.policiesService.getPoliciesList();
  }

  getInitialSOC(initial_energy: number,  capacity: number) {
    return Math.round(initial_energy/capacity);

  }

  getFinalSOC(energy: number) {
    return Math.round(energy);

  }

  getTotal(
value: number
  ){
   return Math.floor(value); 
  }

}
