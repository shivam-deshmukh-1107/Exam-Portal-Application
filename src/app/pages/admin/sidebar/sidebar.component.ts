import { Component } from '@angular/core';
import {
  faHome,
  faUser,
  faPlus,
  faList,
  faQ,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  home = faHome;
  user = faUser;
  list = faList;
  plus = faPlus;
  quiz = faQ;
  constructor() {}
  ngOnInit() {}
}
