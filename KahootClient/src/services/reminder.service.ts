import { Injectable } from '@angular/core';
import {Reminder} from "../models/Reminder";

const API_URL: string = "https://localhost:7176/api/v1/Reminder/";

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  public async getRemindersAsync(): Promise<Reminder[]> {
    try {
      const response = await fetch(API_URL + `GetReminders?userId=${localStorage.getItem("userId")}`);
      const data = await response.json();
      return data.map((item: Reminder) => ({
        id: item.id,
        name: item.name,
        catName: item.catName,
        testMode: item.testMode,
        whenToPass: item.whenToPass,
    }));
    }
    catch (error) {
      console.error("Error in getRemindersAsync:", error);
      return [];
    }
  }

  public async deleteReminderAsync(reminderId: number, reminders: Reminder[]): Promise<Reminder[]> {
    try{
      const response = await fetch(API_URL + `RemoveReminder?reminderId=${reminderId}`, {
      method: "DELETE",
      })

      if (response.ok) {
        reminders = reminders.filter(reminder => reminder.id !== reminderId);
        return reminders;
      } else {
        console.error('Failed to delete reminder');
        return [];
      }
    }
    catch (error) {
      console.error("Error in deleteReminderAsync:", error);
      return [];
    }
  }

  public async doesUserHaveReminderAsync(): Promise<boolean> {
    try {
      const response = await fetch(API_URL + `DoesUserHaveReminder?userId=${parseInt(localStorage.getItem("userId")!)}`);
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error("Error in doesUserHaveReminderAsync:", error);
      return false;
    }
  }
}
