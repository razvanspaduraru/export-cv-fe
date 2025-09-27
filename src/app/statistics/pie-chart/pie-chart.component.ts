import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PublicationService } from 'src/app/shared/service/publication.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private publicationService: PublicationService) {}

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Journal-Article', 'Peer-Review', 'Proceedings-Article', 'Book-Chapter', 'Book'  ],
    datasets: [ {
      data: [ this.publicationService.countPublicationsByType("journal-article"),
        this.publicationService.countPublicationsByType("peer-review"),
         this.publicationService.countPublicationsByType("proceedings-article"),
         this.publicationService.countPublicationsByType("book-chapter"),
         this.publicationService.countPublicationsByType("book")
          ],
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }
}
