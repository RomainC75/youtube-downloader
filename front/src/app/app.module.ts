import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { OptionsComponent } from './components/options/options.component';
import { SseService } from './services/sse.service';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ SseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
