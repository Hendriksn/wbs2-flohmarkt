import {Component} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpServiceService} from "../services/http-service.service";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateArticleComponent} from "../update-article/update-article.component";
import {FormGroup} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductdetailComponent {
  private userid: number;

  constructor(private route: ActivatedRoute, private location: Location, private modalService: NgbModal,
              private router: Router, private httpServiceService: HttpServiceService,private toastr: ToastrService) {
  }

  product: any
  id: any
  seller: any
  sellerId: any;
  buttonDisabled: boolean;

  // representing the id of user looking at this article
  // visitingUserId: any;
  // hardcoded userId for test purpose, till login/session works properly
  userId : any;



  ngOnInit(): void {

    // Authorization and grabbing the id of logged-in user
    this.httpServiceService.checklogin(localStorage.getItem("jwt")).subscribe(
      res => {
        // @ts-ignore
        this.userId = res.user;
        console.log("das ist meine userId: " + this.userId);
      }
    )

    this.buttonDisabled = false;

    this.route.params.subscribe(params => {
      this.id = parseInt(params['id'], 10);
    })

    this.httpServiceService.getArticle(this.id).subscribe(
      (response) => {
        this.product = response[0];
        this.httpServiceService.getUser(this.product.sellerID).subscribe(
          (response) => {
            this.seller = response[0];
            this.sellerId = response[0].id;
            console.log('die Seller id ist ' + this.sellerId);
          }, (error) => {
            console.log(error);
          })
      }, (error) => {
        console.log(error);
      })
  }

  async clickedEditArticle() {
    try {
      const modal = this.modalService.open(UpdateArticleComponent);
      modal.componentInstance.product = this.id;

      if (await modal.result == true) {
        this.ngOnInit()
      }

    } catch (err) {
      console.log("Window closed...", err);
    }

  }

  clickDeleteArticle() {
    this.httpServiceService.deleteArticle(this.id).subscribe(

      (response) =>  {
      },  (error) => {
        this.toastr.error("Artikel konnte nicht gelöscht werden. Versuchen sie es später nochmal");
        console.log(error);
      })
  }


  async addToFavorites() {
    try {
      this.httpServiceService.addArticleToFavorites(this.id, this.userId);
      this.toastr.success("Artikel wurde zu Favoriten hinzugefügt")

    } catch (err) {
      console.log(err);
      this.toastr.error("Artikel konnte nicht zu Favoriten hinzugefügt werden. Versuchen sie es später erneut.");
    }
  }

  async checkButton() {
    await this.httpServiceService.checklogin(localStorage.getItem("jwt")
    ).subscribe(
      ((res) => {
          // @ts-ignore
          if (res.user) {
            // @ts-ignore
            this.userid = res.user
            console.log(this.userid)
          }
        }
      ), msg => {
      })


    if (this.sellerId !== this.userid) {
      return true;
    } else {
      return false;
    }
  }


  async newChat() {
    await this.httpServiceService.checklogin(localStorage.getItem("jwt")
    ).subscribe(
      ((res) => {
          // @ts-ignore
          if (res.user) {
            // @ts-ignore
            this.userid = res.user
            console.log(this.userid)

            this.httpServiceService.createChatRoom(this.userid, this.product.id, this.sellerId).subscribe(
              (response) => {
                console.log(response.id)
                this.router.navigate(["/chatroom/"+response.id]);
              }, (error) => {
                console.log(error)
              }
            )

          }
        }
      ), msg => {
      })



  }
}
