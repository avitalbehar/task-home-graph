import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as echarts from 'echarts';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'home-task-graph';
  constructor(private router: Router) {}
  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
