import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-delete-acc-form',
  templateUrl: './delete-acc-form.component.html',
  styleUrls: ['./delete-acc-form.component.css']
})
export class DeleteAccFormComponent implements AfterViewInit, OnDestroy{
  @Input() public flag: boolean = false; // for opening delete popup form
  @Input() public flag2: boolean = false; // for opening freeze popup form
  @Input() public reason: string = "";
  @ViewChild('password') password!: ElementRef;
  @ViewChild('WriteTheReason') writeTheReason!: ElementRef;
  public visibility: boolean = false;

  constructor(private sharedService: SharedService) {}

  public checkStatus(e: any): void{
    if (e.target.checked) {
      this.reason = e.target.value;
    } else {
      this.reason = this.writeTheReason.nativeElement.value;
    }
  }

  public OpenModal(): void {
    if (localStorage.getItem('SocialUser') === null) {
      if (this.reason !== '' && this.reason !== undefined && this.sharedService.checkPassword(this.password.nativeElement.value)) {
        this.flag = true;
      } else {
        Swal.fire('Oops', 'Either you did not specify a reason or you did not specify the password properly!', 'error');
      }
    } else {
      if (this.reason !== '' && this.reason !== undefined && this.password.nativeElement.value === 'yes') {
        this.flag = true;
      } else {
        Swal.fire('Oops', 'Either you did not specify a reason or you did not specify the password properly!', 'error');
      }
    }
  }

  public OpenModal2(): void{ // opening freeze popup form
    this.flag2 = true;
  }

  public ChangeVisibilityPassword(): any {
    if (this.password.nativeElement.value !== "")
    {
      this.visibility = !this.visibility;
    }
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("SocialUser") !== null)
    {
      this.password.nativeElement.placeholder = "type 'yes'";
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem("DoesMatch"); // Don't need anymore
  }
}
