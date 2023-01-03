import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener, isDevMode,
  OnInit,
} from '@angular/core';
import {TemaSocio} from '../../shared/models/partnerTheme.model';
import { DashboardService } from '../../dashboard.service';
import { LoadingService } from '../../../core/loading/loading.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements AfterViewInit, OnInit {
  @BlockUI() blockUI: NgBlockUI | undefined;
  public hover: boolean = false;
  search : String ="";
  public partnerTheme: TemaSocio | null | undefined;
  public showMenuButton: boolean | undefined;
  public backGroundClass = false;

  public primaryColor: string = 'grey';
  public secundaryColor: string = '';
  public bgColor: string | undefined;
  home: boolean=false;
  clicked: boolean=false;
  private _unsubscribeAll: Subject<any>;
  public floatButtonsDown: boolean = false;

  constructor(
    private dashBoardService: DashboardService,
    private loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this._unsubscribeAll = new Subject();

  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();

  }
  ngOnInit() {
    //@ts-ignore
    this.blockUI.start();
    this.home=true;
    this.showMenuButton = false;
    this.loadingService.tryToStartLoading();
    this.dashBoardService.partnerTheme$.subscribe(
      (partnerThemes: TemaSocio | undefined) => {
        if (partnerThemes && partnerThemes.navbar.color_primario_rgba) {
          this.partnerTheme = partnerThemes;
          this.primaryColor = partnerThemes.navbar.color_primario_rgba;
          this.secundaryColor = partnerThemes.navbar.color_primario_rgba_light;
          this.bgColor = this.primaryColor;
          this.loadingService.tryToStopLoading();
        } else if (partnerThemes) {
          this.partnerTheme = partnerThemes;
          this.primaryColor = partnerThemes.color.primario_rgba;
          this.secundaryColor = partnerThemes.color.primario_rgba_light;
          this.bgColor = this.primaryColor;
          this.loadingService.tryToStopLoading();
        }
      }
    );
    this.dashBoardService.linkNavbarChanged
   .pipe(debounceTime(1000))
    .subscribe({
      next: res => {
        this.home=res;
       }
    })
  }
  //   @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    if(window.scrollY < 100) {
      this.bgColor = this.primaryColor;
      this.floatButtonsDown = false
    } else {
      this.bgColor = this.secundaryColor
      this.floatButtonsDown = true

    }

    this.backGroundClass = window.scrollY > 100;
  }

  scrollCall(id:any){
    this.dashBoardService.navBarOnChanged.next(id);
  }

  showInput(){
    this.clicked=!this.clicked;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public upButtons(): void {
    this.floatButtonsDown = true
  }
}
