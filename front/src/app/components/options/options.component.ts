import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { switchMap } from 'rxjs';
import { SseService } from 'src/app/services/sse.service';
import { YtdlService } from 'src/app/services/ytdl.service';

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

  constructor(private formBuilder: FormBuilder, private ytdlService: YtdlService, private sseService: SseService){}

  ngOnInit(){
    this.form = this.formBuilder.group({
      format: [null]
    })
  }
  
  submit(){ 
    console.log("==> DOWNLOAD : ", this.title, this.url)
    console.log("= value : ", this.form)
    this.ytdlService.download(this.url, this.form.value.format).pipe(
      switchMap(res=> this.sseService.createEventSource(res.id))
    ).subscribe()
  }
}
