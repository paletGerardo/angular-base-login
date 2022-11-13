import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {
  @Input() plans: any[] = [];
  @Output() emitPlanSelected: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }


  public emitSelected( plan: any ): void {
    this.emitPlanSelected.emit(plan);
  }
}
