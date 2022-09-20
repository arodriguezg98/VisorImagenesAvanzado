import { Component, OnInit, VERSION } from "@angular/core";
import { Viewer } from "openseadragon";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import Toolbar from "@recogito/annotorious-toolbar";
import BetterPolygon from '@recogito/annotorious-better-polygon';
import SelectorPack from '@recogito/annotorious-selector-pack';
import { AppService } from "./app.service";
import { Observable } from "rxjs";
import { ITermografiaJsonData } from "./models";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;

  archivos$ = new Observable<string[]>();
  data$ = new Observable<ITermografiaJsonData>();
  archivoSeleccionado = '';

  openSeadragon: Viewer | null = null;

  constructor(private readonly appService: AppService) {}

  ngOnInit(): void {
    // this.archivos$ = this.appService.getFilesNoParam('Almería_Silestone1_Planta1_Horno');
    this.archivos$ = this.appService.getFiles();

    this.openSeadragon = new Viewer({
      id: "image-viewer",
      animationTime: 0.4,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      maxZoomPixelRatio: 3,
      gestureSettingsMouse: {
        clickToZoom: false,
        scrollToZoom: true,
      },
    });

    this.openSeadragon.open({
      type: "image",
      url: "https://media.istockphoto.com/photos/almeria-cabo-gata-san-jose-beach-village-spain-picture-id1341402035",
    });

    const config = {};
    const annotorious = Annotorious(this.openSeadragon, config);

    BetterPolygon(annotorious);
    SelectorPack(annotorious);
    Toolbar(annotorious, document.getElementById("toolbar-container"));
  }

  // FROM TERMOGRAFIA

  onClick(url: string): void {
    this.archivoSeleccionado = url;
    // this.data$ = this.appService.getJsonFile(file);
    // // this.seleccionado.next(file);

    this.openSeadragon.open({
      type: "image",
      url
    });
  }

  getPlano(file: string): string {
    const nombre = file.split('/').slice(-1)[0].split('.')[0];
    const spl = nombre.split('_');

    return spl[1];
  }
}
