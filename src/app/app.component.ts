import { Component, OnInit } from '@angular/core';

import { AdminService } from './admin.service';


@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
	// @Input() data: LineChartData[];
	multi: any[] = [];
	view: any[] = [ 1200, 600 ];

	// options
	legend: boolean = true;
	showLabels: boolean = true;
	animations: boolean = true;
	xAxis: boolean = true;
	yAxis: boolean = true;
	showYAxisLabel: boolean = true;
	showXAxisLabel: boolean = true;
	xAxisLabel: string = 'SMPT Financials';
	yAxisLabel: string = 'Millions';
	timeline: boolean = true;

	colorScheme = {
		domain: [ '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5' ]
	};

	constructor(private adminService: AdminService) {}

	ngOnInit() {
    this.adminService.getData();
    this.adminService.getToolTipData();
		this.adminService.data.subscribe((data) => {
			if (data) this.multi = data;
		});
	}
}
