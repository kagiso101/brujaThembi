import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Apothecary } from './pages/apothecary/apothecary';
import { Bulletin } from './pages/bulletin/bulletin';
import { Contact } from './pages/contact/contact';
import { Corporate } from './pages/corporate/corporate';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';

export const routes: Routes = [
  { path: '', component: Home, title: 'Bruja Thembi — Home' },
  { path: 'about', component: About, title: 'Bruja Thembi — About' },
  { path: 'corporate', component: Corporate, title: 'Bruja Thembi — For Teams' },
  { path: 'services', component: Services, title: 'Bruja Thembi — Services' },
  { path: 'apothecary', component: Apothecary, title: 'Bruja Thembi — Somatic Apothecary' },
  { path: 'bulletin', component: Bulletin, title: 'Bruja Thembi — The Bulletin' },
  { path: 'contact', component: Contact, title: 'Bruja Thembi — Book Now' },
  { path: '**', redirectTo: '' }
];