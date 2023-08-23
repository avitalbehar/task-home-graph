import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  
  isNavbarOpen: boolean = false;
  selectedGraph: number = 0; // 0 indicates all graphs

  menuItems = [
    {
      label: 'Home',
      routerLink: '/home/{0}'
    },
    {
      label: 'Graph 1',
      command: () => this.selectGraph(1)
    },
    {
      label: 'Graph 2',
      command: () => this.selectGraph(2)
    },
    {
      label: 'Graph 3',
      command: () => this.selectGraph(3)
    }
  ];

  toggleNavbar(): void {
    this.isNavbarOpen = !this.isNavbarOpen;
  }


  selectGraph(graphNumber: number): void {
    this.selectedGraph = graphNumber;
    routerLink: '/home/{graphNumber}'

  }
}