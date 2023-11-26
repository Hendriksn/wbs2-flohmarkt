import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router"
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {Location} from "@angular/common";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {HttpServiceService} from "../services/http-service.service";


@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.scss']
})
export class RegisterDataComponent implements OnInit {

  @ViewChild('template') templateRef: TemplateRef<any>;


  public SignUpForm!: FormGroup
  isText: boolean = false
  type: string = "password"
  faEye = faEye;
  faCheck = faCheck;
  checkbuyer = false;
  checkseller = false;
  checkdatenschutz = false;
  check: boolean;
  pbToUpload: File | undefined;


  constructor(private location: Location, private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService, public modalService: NgbModal,
              private httpService: HttpServiceService) {
  }

  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      telefonnummer: ['', Validators.required],
    })
  }


  async SignUp() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  console.log(this.SignUpForm.value)
    if (this.SignUpForm.valid && this.SignUpForm.value.username.length > 2 && this.SignUpForm.value.password.length > 7 &&
      this.SignUpForm.value.email.match(mailformat) && this.checkdatenschutz && (this.checkbuyer || this.checkseller) && this.pbToUpload) {


      console.log("Bild wird hochgeladen")
      this.httpService.uploadProfilePicFile(this.pbToUpload).subscribe(
        (response) => {
          // @ts-ignore
          console.log("Antwort: ", response.data)
          // @ts-ignore
          this.SignUpForm.addControl('picture', this.formBuilder.control(response.data, [Validators.required]));
          if (this.checkbuyer) {
            this.SignUpForm.value.role = "buyer"
          } else {
            this.SignUpForm.value.role = "seller"
          }
          console.log(this.SignUpForm.value);

          this.httpService.register(this.SignUpForm).subscribe(
            res => {
              if (this.checkseller) {
                this.modalService.open(this.templateRef)
              }
              this.toastr.success("Sie wurden erfolgreich registriert. Sie können sich jetzt anmelden")
              this.router.navigate(["/login"])
              this.location.go("/login")

            }, msg => {
              console.log(msg)
              this.toastr.error("Bei der Registrierung ist etwas schiefgelaufen. Versuchen sie es später erneut." + msg.statusCode)
            }
          )

          },
        (error) => {
          console.log(error)
        })



    } else {
      this.toastr.error("Es wurden nicht alle Felder ausreichend ausgefüllt, ein Profilbild ist Pflicht!", "Fehler")
      // this.validateAllformFields((this.SignUpForm))
    }
  }

  // validateAllformFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field =>{
  //     const control = formGroup.get(field);
  //     if(control instanceof  FormControl){
  //       control.markAsDirty({onlySelf:true});
  //     }else if(control instanceof FormGroup){
  //       this.validateAllformFields(control)
  //     }
  //   })
  // }
  pb: any;

  showhide() {
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }

  OnlyOneCheckbox(event) {
    if (event.target.id == "checkbuyer") {
      this.checkbuyer = true;
      this.checkseller = false;
    } else if (event.target.id == "checkseller") {
      this.checkseller = true;
      this.checkbuyer = false;
    }
  }

  handleFileInput(files: Event) {
    // @ts-ignore
    this.pbToUpload = files.target.files[0];
    console.log(this.pbToUpload)
  }
}
