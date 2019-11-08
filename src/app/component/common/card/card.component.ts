import { MyCardComponent } from "./../my-card/my-card.component";
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";
import { MyDataServiceService } from "../../my-data-service.service";
import { Router } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { DeviceApiService } from "src/app/service/device-api.service";
import { CheckRoleTokenService } from 'src/app/service/check-role-token.service';

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @ViewChild("yourChild", { static: false }) child;
  @Input() role: boolean;
  btnRole: boolean;
  showMyCard: boolean = false;
  public results: any; // กำหนดตัวแปร เพื่อรับค่า
  public editResults: any; // กำหนดตัวแปร เพื่อรับค่า
  name: string;
  serial: string;
  spec: string;
  image = "";
  status = true;
  holder: string;
  borrowForm: FormGroup;
  dateNow = new Date();
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 3));
  returnDate: any;
  localtime: any;
  userId = localStorage.getItem("userId");
  @Input() cantBorrow = false;
  idDeviceBorrow: any;
  btnValid = false;
  myDevice: any;
  btnBorrow: boolean = false;

  objectToMyCard: any = {
    name: "",
    serial: "",
    spec: "",
    returnDate: "",
    img: ""
  };
  hiddenMyCard = false;

  constructor(
    private data: MyDataServiceService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private macApiService: DeviceApiService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private checkTokenRole: CheckRoleTokenService
  ) {}

  ngOnInit() {
    this.editResults = {};
    this.myDevice = {};
    this.getDevice();
    this.getMyDevice();
    this.data.currentData.subscribe(data => (this.name = data));
    this.createBorrowForm();
    this.btnRole = this.checkTokenRole.checkRoleByToken() === "individual";
  }

  getMyDevice() {
    this.macApiService.getMyDevice().subscribe(res => {
      this.myDevice = res[0];
      this.myDevice.borrowing
        ? (this.btnBorrow = true)
        : (this.btnBorrow = false);
    });
  }

  getDevice() {
    this.macApiService.getMacApi().subscribe(data => {
      this.results = data;
    });
  }

  // get device id for show data
  getDeviceByID(id) {
    this.macApiService.getMacIDApi(id).subscribe(data => {
      // read result form JSON response
      this.editResults = data;
    });
  }

  // delete device when click button by id device
  deleteDevice(id, serial) {
    if (
      window.confirm(
        "Are you sure, you want to delete device serial number: " + serial
      )
    ) {
      this.macApiService.deleteMacAPI(id).subscribe(data => {
        this.getDevice();
      });
    }
  }

  // method for when click edit button
  editDevice(id) {
    this.data.changeData(id);
    this.router.navigate(["/admin/edit"]);
  }

  createBorrowForm() {
    this.borrowForm = this.formBuilder.group({
      borrow: ["", Validators.required]
    });
  }

  borrowDevice(id) {
    this.idDeviceBorrow = "" + id;
  }

  onSubmitBorrow() {
    const tzoffset = new Date().getTimezoneOffset() * 60000;
    this.localtime = new Date(this.returnDate - tzoffset);
    this.localtime.setHours(12, 0, 0);
    const localISOTime = new Date(this.localtime).toISOString();
    // post method
    const data = {
      returnDate: localISOTime
    };
    this.macApiService
      .postBorrowAPI(this.idDeviceBorrow, data)
      .subscribe(res => {
        this.ngOnInit();
        this.child.showMycard();
      });
  }

  check() {
    this.btnValid = true;
  }

  load() {
    this.getDevice();
    this.btnBorrow = false;
  }
}
