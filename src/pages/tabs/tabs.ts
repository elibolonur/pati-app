import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ActiveTopicsPage } from '../active-topics/active-topics';
import { FavoriteTopicsPage } from '../favorite-topics/favorite-topics';
import { PmPage } from '../pm/pm';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ActiveTopicsPage;
  tab3Root = FavoriteTopicsPage;
  tab4Root = PmPage;

  constructor() {

  }
}
