import { Component, OnInit } from '@angular/core';
import { LocalStorageConsts } from 'src/app/consts/localstorage-consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}

  public logout(): void {
    localStorage.removeItem(LocalStorageConsts.TOKEN);
    window.location.reload();
  }
}
