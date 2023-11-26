import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {faEye} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {HttpServiceService} from "../services/http-service.service";
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isText: boolean = false
  type: string = "password"
  faEye = faEye;
  faCheck = faCheck;

  public LoginInForm!: FormGroup

  constructor(private location: Location, private router: Router,
              private formBuilder: FormBuilder,
              private toastr: ToastrService, public modalService: NgbModal,
              private httpService: HttpServiceService,
              private http: HttpClient) {
  }


  ngOnInit(): void {
    this.LoginInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  async LogIn() {

    if (this.LoginInForm.valid && this.LoginInForm.value.password.length > 7) {

        await this.httpService.login(this.LoginInForm).subscribe
        (res => {

          console.log(res.id)
          console.log(res.user)
          localStorage.setItem("jwt", res.id)
          localStorage.setItem("userid", res.userd)
          this.router.navigate(["profil/"+ res.user])
          this.location.go("profil/"+res.user)
          location.reload()

      }, msg => {
          console.log(msg)
          this.toastr.error("Nutzer konnte nicht gefunden werden", "Error")
        })}else {
        this.toastr.error("Es wurden nicht alle Felder ausreichend ausgefüllt", "Fehler")
        // this.validateAllformFields(this.LoginInForm)
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

  showhide() {
    console.log("moin")
    this.isText = !this.isText
    this.isText ? this.type = "text" : this.type = "password"
  }

}
