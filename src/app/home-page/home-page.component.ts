import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api-service.service';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ActivatedRoute } from '@angular/router';

echarts.use([BarChart, TitleComponent, TooltipComponent, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  // isNavbarOpen: boolean = false;
  chartOptions: any;
  additionalChartOptions: any;
  breastfeedingChartOptions: any;

  graphId: number = 0;
  showGraph1: boolean =true;
  showGraph2: boolean =true;
  showGraph3: boolean =true;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.graphId=parseInt(params['graphId']);
      this.handleGraphId(this.graphId);
      console.log('Graph ID:', this.graphId);
    });

    this.fetchChartData();
   
  }
//change graphes to view
  private handleGraphId(graphId: number) {
    const graphMapping: { [key: number]: { showGraph1: boolean; showGraph2: boolean; showGraph3: boolean } } = {
      0: { showGraph1: true, showGraph2: true, showGraph3: true },
      1: { showGraph1: true, showGraph2: false, showGraph3: false },
      2: { showGraph1: false, showGraph2: true, showGraph3: false },
      3: { showGraph1: false, showGraph2: false, showGraph3: true },
    };
    
    if (graphMapping.hasOwnProperty(graphId)) {
      const { showGraph1, showGraph2, showGraph3 } = graphMapping[this.graphId];
      this.showGraph1 = showGraph1;
      this.showGraph2 = showGraph2;
      this.showGraph3 = showGraph3;
    } else {
      console.error('Invalid graphId:', graphId);
    }
  }

  //view graph on the coponent
  fetchChartData() {
    //get api of graph from the service
    this.apiService.fetchChartData(this.graphId).subscribe((data: any[]) => {
      if (data) {
        const chartData = {
          xAxisData: [] as string[],
          seriesData: [] as { measure: string; data: number[] }[]
        };

        const additionalChartData = {
          xAxisData: [] as string[],
          seriesData: [] as { measure: string; data: number[] }[]
        };

        const breastfeedingChartData = {
          xAxisData: [] as string[],
          seriesData: [] as { year: number; count: number }[]
        };

        data.forEach((item) => {
          const age = String(item.age);
          const measure = item.measure.toLowerCase();
          const count = item.count;
          const year = item.year;

          if (this.graphId === 1) {
            if (!chartData.xAxisData.includes(age)) {
              chartData.xAxisData.push(age);
            }

            let seriesItem = chartData.seriesData.find((series) => series.measure === measure);

            if (seriesItem) {
              seriesItem.data.push(count);
            } else {
              seriesItem = {
                measure,
                data: [count]
              };
              chartData.seriesData.push(seriesItem);
            }
          } else if (this.graphId === 3) {
            if (!additionalChartData.xAxisData.includes(age)) {
              additionalChartData.xAxisData.push(age);
            }

            let seriesItem = additionalChartData.seriesData.find((series) => series.measure === measure);

            if (seriesItem) {
              seriesItem.data.push(count);
            } else {
              seriesItem = {
                measure,
                data: [count]
              };
              additionalChartData.seriesData.push(seriesItem);
            }
          }

          if (year !== null) {
            breastfeedingChartData.xAxisData.push(year.toString());
            breastfeedingChartData.seriesData.push({ year, count });
          }
        });

        if (this.graphId === 1) {
          this.chartOptions = {
            xAxis: {
              type: 'category',
              data: chartData.xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: chartData.seriesData.map((seriesItem) => ({
              data: seriesItem.data,
              type: 'bar',
              name: seriesItem.measure
            }))
          };

          const chartElement = document.getElementById('chart-container');
          const chart = echarts.init(chartElement);
          chart.setOption(this.chartOptions);
        } else if (this.graphId === 3) {
          this.chartOptions = {
            xAxis: {
              type: 'category',
              data: chartData.xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: chartData.seriesData.map((seriesItem) => ({
              data: seriesItem.data,
              type: 'bar',
              name: seriesItem.measure
            }))
          };

          this.additionalChartOptions = {
            xAxis: {
              type: 'category',
              data: additionalChartData.xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: additionalChartData.seriesData.map((seriesItem) => ({
              data: seriesItem.data,
              type: 'bar',
              name: seriesItem.measure
            }))
          };

          this.breastfeedingChartOptions = {
            xAxis: {
              type: 'category',
              data: breastfeedingChartData.xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: breastfeedingChartData.seriesData.map((item) => item.count),
                type: 'line'
              }
            ]
          };

          const chartElement = document.getElementById('chart-container');
          const additionalChartElement = document.getElementById('additional-chart-container');
          const breastfeedingChartElement = document.getElementById('breastfeeding-chart-container');

          const chart = echarts.init(chartElement);
          const additionalChart = echarts.init(additionalChartElement);
          const breastfeedingChart = echarts.init(breastfeedingChartElement);

          chart.setOption(this.chartOptions);
          additionalChart.setOption(this.additionalChartOptions);
          breastfeedingChart.setOption(this.breastfeedingChartOptions);


        } else {
          console.error('Invalid API response: data is missing');
        }
      } (error: any) => {
        console.error('Error fetching breastfeeding chart data:', error);
      }
    });
  }
}
