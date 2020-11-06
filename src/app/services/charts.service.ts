import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

/** Declaration of `require` function for further `highcharts` import. */
declare const require: any;
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);
require('highcharts/modules/xrange')(Highcharts);

/** Common Highcharts service. */
@Injectable()
export class ChartsService {
  /** `Highcharts` instance. */
  public Highcharts = Highcharts;
}
