import { Component, OnInit } from '@angular/core';
import { AnimationsService } from "../core/animations/animations.service";
import browser from 'browser-detect';
import { routeAnimations } from "../core/animations/route.animations";
import { LoadingService } from "../core/loading/loading.service";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ],
  animations: [routeAnimations]
} )
export class AppComponent implements OnInit {
  title = 'app-base-login';

  constructor(
    private animationsService: AnimationsService,
    private loadingService: LoadingService,
  ) {}

  public ngOnInit(): void {
    this.loadAnimations();
  }

  private loadAnimations(): void {
    if ( this.isIEorEdgeOrSafari() ) {
      this.animationsService.updateRouteAnimationType( false, false );
    } else {
      this.animationsService.updateRouteAnimationType( true, true );
    }
  }

  private isIEorEdgeOrSafari(): boolean {
    //@ts-ignore
    return [ 'ie', 'edge', 'safari' ].includes( browser().name.toLocaleLowerCase() );
  }
}
