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
export class NavbarFormComponent{
  public username: string = localStorage.getItem("Login")!;
  public flag: boolean = false;
  public imageURL: string = "/assets/images/user.png";
  @ViewChild('SearchRequest') SearchRequest!: ElementRef;

  constructor(private router: Router, private switchLanguage: SwitchLanguageService,
              private el: ElementRef, private sharedService: SharedService) {}

  public Search(request: string): void {
    // Define mappings of destination URLs to arrays of terms
    const termMappings: { [key: string]: string[] } = {
      'player-options-form': ['home', 'menu', 'main', 'меню', 'главное', 'menü', 'əsas'],
      'creating-quiz-option-form': ['create', 'creating', 'quiz', 'создать', 'создание', 'викторину', 'викторины', 'viktorina', 'yaratmaq'],
      'player-survey-choosing-form': ['play', 'играть', 'oyna'],
      'profile-form': ['profile', 'профиль', 'profil'],
      'about-form': ['about', 'про', 'нас', 'bizim', 'haqqında'],
      'contacts-form': ['contact', 'связь', 'əlaqə', 'help', 'support', 'помощь', 'поддержка', 'kömək', 'dəstək'],
      'contact-list-form': ['contact list', 'data', 'данные', 'informasiya'],
      'stats-form': ['stat', 'stats', 'статистика', 'statistika'],
      'choose-field-form': ['top', 'топ', '10', 'rating', 'reytinq', 'рейтинг'],
      'my-quizzes-form': ['quizzes', 'my', 'мои', 'mənim'],
      'my-profile-form': ['edit', 'редакт', 'redakt'],
      'delete-acc-form': ['delete', 'удалить', 'silmək'],
      'settings-choice-form': ['settings', 'настройки', 'ayarlar'],
      //'settings-choice-form': ['change', 'изменить', 'dəyiş'] // Note: This should navigate somewhere else, check and update
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

  switchLang(lang: string): void {
    this.switchLanguage.switchLang(lang);
  }

  toggleMenu(): void{
    let subMenu = this.el.nativeElement.querySelector(".sub-menu-wrap");

    if (subMenu.style.display == "none") subMenu.style.display = "block";
    else subMenu.style.display = "none";
  }

  ToProfile(): void{
    this.router.navigate(['/app/my-profile-form']);
  }

  ToSendFeedback(): void{
    this.router.navigate(['/app/contacts-form']);
  }

  ToSettings(): void{
    this.router.navigate(['/app/settings-choice-form']);
  }

  ToDeleteAcc(): void{
    this.router.navigate(['/app/delete-acc-form']);
  }

  OpenPhotoModalWindow(): void{
    this.flag = true;
  }

  Logout(e: any): void{
    this.sharedService.backAuth(e);
  }
}
