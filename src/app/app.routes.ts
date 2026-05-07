import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Apothecary } from './pages/apothecary/apothecary';
import { Bulletin } from './pages/bulletin/bulletin';
import { Contact } from './pages/contact/contact';
import { Corporate } from './pages/corporate/corporate';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about', component: About},
  { path: 'corporate', component: Corporate},
  { path: 'services', component: Services},
  { path: 'apothecary', component: Apothecary},
  { path: 'bulletin', component: Bulletin},
  { path: 'contact', component: Contact},
  { path: '**', redirectTo: '' }
];