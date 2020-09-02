import { Observable } from 'rxjs';

export interface LineChartData {
	name: string;
	series: LineSeriesData[];
}

export interface LineSeriesData {
	name: any;
	value?: number | string;
}

export interface Menu {
    label: string;
	value: string;
}

