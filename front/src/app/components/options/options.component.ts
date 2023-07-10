import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent {
  @Input('title')title = "";
  @Input('url')url = "";
  @Input('thumbnail')thumbnail = "";

  download(){
    console.log("==> ", this.title, this.url)
  }
}
