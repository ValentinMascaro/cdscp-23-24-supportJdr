import { Injectable } from '@angular/core';
import PubNub from 'pubnub';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubnubService {
  private pubnub: PubNub;
  public messages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    this.pubnub = new PubNub({
      publishKey: 'pub-c-40ebf64f-2815-4aa8-9b3f-771dab9d24de',
      subscribeKey: 'sub-c-2694f28d-f9e7-42e0-bad7-7bce1c2c7647',
      userId: 'server-user-id' 
    });

    this.pubnub.addListener({
      message: (msg) => {
        this.messages.next([...this.messages.getValue(), msg.message]);
      }
    });

    this.pubnub.subscribe({
      channels: ['game_channel']
    });
  }

  sendMessage(message: string, sender: string, recipient: string): void {
    this.pubnub.publish({
      channel: 'game_channel',
      message: { content: message, sender: sender, recipient: recipient, timestamp: new Date() }
    });
  }
}
