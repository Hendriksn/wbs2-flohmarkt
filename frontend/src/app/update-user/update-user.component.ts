import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpServiceService} from "../services/http-service.service";
import {faCheck, faEye} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  @ViewChild('template') templateRef: TemplateRef<any>;


  public SignUpForm!: FormGroup
  isText: boolean = false
  type: string = "password"
  faEye = faEye;
  faCheck = faCheck;

  userid: number = 5;
  user: any;

  givenName: any;
  familyName: any;
  telefonnummer: any;
  email: any;
  pb: any;
  pbToUpload: File | undefined;


  constructor(public activeModal: NgbActiveModal, private location: Location, private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService, public modalService: NgbModal,
              private httpService: HttpServiceService) {
  }

 async ngOnInit(): Promise<void> {

   await this.httpService.checklogin(localStorage.getItem("jwt")).subscribe(
      res => {
          // @ts-ignore
        console.log(res.user)

        // @ts-ignore
        this.userid = Number(res.user)
        console.log(this.userid)

        this.httpService.getUser(this.userid).subscribe(
          (response) => {
            //this.router.navigate(["/profil/"+this.userid])
            console.log(response)
            this.user = response[0];
            this.givenName = this.user.givenName;
            this.familyName = this.user.familyName;
            this.telefonnummer = this.user.telefonnummer
            this.email = this.user.email
          })
      }
    )

    this.SignUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      telefonnummer: ['', Validators.required],
    })
  }

  async updateUser() {

    console.log("Bild wird hochgeladen")

    if(this.pbToUpload != null) {


      this.httpService.uploadProfilePicFile(this.pbToUpload).subscribe(
        (response) => {
          // @ts-ignore
          console.log("Antwort: ", response.data)
          // @ts-ignore
          this.SignUpForm.addControl('picture', this.formBuilder.control(response.data, [Validators.required]));
          console.log(this.SignUpForm.value);
          this.httpService.updateUser(this.userid, this.SignUpForm).subscribe(
            (response) => {
              console.log(response);
              this.toastr.success("Die Änderungen wurden übernommen");
              this.activeModal.close(true)
            },
            (error) => {
              console.log(error);
            })
        }, (err) => {
          console.log(err)
        })
    }else{
      this.httpService.updateUser(this.userid, this.SignUpForm).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success("Die Profil konnte nicht bearbeitet werden");
          this.activeModal.close(true)
        },
        (error) => {
          console.log(error);
        })
    }


  }

  handleFileInput(files: Event) {
    // @ts-ignore
    this.pbToUpload = files.target.files[0];
    console.log(this.pbToUpload)
  }

  clickNewPB() {
    this.httpService.uploadProfilePicFile(this.pbToUpload).subscribe(
      (response) => {
      console.log("Antwort: ",response)
      },
    (error) => {
      console.log(error)})
  }
}
