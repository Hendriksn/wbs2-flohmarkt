import {Component, OnInit} from '@angular/core';
import {HttpServiceService} from "../services/http-service.service";

@Component({
  selector: 'app-inbox-view',
  templateUrl: './inbox-view.component.html',
  styleUrls: ['./inbox-view.component.scss']
})
export class InboxViewComponent implements OnInit {
  messages: any[];

  constructor(private inboxService: HttpServiceService) {}

  ngOnInit() {
    this.inboxService.getMessages()
      .subscribe(messages => this.messages = messages);
  }

  onRefresh() {
    this.inboxService.getMessages()
  }

  onMessageClick(message) {
    console.log("Selected message: ", message);
  }

  onDelete() {
    const selected = this.messages.filter(m => m.selected);
    console.log("Selected messages: ", selected);
    //this.inboxService.deleteMessage(selected);
  }

  hasSelectedMessages() {
    return this.messages.some(m => m.selected);
  }


  onSelectionChanged() {
    console.log("Selection changed");
  }

}
