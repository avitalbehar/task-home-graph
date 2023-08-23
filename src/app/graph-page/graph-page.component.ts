
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api-service.service';
import * as echarts from 'echarts';


@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css']
})
export class GraphPageComponent implements OnInit {
  selectedGraphId!: number;
  reportData: any; // Modify the type based on the API response structure

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedGraphId = +params['id']; // Retrieve the selected graph ID from the route parameters

      // Fetch the necessary data for the selected graph based on the ID using the ApiService
      this.apiService.getReportData(this.selectedGraphId).subscribe((data: any) => {
        this.reportData = data; // Assign the fetched data to the reportData property

        // Call the method to render the graph
        this.renderGraph();
      });
    });
  }

  renderGraph(): void {
    // Use the fetched reportData to create the graph using Dj echarts
    const chart = echarts.init(document.getElementById('graphContainer'));
    const option = {
      // Customize the options based on the reportData structure and the desired graph type
      // Refer to the Dj echarts documentation for the available options and chart types
    };
    chart.setOption(option);
  }
}
