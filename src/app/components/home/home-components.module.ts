import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeBottomNavComponent } from './home-bottom-nav/home-bottom-nav.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeMapComponent } from './home-map/home-map.component';

@NgModule({
  declarations: [HomeHeaderComponent, HomeBannerComponent, HomeMapComponent, HomeBottomNavComponent],
  imports: [CommonModule],
  exports: [HomeHeaderComponent, HomeBannerComponent, HomeMapComponent, HomeBottomNavComponent]
})
export class HomeComponentsModule {}
