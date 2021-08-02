import { Component } from '@angular/core';
import { ContentUserstableFacade } from '@training-app/content/userstable';

@Component({
  selector: 'training-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'training';
  constructor(private facade: ContentUserstableFacade) {}
  ngOnInit() {
    this.facade.init();
  }
}
