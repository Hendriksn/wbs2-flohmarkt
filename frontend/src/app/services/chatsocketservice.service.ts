import { Injectable } from '@angular/core';

import { SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: localStorage.getItem('CapacitorStorage.token'),
        },
      },
    },
  },
};

@Injectable({
  providedIn: 'root',
})
export class ChatSocketServiceService extends Socket {
  constructor() {
    super(config);
  }
}
