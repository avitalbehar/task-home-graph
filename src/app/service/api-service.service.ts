import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,forkJoin,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl1 = 'https://datadashboard.health.gov.il/api/checkup/nursing'; 
  private baseUrl2 = 'https://datadashboard.health.gov.il/api/experienceInstitutes/surveyPatientExperienceVariables';
  private baseUrl3 = 'https://datadashboard.health.gov.il/api/checkup/nursing';
  constructor(private http: HttpClient) {}

  fetchChartData(graphId: number): Observable<any> {
    let apiUrl: string;

    switch (graphId) {
      case 1:
        apiUrl = this.baseUrl1;
        break;
      case 2:
        apiUrl = this.baseUrl2;
        break;
      case 3:
        apiUrl = this.baseUrl3;
        break;
      case 0:
        const apiRequests = [
          this.http.get(this.baseUrl1),
          this.http.get(this.baseUrl2),
          this.http.get(this.baseUrl3)
        ];
        return forkJoin(apiRequests);
      default:
        console.error('Invalid graphId');
        return throwError('Invalid graphId');
    }
  
    return this.http.get(apiUrl);
  }
  

}