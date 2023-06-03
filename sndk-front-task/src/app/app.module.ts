import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { UserService } from './services/user.service';
import { LocalstorageService } from './services/localstorage.service';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [UserService, LocalstorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
