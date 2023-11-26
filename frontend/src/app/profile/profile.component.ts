import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpServiceService} from "../services/http-service.service"; // will extract the userID after successfull log-in
import {faCashRegister} from '@fortawesome/free-solid-svg-icons';
import {faBasketShopping} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateUserComponent} from "../update-user/update-user.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [HttpServiceService]
})
export class ProfileComponent implements OnInit {

  // stores the id of current profile
  currentProfileId: number = 4;
  // placeholder for user-object
  user: any;

  // for fontawesome icons
  faCashRegister = faCashRegister;
  faBasketShopping = faBasketShopping;
  currentUserID: number

  products: any



  constructor(private router: Router,private route: ActivatedRoute, private httpService: HttpServiceService, private modalService: NgbModal,private toastr: ToastrService) {
  }

  // method gets called when 'Profil bearbeiten' button is clicked
  async editProfileButtonClicked() {
    try {
      const ergebnis: Boolean = await this.modalService.open(UpdateUserComponent).result;
      if (ergebnis == true) {
        this.ngOnInit()
      }
    } catch (err) {
      console.log("Window closed...", err);
    }
  }

  async deleteUser(){
      await this.httpService.deleteUser(this.currentUserID).subscribe(
        res => {
          // @ts-ignore
          localStorage.removeItem("jwt")
          this.toastr.success("Dein Profil wurde erfolgreich gelöscht")
          this.router.navigate(["/login"])
        }
      )

  }

  addFavoriteUser() {

  }

  ngOnInit() {

    // Authorization and grabbing the id of logged-in user
    this.httpService.checklogin(localStorage.getItem("jwt")).subscribe(
      res => {
        // @ts-ignore
        this.currentUserID = res.user
        console.log("Prüft Userid" + this.currentProfileId)
        console.log(this.currentUserID)
      }
    )

    // allows to access url data
    this.route.params.subscribe(params => {
      // gets the id parameter from current url
      this.currentProfileId = parseInt(params['id'], 10);
      // calls getUser from the httpSercive to request the user-data which belongs to the current profileId
      this.httpService.getUser(this.currentProfileId).subscribe(
        (response) => {
          // stores the user-object to the user variable, which allows the use of it in the html component
          console.log(this.currentProfileId);
          this.user = response;

        }
      );
    });

    this.httpService.getAllArticlesOfUser(this.currentProfileId).subscribe(
      (response) => {
        this.products = response;
      }
    );
  };



}
