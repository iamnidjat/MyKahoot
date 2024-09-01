import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {SharedService} from "../../services/shared.service";
import {SwitchLanguageService} from "../../services/switch-language.service";

@Component({
  selector: 'app-navbar-form',
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent implements OnInit{
  public username: string = "";
  public userLevel: number = 1;
  public points: number = 0;
  public overallPoints: number = 0;
  public coins: number = 0;
  public flag: boolean = false;
  public imageURL: string = "/assets/images/user.png";
  @ViewChild('SearchRequest') SearchRequest!: ElementRef;
  public isMenuOpen = false;

  constructor(private router: Router, private switchLanguage: SwitchLanguageService,
              private el: ElementRef, private sharedService: SharedService) {}

  public toggleMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public Search(request: string): void {
    // Define mappings of destination URLs to arrays of terms
    const termMappings: { [key: string]: string[] } = {
      'player-options-form': ['home', 'menu', 'main', 'меню', 'главное', 'menü', 'əsas'],
      'creating-quiz-option-form': ['create', 'creating', 'quiz', 'создать', 'создание', 'викторину', 'викторины', 'viktorina', 'yaratmaq'],
      'player-survey-choosing-form': ['play', 'играть', 'oyna'],
      'profile-form': ['profile', 'профиль', 'profil', 'аккаунт', 'hesab'],
      'about-form': ['about', 'про', 'нас', 'bizim', 'haqqında', 'info', 'məlumat'],
      'contacts-form': ['contact', 'связь', 'əlaqə', 'help', 'support', 'помощь', 'поддержка', 'kömək', 'dəstək', 'assistance', 'yardım'],
      'contact-list-form': ['contact list', 'data', 'данные', 'informasiya', 'information', 'contacts'],
      'stats-form': ['stat', 'stats', 'статистика', 'statistika', 'analytics', 'анализ'],
      'choose-field-form': ['top', 'топ', '10', 'rating', 'reytinq', 'рейтинг', 'best', 'ən yaxşı'],
      'my-quizzes-form': ['quizzes', 'my', 'мои', 'mənim', 'tests', 'testlər'],
      'my-profile-form': ['edit', 'редакт', 'redakt', 'update', 'yeniləmə'],
      'delete-acc-form': ['delete', 'удалить', 'silmək', 'remove', 'требовать удаление'],
      'settings-choice-form': ['settings', 'настройки', 'ayarlar', 'preferences', 'seçimlər'],
      'settings-form': ['change', 'изменить', 'dəyiş', 'adjust', 'тюнинг', 'password', "пароль", "parol"],
      'birthday-settings-form': ['change', 'изменить', 'dəyiş', 'birthday', 'день рождения'],
      'getMessages': ['messages', 'сообщения', 'mesajlar', 'inbox', 'входящие'],
      'getReminders': ['reminders', 'напоминания', 'xatırlatmalar', 'alerts', 'уведомления'],
      'leaderboard': ['leaderboard', 'рейтинги', 'liderlər', 'top list', 'список лидеров'],
      'mykahoot-store': ['store', 'магазин', 'mağaza', 'products', 'товары'],
      'faq-page': ['faq', 'вопросы', 'suallar', 'help', 'помощь']
    };

    // Convert the search request to lowercase for case-insensitive matching
    const lowercaseRequest: string = request.toLowerCase();

    // Iterate through destination mappings
    for (const [destination, terms] of Object.entries(termMappings)) {
      // Check if any term is included in the lowercase request
      if (terms.some(term => lowercaseRequest.includes(term))) {
        // Navigate to the corresponding destination if a match is found
        this.router.navigate([`/app/${destination}`]);
        return;  // Stop further processing if a match is found
      }
    }

    // If no matching term is found, display an error message
    Swal.fire('Oops', 'Incorrect data!', 'error');
    this.SearchRequest.nativeElement.value = ''; // Clear the input value
  }

  public switchLang(lang: string): void {
    this.switchLanguage.switchLang(lang);
  }

  public toggleMenu(): void{
    let subMenu = this.el.nativeElement.querySelector(".sub-menu-wrap");

    if (subMenu.style.display == "none") subMenu.style.display = "block";
    else subMenu.style.display = "none";
  }

  public ToProfile(): void{
    this.router.navigate(['/app/my-profile-form']);
  }

  public ToSendFeedback(): void{
    this.router.navigate(['/app/contacts-form']);
  }

  public ToSettings(): void{
    this.router.navigate(['/app/settings-choice-form']);
  }

  public ToDeleteAcc(): void{
    this.router.navigate(['/app/delete-acc-form']);
  }

  public OpenPhotoModalWindow(): void{
    this.flag = true;
  }

  public Logout(e: any): void{
    this.sharedService.backAuth(e);
  }

  ngOnInit(): void {
    setTimeout(async () => {
      this.username = localStorage.getItem("Login")!;
      const userPhoto = localStorage.getItem("userPhoto");
      if (userPhoto && userPhoto !== 'null' && !localStorage.getItem("SocialUser")) {
        this.imageURL = `https://localhost:7176${userPhoto}`;
      }
      else if (userPhoto && userPhoto !== 'null' && localStorage.getItem("SocialUser")) {
        this.imageURL = userPhoto;
      }

      this.userLevel = parseInt(localStorage.getItem("userLevel")!);
      this.points = parseInt(localStorage.getItem("points")!);
      this.overallPoints = parseInt(localStorage.getItem("overallPoints")!);
      this.coins = parseInt(localStorage.getItem("coins")!);
    }, 200);
  }
}
