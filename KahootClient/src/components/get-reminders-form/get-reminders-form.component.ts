import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../models/Message";
import {Router} from "@angular/router";
import {Reminder} from "../../models/Reminder";
import {ReminderService} from "../../services/reminder.service";

const API_URL: string = "https://localhost:7176/api/v1/Reminder/";
@Component({
  selector: 'app-get-reminders-form',
  templateUrl: './get-reminders-form.component.html',
  styleUrls: ['./get-reminders-form.component.css']
})
export class GetRemindersFormComponent implements OnInit{
  public reminders: Reminder[] = [];
  public searchText: string = "";

  constructor(private router: Router, private reminderService: ReminderService) {}

  public async getRemindersAsync(): Promise<void> {
    this.reminders = await this.reminderService.getRemindersAsync();
    console.log(this.reminders);
  }

  public openQuiz(catName: string, quizName: string, mode: string): void {
    console.log("abc => ", catName, quizName, mode);
    this.router.navigate(['/app/choose-level-form'], {
      queryParams: {
        action: 'play',
        mode: mode,
        categoryName: catName,
        testName: quizName
      }
    });
  }

  public filterReminders(): Reminder[] {
    return this.reminders.filter(reminder =>
      reminder.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public async deleteReminderAsync(reminderId: number): Promise<void> {
    this.reminders = await this.reminderService.deleteReminderAsync(reminderId, this.reminders);
  }

  public backOptions(): void {
    this.router.navigate(['/app/my-profile-form']);
  }

  ngOnInit(): void {
    this.getRemindersAsync();
  }
}
