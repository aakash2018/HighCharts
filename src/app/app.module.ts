import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { WaterfallComponent } from './waterfall/waterfall.component';
import { HomeComponent } from './home/home.component';
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
    LeftsidebarComponent,
    WaterfallComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
