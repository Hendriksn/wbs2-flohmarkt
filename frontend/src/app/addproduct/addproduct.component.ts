import { Component } from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../services/http-service.service";
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent {
  picToUpload: File | undefined;
  private LoggedIn: boolean;
  private userid: number;
  constructor(private location: Location, private toastr: ToastrService, private router: Router, private formBuilder: FormBuilder, private httpService: HttpServiceService) { }


  public UploadProduct!: FormGroup
  sellerID : any;
  productName: any;
  pic: any;

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
          }
        }
      ), msg => {
      })

    this.UploadProduct = this.formBuilder.group({
      name: [``, Validators.required],
      price: [``, Validators.required],
      category: [``, Validators.required],
      description: [``, Validators.required],
      location: [``, Validators.required],
    });
  }

  clickedCreate() {
    console.log("Test")
    //console.log(this.UploadProduct)


      console.log("Bild wird hochgeladen")
      this.httpService.uploadArticleFile(this.picToUpload).subscribe(
        async (response) => {
          // @ts-ignore
          console.log("Antwort: ", response.data)
          // @ts-ignore
          await this.UploadProduct.addControl('picSource', this.formBuilder.control(response.data, [Validators.required]));
          console.log(this.UploadProduct.value)

          await this.UploadProduct.addControl('sellerID', this.formBuilder.control(this.userid, [Validators.required]));
          console.log(this.UploadProduct.value)

          await this.httpService.postArticle(this.UploadProduct).subscribe(
            (response) => {
              console.log(response);
              this.router.navigate(["/all-products"]);
              this.toastr.success("Ihr Artikel wurde erfolgreich erstellt")

            },
            (error) => {
              console.log(error);
              this.toastr.error("Ihr Artikel konnte nicht veröffentlicht werden. Versuchen sie es später erneut.")

            })


        },
        (error) => {console.log(error)})
  }

  handleFileInput(files: Event) {
    // @ts-ignore
    this.picToUpload = files.target.files[0];
    console.log(this.picToUpload)
  }
}
