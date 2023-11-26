import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { ChatSocketServiceService } from 'src/app/services/chatsocketservice.service';
import { environment } from 'src/environment';
import { Conversation } from '../models/Conversation';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  constructor(http: HttpClient) {}

}
