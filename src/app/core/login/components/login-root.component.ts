import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login-root',
  template: `<router-outlet></router-outlet>`
})
export class LoginRootComponent implements OnDestroy{

  @HostListener('unloaded')
  ngOnDestroy() {
    console.log('Cleared');
  }
}
