import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../services/app.service';
import { MovieStatus } from '../../models/movie-status';

@Component({
  selector: 'app-movie-status',
  templateUrl: './movie-status.component.html',
  styleUrls: ['./movie-status.component.scss']
})
export class MovieStatusComponent implements OnInit {
  title = 'app';
  currentStatus = false;
  timer: any;
  constructor(public appService: AppService) { }
  ngOnInit() {
    const self = this;
    self.loop();
    this.timer = setInterval(() => {
      self.loop();
    }, 5000);
  }

  loop() {
    const self = this;
    this.getData().then(value => {
      self.currentStatus = value.status;
      if (self.currentStatus === true) {
        clearInterval(this.timer);
        console.log(self.currentStatus);
        this.notifyMe();
        const r = confirm('Tickets are open for Imax large screen!');
        if (r === true) {
          window.open('https://in.bookmyshow.com/buytickets/prasads-large-screen/cinema-hyd-PRHY-MT/20180427');
        } else {
          alert('Tickets are open for Imax large screen!');
        }
      } else {
        console.log(self.currentStatus);
      }
    });
  }

  getData() {
    return this.appService.checkValue().then(value => {
      console.log(value);
      return value;
    });
  }

  notifyMe() {
    if (Notification) {
      Notification.requestPermission().then(function (result) {
        if (result === 'granted') {
          const notification = new Notification('Notification title', { icon: null, body: 'Succesfully added notifications!' });
        }
      });
    }
  }

}

