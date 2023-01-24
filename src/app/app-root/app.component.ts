import { Component, isDevMode, OnInit } from '@angular/core';
import { AnimationsService } from "../core/animations/animations.service";
import browser from 'browser-detect';
import { routeAnimations } from "../core/animations/route.animations";
import { LoadingService } from "../core/loading/loading.service";
import { environment as env} from "../../environments/environment";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { LoadingTempleteComponent } from "../core/loading/loading-templete/loading-templete.component";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.sass' ],
  animations: [routeAnimations]
} )
export class AppComponent implements OnInit {
  title = 'app-base-login';
  @BlockUI() blockUI: NgBlockUI | undefined;
  blockTemplate: LoadingTempleteComponent | undefined;
  constructor(
    private animationsService: AnimationsService,
    private loadingService: LoadingService,

  ) {
    if(isDevMode()){
      document.cookie = `cuit_socio=${env.CUIT_SOCIO}` ;
    }
  }

  public ngOnInit(): void {
    this.loadingService.tryToStartLoading();
    this.loadAnimations();
    //todo falta completar codigo para font dinamica.
//     let cuit = 'gerr';
//     let url = `http://200.114.219.199/service/landing/themes/getFontByCuit/${cuit}/primary/type/`;
//
//     let fontPrimary = `
//     @font-face {
//         font-family: 'font-gerr';
//         src: url(http://200.114.219.199/service/landing/themes/getFontByCuit/30687310434/primary/type/font_primary.ttf);
//     }
// `;
//
//     document.styleSheets[0].insertRule(fontPrimary, 0);
//
//
//     let fontPrimary2 = document.styleSheets[0]['href'];
//     console.log(fontPrimary2);
//     // @ts-ignore
//     document.styleSheets[0]['href'] = `url('${url}gerr.ttf')`;
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
