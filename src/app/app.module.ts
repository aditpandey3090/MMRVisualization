import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from "@angular/router";



import { AppComponent } from './app.component';
import { HomeComponent } from './src/home/home/home.component';
import { DashboardComponent } from './src/dashboard/dashboard/dashboard.component';
import { BarchartComponent} from './src/barchart/barchart.component';
import { TableComponent } from './src/table/table.component';
import { AccuracyVizComponent } from './src/accuracy-viz/accuracy-viz.component';
import { ParallelcoordComponent } from './src/parallelcoord/parallelcoord.component';
import { DistributioncomparisonComponent } from './src/distributioncomparison/distributioncomparison.component';
import {SelectionService} from "./src/selectionService/selection.service"
import { FilterPipe} from './filter.pipe';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    BarchartComponent,
    TableComponent,
    AccuracyVizComponent,
    ParallelcoordComponent,
    DistributioncomparisonComponent,
    FilterPipe

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)

  ],
  providers: [SelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
