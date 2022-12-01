import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener, isDevMode,
  OnInit,
} from '@angular/core';
import { PartnerTheme } from '../../shared/models/partnerTheme.model';
import { DashboardService } from '../../dashboard.service';
import { LoadingService } from '../../../core/loading/loading.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {environment as env} from "../../../../environments/environment";
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewInit, OnInit {
  public hover: boolean = false;
  search : String ="";
  public partnerTheme: PartnerTheme | null | undefined;
  public showMenuButton: boolean | undefined;
  public backGroundClass = false;

  public primaryColor: string = 'grey';
  public secundaryColor: string = '';
  public bgColor: string = 'rgb(0, 131, 203)';
  home: boolean=false;
  clicked: boolean=false;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
    if(isDevMode()){
      // document.cookie = `cuit_socio=${env.CUIT_SOCIO}` ;
    }
    if(document.cookie  !== "cuit_socio=30697265895"){
      console.log("carre");
      this.bgColor = 'rgb(0, 131, 203)';
    } else {
      console.log("musi");
      this.bgColor = 'rgb(227,6,19)';
    }
  }
  ngOnInit() {
    this.home=true;
    this.showMenuButton = false;
    this.loadingService.tryToStartLoading();
    this.dashBoardService.partnerTheme$.subscribe(
      (partnerThemes: PartnerTheme | null) => {
        if (partnerThemes) {
          this.partnerTheme = partnerThemes;
          this.primaryColor = partnerThemes.colors.rgba_primary;
          this.secundaryColor = partnerThemes.colors.rgba_primary_light;
          this.loadingService.tryToStopLoading();
        }
      }
    );
    this.dashBoardService.linkNavbarChanged
   .pipe(debounceTime(1000))
    .subscribe({
      next: res => {
        console.log("home-->",res);
        this.home=res;
       }
    })
  }
  //   @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if(window.scrollY < 100) {
      this.bgColor = this.primaryColor;
    } else {
      this.bgColor = this.secundaryColor

    }

    this.backGroundClass = window.scrollY > 100;
  }

  scrollCall(id:any){
    this.dashBoardService.navBarOnChanged.next(id);
  }

  showInput(){
    this.clicked=!this.clicked;
  }
}
