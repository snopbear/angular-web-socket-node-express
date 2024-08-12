import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe, JsonPipe, NgIf } from '@angular/common';
import { StocksService } from './service/stocks.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, CurrencyPipe, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'Live Stocks of Apple, Google and Microsoft!';
  stockValues$!: Observable<any[]>;

  constructor(private _stocksService: StocksService) {}

  ngOnInit(): void {
    this.stockValues$ = this._stocksService.getLiveStockValues();
  }
}
