import { Component, OnInit, VERSION } from "@angular/core";
import { Viewer } from "openseadragon";
import * as Annotorious from "@recogito/annotorious-openseadragon";
import Toolbar from "@recogito/annotorious-toolbar";
import BetterPolygon from '@recogito/annotorious-better-polygon';
import SelectorPack from '@recogito/annotorious-selector-pack';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;

  ngOnInit(): void {
    const openSeadragon = new Viewer({
      id: "image-viewer",
      animationTime: 0.4,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      maxZoomPixelRatio: 3,
      gestureSettingsMouse: {
        clickToZoom: false,
        scrollToZoom: true,
      },
    });

    openSeadragon.open({
      type: "image",
      url: "https://media.istockphoto.com/photos/almeria-cabo-gata-san-jose-beach-village-spain-picture-id1341402035",
    });

    const config = {};
    const annotorious = Annotorious(openSeadragon, config);

    BetterPolygon(annotorious);
    SelectorPack(annotorious);
    Toolbar(annotorious, document.getElementById("toolbar-container"));
  }
}
