import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {SwitchLanguageService} from "../../services/switch-languages.service";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar-form',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './navbar-form.component.html',
  styleUrls: ['./navbar-form.component.css']
})
export class NavbarFormComponent{
  public isAuthed: boolean = !!localStorage.getItem('auth');
  public flag: boolean = false;
  public imageURL: string = "/assets/images/user.png";
  @ViewChild('SearchRequest') SearchRequest!: ElementRef;

  constructor(private router: Router, private switchLanguage: SwitchLanguageService,
              private el: ElementRef, ) {}
// private sharedService: SharedService
  public Search(request: string): void {
    // Define mappings of destination URLs to arrays of terms
    const termMappings: { [key: string]: string[] } = {
      'app/menu-page': ['home', 'menu', 'main', 'dashboard', 'главное меню', 'главная', 'menü', 'əsas'],
      'app/messages-menu-page': ['messages', 'inbox', 'mail', 'почта', 'сообщения', 'mesajlar'],
      'app/send-message': ['send message', 'compose', 'write message', 'написать', 'отправить', 'mesaj yazmaq', 'göndərmək'],
      'app/get-messages': ['inbox', 'received', 'mailbox', 'полученные', 'входящие', 'gələnlər', 'mesajlar'],
      'app/users-list': ['users', 'contacts', 'address book', 'список пользователей', 'адресная книга', 'istifadəçilər', 'əlaqə siyahısı'],
      'app/quizzes-list': ['quizzes', 'tests', 'my quizzes', 'мои викторины', 'викторины', 'quizlər', 'testlər'],
      'app/send-news': ['send news', 'broadcast', 'announcement', 'рассылка', 'объявление', 'yenilik göndərmək', 'elan'],
      'app/add-item-to-store': ['add item', 'store', 'shop', 'добавить товар', 'магазин', 'element əlavə et', 'dükan'],
      'app/mykahoot-store': ['store', 'my kahoot', 'магазин', 'dükan', 'mykahoot dükanı'],
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
    let subMenu = this.el.nativeElement.querySelector("#subMenu");

    subMenu.classList.toggle("open-menu");
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
   // this.sharedService.backAuth(e);
  }
}
