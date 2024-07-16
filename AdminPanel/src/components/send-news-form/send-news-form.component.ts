import { Component } from '@angular/core';
import Swal from "sweetalert2";

const API_URL: string = "https://localhost:7176/api/v1/NewsLetter/";

@Component({
  selector: 'app-send-news-form',
  standalone: true,
  imports: [],
  templateUrl: './send-news-form.component.html',
  styleUrl: './send-news-form.component.css'
})
export class SendNewsFormComponent {

  public async sendNewsAsync(news: string) : Promise<void> {
    if (news !== "") {
      await fetch(API_URL + `SendingNews?news=${news}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status === 200)
        {
          Swal.fire("News were sent successfully!");
        }
      });
    }
    else {
      Swal.fire("Warning", "Fill news form!", "warning");
    }
  }
}
