import { Component, OnInit } from '@angular/core';
import { LocalStorageConsts } from 'src/app/consts/localstorage-consts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}

  public logout(): void {
    localStorage.removeItem(LocalStorageConsts.TOKEN);
    window.location.reload();
  }
}
