import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl1 = 'https://datadashboard.health.gov.il/api/checkup/nursing'; // Replace with the actual base URL of your API
  private baseUrl2 = 'https://datadashboard.health.gov.il/api/checkup/nursing';
  private baseUrl3 = 'https://datadashboard.health.gov.il/api/checkup/nursing';
  private baseUrl = '';
  constructor(private http: HttpClient) {
    this.baseUrl = '';
  }
  getReportData(graphId: number): Observable<any> {
    const url = `${this.baseUrl}/${graphId}`; // Replace with the actual endpoint to fetch report data
    return this.http.get(url);
  }

  // fetchChartData(graphId: number): Observable<any> {
    
  //   this.getReportData(graphId);
  //   const apiUrl = this.baseUrl; // Replace with your API URL
  //   return this.http.get(apiUrl);
  // }

 

  fetchChartData(graphId: number): Observable<any> {
    if (graphId === 1 || graphId === 2 || graphId === 3) {
        // Valid graphId, proceed with fetching chart data
        return new Observable((observer) => {
            this.getReportData(graphId).subscribe((data: any[]) => {
                const apiUrl = this.baseUrl; // Replace with your API URL
                observer.next(this.http.get(apiUrl));
                observer.complete();
            }, (error: any) => {
                observer.error('Error fetching chart data:');
            });
        });
    } else {
        console.error('Invalid graphId');
        return throwError('Invalid graphId');
    }
}
  // fetchAdditionalChartData(): Observable<any> {
  //   const apiUrl = this.baseUrl; // Replace with your API URL
  //   return this.http.get(apiUrl);
  // }

  // fetchBreastfeedingChartData(): Observable<any> {
  //   const apiUrl = this.baseUrl; // Replace with your API URL
  //   return this.http.get(apiUrl);
  // }

}