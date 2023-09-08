import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faHome,
  faFile,
  faClipboardQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css'],
})
export class SidebarUserComponent {
  home = faHome;
  quiz = faClipboardQuestion;
  file = faFile;

  categories: any;

  constructor(private _cat: CategoryService, private _snack: MatSnackBar) {}
  ngOnInit() {
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this._snack.open('Error in loading Categories from server', '', {
          duration: 3000,
        });
      }
    );
  }
}
