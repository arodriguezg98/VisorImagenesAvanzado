import { Component, OnInit, VERSION } from "@angular/core";
import { MouseTracker, PointerMouseTrackerEvent, Viewer } from "openseadragon";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import Toolbar from "@recogito/annotorious-toolbar";
import BetterPolygon from "@recogito/annotorious-better-polygon";
import SelectorPack from "@recogito/annotorious-selector-pack";
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
  archivoSeleccionado = "";

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

    const $this = this;

    const updateZoom = function () {
      const zoom = $this.openSeadragon.viewport.getZoom(true);
      const imageZoom = $this.openSeadragon.viewport.viewportToImageZoom(zoom);

      // zoomEl.innerHTML = 'Zoom:<br>' + (Math.round(zoom * 100) / 100) +
      //     '<br><br>Image Zoom:<br>' + (Math.round(imageZoom * 100) / 100);

      console.log('Zoom: ' + zoom, 'Image zoom: ' + imageZoom);
    };

    this.openSeadragon.addHandler('open', function() {
      const tracker = new MouseTracker({
        element: $this.openSeadragon.container,
        moveHandler: function (event) {
          const webPoint = (event as PointerMouseTrackerEvent)?.position;
          const viewportPoint =
            $this.openSeadragon.viewport.pointFromPixel(webPoint);
          const imagePoint =
            $this.openSeadragon.viewport.viewportToImageCoordinates(viewportPoint);
          const zoom = $this.openSeadragon.viewport.getZoom(true);
          const imageZoom = $this.openSeadragon.viewport.viewportToImageZoom(zoom);
  
          // positionEl.innerHTML = 'Web:<br>' + webPoint.toString() +
          //     '<br><br>Viewport:<br>' + viewportPoint.toString() +
          //     '<br><br>Image:<br>' + imagePoint.toString();
  
          console.log('Web: ' + webPoint, 'Viewport: ' + viewportPoint, 'Image: ' + imagePoint);
  
          updateZoom();
        },
      });
  
      tracker.setTracking(true);
  
      $this.openSeadragon.addHandler('animation', updateZoom); 
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
      url,
    });
  }

  getPlano(file: string): string {
    const nombre = file.split("/").slice(-1)[0].split(".")[0];
    const spl = nombre.split("_");

    return spl[1];
  }
}
