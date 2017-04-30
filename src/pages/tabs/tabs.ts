import { Component } from '@angular/core';

import { ActiveTopicsPage } from '../active-topics/active-topics';
import { FavoriteTopicsPage } from '../favorite-topics/favorite-topics';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ActiveTopicsPage;
  tab3Root = FavoriteTopicsPage;

  constructor() {

  }
}
