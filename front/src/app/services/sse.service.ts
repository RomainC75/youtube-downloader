import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/sse';

export interface MessageData {
  status: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SseService {
  constructor() {}

  createEventSource(id: string): Observable<MessageData> {
    const eventSource = new EventSource(`${API_URL}/${id}`);

    return new Observable((observer) => {
      eventSource.onmessage = (event) => {
        const messageData: MessageData = JSON.parse(event.data);
        console.log('==> message Data ', messageData);
        observer.next(messageData);
      };
    });
  }
}
