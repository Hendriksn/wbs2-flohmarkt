import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Conversation } from 'src/app/models/Conversation';
import { Message } from 'src/app/models/Message';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @ViewChild('form') form: NgForm;
  users: Object;
  userid: number=1;
  private LoggedIn: boolean;
  constructor(private socket: Socket, private route: ActivatedRoute, private location: Location, private modalService: NgbModal,
              private router: Router, private httpService: HttpServiceService, private formBuilder: FormBuilder) {
  }

  chatID: number = 1;
  messages:any
  messageForm: FormGroup;
  text: any;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  async ngOnInit() {

    this.socket.on("reload", () => {
      console.log("New Message!")
      this.ngOnInit()
    })

    this.route.params.subscribe(params => {
      this.chatID = parseInt(params['id'], 10);
    })

    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required]
    })

    await this.httpService.checklogin(localStorage.getItem("jwt")
    ).subscribe(
      ((res) => {
          // @ts-ignore
          if (res.user) {
            this.LoggedIn = true
            // @ts-ignore
            this.userid = res.user
            console.log(this.userid)
          }
        }
      ), msg => {
      })

    this.httpService.checklogin(localStorage.getItem("jwt"))

    this.httpService.getUsers().subscribe(
      (response) => {
        console.log(response)
        this.users = response;
      })


    this.httpService.getChatMessages(this.chatID).subscribe(
      (response) => {
        console.log(response);
        this.messages = response
      }, (error) => {
        console.log(error)
      }
    )
  }



  sendMessage() {
    console.log(this.messageForm.value)
    this.messageForm.addControl('user', this.formBuilder.control(this.userid, [Validators.required]));
    this.messageForm.addControl('chatID', this.formBuilder.control(this.chatID, [Validators.required]));

    this.httpService.sendChatMessage(this.messageForm).subscribe(
      (response) => {
        console.log(response);
        this.socket.emit('message');
        this.ngOnInit()
      }, (error) => {
        console.log(error)
    }

    )
  }
}
