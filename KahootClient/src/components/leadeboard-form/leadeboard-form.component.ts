import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";

const API_URL: string = "https://localhost:7176/api/v1/Statistics/";

@Component({
  selector: 'app-leadeboard-form',
  templateUrl: './leadeboard-form.component.html',
  styleUrls: ['./leadeboard-form.component.css']
})
export class LeadeboardFormComponent implements OnInit{
  public leaderBoardUsers: User[] = [];

  constructor(private router: Router) {}

  public async DownloadLeaderBoardUsers(): Promise<void>{
    await fetch(API_URL + 'GetLeaderBoardUsers', {
      method: "GET"
    }).then(text => text.json()).then(data => {
      this.leaderBoardUsers = data.map((user: any) => ({
        id: user.id,
        userName: user.username,
        role: user.role,
        overallPoints: user.overallPoints,
      }));
    });
  }

  public backOptions(): void{
    this.router.navigate(['/app/profile-form']);
  }

  ngOnInit(): void {
    this.DownloadLeaderBoardUsers();
  }
}
