import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class StocksService implements OnDestroy {
  private _socket: Socket;

  constructor() {
    // Initialize the socket connection
    // this._socket = io('http://localhost:9091/live');
    this._socket = io(
      'https://web-socket-server-node-express.onrender.com/live'
    );

    // Debugging: Handle connection errors
    this._socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Debugging: Log when successfully connected
    this._socket.on('connect', () => {
      console.log('Connected to the stock server');
    });

    // Debugging: Log when disconnected
    this._socket.on('disconnect', (reason) => {
      console.warn('Disconnected from the stock server:', reason);
    });
  }

  ngOnDestroy(): void {
    if (this._socket) {
      console.log('Disconnecting socket...');
      this._socket.disconnect();
    }
  }

  getLiveStockValues(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this._socket.emit('joinSocketsRoom', 'stocks');
      this._socket.on('liveStocks', (stocks) => {
        console.log('Received Apple stocks:', stocks);
        observer.next(stocks);
      });

      // Handle unsubscription
      return () => {
        console.log('Unsubscribing from Apple stocks');
        this._socket.off('appleStocks');
      };
    });
  }
}
