import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpServiceService} from "../services/http-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  private LoggedIn: boolean;
  private userid: number;
  chats: any;
  articles: any;
  users: any;

  constructor(private route: ActivatedRoute, private location: Location, private modalService: NgbModal,
              private router: Router, private httpService: HttpServiceService, private formBuilder: FormBuilder) {
  }


  async ngOnInit() {

    await this.httpService.checklogin(localStorage.getItem("jwt")
    ).subscribe(
      ((res) => {
          // @ts-ignore
          if (res.user) {
            this.LoggedIn = true
            // @ts-ignore
            this.userid = res.user
            console.log(this.userid)

            this.httpService.getChatRooms(this.userid).subscribe(
              (result) => {
                console.log(result);
                this.chats = result
              }, (error) => {
                console.log(error)
              }
            )

          }
        }
      ), msg => {
      })

    this.httpService.getAllArticles().subscribe((result) => this.articles = result)
    this.httpService.getUsers().subscribe((result) => this.users = result)



  }

  ClickOnChat(id) {
    this.router.navigate(["/chatroom/"+id]);
  }
}
