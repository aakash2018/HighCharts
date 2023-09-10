import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
// import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [
    AppComponent,
    // AngularDraggableModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    RightsidebarComponent,
    LeftsidebarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
