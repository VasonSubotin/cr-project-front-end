import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {ResourcesComponent} from "./components/resources/resources.component";
import {ResourceComponent} from "./components/resources/resource/resource.component";
import {LogoutComponent} from "./reusable-components/logout.component/logout.component";
import {HeaderComponent} from "./reusable-components/header/header.component";
import {ScheduleComponent} from "./components/schedule/schedule.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatExpansionModule} from "@angular/material/expansion";
import {PageLoaderComponent} from "./reusable-components/page-loader/page-loader.component";
import {DropDownComponent} from "./reusable-components/drop-down/drop-down.component";
import {EditResourcePopupComponent} from "./reusable-components/popups/edit-resource-popup/edit-resource-popup.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatTabsModule} from "@angular/material/tabs";
import {RequestPopupComponent} from "./components/resources/resource/request-popup/request-popup.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    ResourcesComponent,
    ResourceComponent,
    HeaderComponent,
    ScheduleComponent,
    DropDownComponent,
    RequestPopupComponent,

    EditResourcePopupComponent,
    PageLoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    GoogleMapsModule,
    MatTabsModule
  ],
  entryComponents: [
    EditResourcePopupComponent
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
