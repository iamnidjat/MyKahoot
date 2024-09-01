import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../models/Message";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Location} from "@angular/common";

const API_URL: string = "https://localhost:7176/api/v1/Message/";

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.css']
})
export class SendMessageFormComponent implements OnInit, OnDestroy{
  public receiver: string = "";
  private routeSub: Subscription | undefined;
  @ViewChild("Title") Title!: ElementRef;
  @ViewChild("Body") Body!: ElementRef;
  constructor(private location: Location, private route: ActivatedRoute) {}
  public async sendMessageAsync(title: string, body: string): Promise<void> {
    let message: Message = {
      body: body, title: title, createdDate: new Date(), receiver: this.receiver, sender: localStorage.getItem("Login")!
    }

    await fetch(API_URL + "SendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })

    alert("Your message was sent!");
    this.Title.nativeElement.value = "";
    this.Body.nativeElement.value = "";
  }

  public backOptions(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.receiver = params.get('receiver')!;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
