import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  signal
} from '@angular/core';
import { HomeComponentsModule } from '../../components/home/home-components.module';
import { environment } from '../../../environments/environment';

type MapStatus = 'idle' | 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-pontos-entrega-page',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './pontos-entrega.page.html',
  styleUrls: ['./pontos-entrega.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PontosEntregaPage implements AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapCanvas?: ElementRef<HTMLDivElement>;

  private map?: any;
  private readonly markers = new Map<number, any>();
  private lastMarkerIds = '';
  private readonly mapCenter = { lat: -12.2668, lng: -38.9669 };

  readonly googleMapsKey = environment.googleMapsApiKey ?? '';
  readonly mapStatus = signal<MapStatus>('idle');
  readonly mapReady = signal(false);
  readonly hasMapsKey = computed(() => this.googleMapsKey.trim().length > 0);

  readonly logoError = signal(false);
  readonly selectedId = signal(1);
  readonly selectedNeighborhood = signal('Todos');
  readonly selectedDonationType = signal('Todos');

  readonly schools = signal<School[]>([
    {
      id: 1,
      name: 'Escola Semente do Amanha',
      addressLine1: 'Av. Artemia Pires, 768 - Sim,',
      addressLine2: 'Feira de Santana - BA, 44085-370',
      neighborhood: 'Sim',
      donationTypes: ['Verduras', 'Legumes'],
      icon: 'assets/icone.png',
      lat: -12.2476,
      lng: -38.9633
    },
    {
      id: 2,
      name: 'Escola Construindo Sonhos',
      addressLine1: 'R. Heitor Villa Lobos, 210 - Conceicao,',
      addressLine2: 'Feira de Santana - BA, 44065-420',
      neighborhood: 'Conceicao',
      donationTypes: ['Frutas', 'Verduras'],
      icon: 'assets/Home.png',
      lat: -12.2597,
      lng: -38.965
    },
    {
      id: 3,
      name: 'Escola Professora Lidice',
      addressLine1: 'Av. Deputado Luis Eduardo, 92 - Centro,',
      addressLine2: 'Feira de Santana - BA, 44001-420',
      neighborhood: 'Centro',
      donationTypes: ['Graos', 'Legumes'],
      icon: 'assets/Cadastro.png',
      lat: -12.2608,
      lng: -38.963
    },
    {
      id: 4,
      name: 'Escola Asa do Saber',
      addressLine1: 'R. Carlos Gomes, 514 - Santa Monica,',
      addressLine2: 'Feira de Santana - BA, 44077-200',
      neighborhood: 'Santa Monica',
      donationTypes: ['Verduras', 'Frutas', 'Legumes'],
      icon: 'assets/Login.png',
      lat: -12.2872,
      lng: -38.9555
    }
  ]);

  readonly neighborhoods = computed(() => {
    const values = this.schools().map((school) => school.neighborhood);
    return ['Todos', ...Array.from(new Set(values))];
  });

  readonly donationTypes = computed(() => {
    const values = this.schools().flatMap((school) => school.donationTypes);
    return ['Todos', ...Array.from(new Set(values))];
  });

  readonly filteredSchools = computed(() => {
    const bairro = this.selectedNeighborhood();
    const tipo = this.selectedDonationType();

    return this.schools().filter((school) => {
      const matchBairro = bairro === 'Todos' || school.neighborhood === bairro;
      const matchTipo = tipo === 'Todos' || school.donationTypes.includes(tipo);
      return matchBairro && matchTipo;
    });
  });

  constructor() {
    effect(
      () => {
        const list = this.filteredSchools();
        const selectedId = this.selectedId();

        if (list.length && !list.some((school) => school.id === selectedId)) {
          this.selectedId.set(list[0].id);
        }

        if (this.mapReady()) {
          this.renderMarkers(list, this.selectedId());
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterViewInit(): void {
    void this.loadMap();
  }

  onLogoError(): void {
    this.logoError.set(true);
  }

  selectSchool(id: number): void {
    this.selectedId.set(id);
  }

  selectNeighborhood(value: string): void {
    this.selectedNeighborhood.set(value);
  }

  selectDonationType(value: string): void {
    this.selectedDonationType.set(value);
  }

  trackById(_: number, item: School): number {
    return item.id;
  }

  trackByValue(_: number, value: string): string {
    return value;
  }

  private async loadMap(): Promise<void> {
    if (!this.hasMapsKey()) {
      return;
    }

    if (this.mapStatus() === 'loading' || this.mapReady()) {
      return;
    }

    this.mapStatus.set('loading');

    try {
      await this.loadGoogleMapsApi();
      this.initMap();
      this.mapStatus.set('ready');
    } catch {
      this.mapStatus.set('error');
    }
  }

  private loadGoogleMapsApi(): Promise<void> {
    if ((window as any).google?.maps) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Maps load error'));
      document.head.appendChild(script);
    });
  }

  private initMap(): void {
    const mapElement = this.mapCanvas?.nativeElement;
    const googleRef = (window as any).google;

    if (!mapElement || !googleRef?.maps) {
      return;
    }

    this.map = new googleRef.maps.Map(mapElement, {
      center: this.mapCenter,
      zoom: 13,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#f7f9fb' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#5e6b76' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#f7f9fb' }] },
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#c7d4df' }] },
        { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#b8c6d1' }] },
        { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#d6eaf5' }] }
      ]
    });

    this.mapReady.set(true);
  }

  private renderMarkers(list: School[], selectedId: number): void {
    if (!this.map || !(window as any).google?.maps) {
      return;
    }

    const googleRef = (window as any).google;
    const markerIds = list.map((school) => school.id).join(',');

    this.markers.forEach((marker, id) => {
      if (!list.some((school) => school.id === id)) {
        marker.setMap(null);
        this.markers.delete(id);
      }
    });

    list.forEach((school) => {
      const isActive = school.id === selectedId;
      const icon = this.buildMarkerIcon(googleRef, isActive);
      const position = { lat: school.lat, lng: school.lng };
      const existing = this.markers.get(school.id);

      if (existing) {
        existing.setIcon(icon);
        existing.setPosition(position);
        existing.setMap(this.map);
      } else {
        const marker = new googleRef.maps.Marker({
          position,
          map: this.map,
          title: school.name,
          icon
        });

        marker.addListener('click', () => this.selectSchool(school.id));
        this.markers.set(school.id, marker);
      }
    });

    if (markerIds !== this.lastMarkerIds) {
      this.lastMarkerIds = markerIds;
      this.fitMapToMarkers(googleRef, list);
    } else {
      this.panToSelected(list, selectedId);
    }
  }

  private fitMapToMarkers(googleRef: any, list: School[]): void {
    if (!this.map || !list.length) {
      return;
    }

    if (list.length === 1) {
      this.map.setCenter({ lat: list[0].lat, lng: list[0].lng });
      this.map.setZoom(14);
      return;
    }

    const bounds = new googleRef.maps.LatLngBounds();
    list.forEach((school) => bounds.extend({ lat: school.lat, lng: school.lng }));
    this.map.fitBounds(bounds, 40);
  }

  private panToSelected(list: School[], selectedId: number): void {
    if (!this.map) {
      return;
    }

    const selected = list.find((school) => school.id === selectedId);
    if (selected) {
      this.map.panTo({ lat: selected.lat, lng: selected.lng });
    }
  }

  private buildMarkerIcon(googleRef: any, isActive: boolean): any {
    return {
      path: googleRef.maps.SymbolPath.CIRCLE,
      scale: isActive ? 9 : 7.5,
      fillColor: isActive ? '#7cdc6d' : '#e84c3d',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3
    };
  }
}

interface School {
  id: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  neighborhood: string;
  donationTypes: string[];
  icon: string;
  lat: number;
  lng: number;
}
