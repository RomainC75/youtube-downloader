import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input('title')title = "";
  @Input('url')url = "";
  @Input('thumbnail')thumbnail = "";
  selection="video";
  form!:FormGroup;

  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      format: [null]
    })
  }

  download(){
    console.log("==> ", this.title, this.url)
  }

  submit(){
    
    console.log("= value : ", this.form)
  }
}