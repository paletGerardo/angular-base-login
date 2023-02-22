import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Navbar, TemaSocio } from '../../shared/models/partnerTheme.model';
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
  public urlLogo: string | undefined;
  home: boolean=false;
  clicked: boolean=false;
  private _unsubscribeAll: Subject<any>;
  public floatButtonsDown: boolean = false;
  public textFilter: string = '';

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
    this.dashBoardService.getBarraNavegacion().subscribe((nav: Navbar) => {
        if (nav) {
          this.primaryColor = nav.color_primario_rgba;
          this.secundaryColor = nav.color_primario_rgba_light;
          this.bgColor = this.primaryColor;
          this.urlLogo = nav.url_logo;
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

  filterProducts($event: KeyboardEvent) {
    if ($event.keyCode === 13) {
      this.dashBoardService.getIdProductsToFilter(this.textFilter);
    }
  }

  onInputChange(event: any) {
    // ngModel no funciona, corregir error.
    this.textFilter = event.target.value;
  }
}
