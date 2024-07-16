import {Component, ElementRef, ViewChild, ViewRef} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  @ViewChild("Password") password!: ElementRef;
  @ViewChild("Mail") mail!: ElementRef;
  public flag: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  public async sendCredsToEmail(email: string): Promise<void> {
    if (!this.isValidEmail(email)) {
      this.mail.nativeElement.value = "";
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }

    await this.authService.sendCredsToEmail(email);
    this.flag = true;
  }

  public auth(password: string): void {
    if (password === localStorage.getItem("password")) {
      this.router.navigate(['/app/menu-page']);
    }
    else {
      this.password.nativeElement.value = "";
      Swal.fire("Oops", "Incorrect password!", "error");
    }
  }

  public resendPassword(): void {
    this.sendCredsToEmail(localStorage.getItem("email")!);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
