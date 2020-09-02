import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

import { LineChartData, Menu } from './models/bmd-financial.model';

@Injectable({
	providedIn: 'root'
})
export class AdminService {

  private month: string[] = ['Oct 19', 'Nov 19', 'Dec 19', 'Jan 20', 'Feb 20', 'Mar 20', 'Apr 20', 'May 20', 'Jun 20', 'Jul 20', 'Aug 20', 'Sep 20']
  data: BehaviorSubject<LineChartData[]> = new BehaviorSubject(null);
  
  toolTipData: BehaviorSubject<LineChartData[]> = new BehaviorSubject(null);

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + btoa(environment.user + ':' + environment.password),
			responseType: 'text' as 'json'
		})
	};

	constructor(private http: HttpClient) {}

	getData() {
    return this.http.get(`${environment.apiUrl}/spend/rollup`, this.httpOptions)
      .subscribe((data) => {
        this.data.next(this.formatData(data))
      });
  }
  
  getToolTipData(){
    return this.http.get(`${environment.apiUrl}/spend/rollup`, this.httpOptions)
      .subscribe((data) =>{
        this.toolTipData.next(this.formatToolTip(data))
      })
  }

  public formatData(data){
    let lineData: LineChartData []= [];
    const linesOfFunding: Menu[] = [
      { label: 'L67 Line', value: 'l67_toa' },
      { label: 'L67 Obligations', value: 'l67' },
      { label: 'NVD Line', value: 'nvd_toa' },
      { label: 'NVD Obligations', value: 'nvd' }
    ];

    linesOfFunding.forEach((line) => lineData.push({ name: line.label, series: []}));

    for(let key of Object.keys(data)){
      linesOfFunding.forEach((line) =>{
        const found = lineData.find((l) => l.name === line.label);
        this.month.forEach((date, index) =>{
          found.series.push({
            name: date,
            value: data[line.value][index]
          })
        })
      })
    }
    return lineData;
  }

  formatToolTip(data){
    console.log(data.l67_projects);
    return data;
  }
}


