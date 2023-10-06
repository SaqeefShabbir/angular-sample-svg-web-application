import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-maker-dashboard',
  templateUrl: './svg-maker-dashboard.component.html',
  styleUrls: ['./svg-maker-dashboard.component.scss']
})
export class SvgMakerDashboardComponent {

  public selectedFile: File;
  public svgCount: number = 1;
  public draggingElement: any;

  public svgDownloadCount: number = 1;

  async onFileSelected(e: Event) {
    this.selectedFile = (e.target as HTMLInputElement).files![0];

    (e.target as HTMLInputElement).value = '';

    let itemsConatinerDiv = document.getElementById('items-container');
    let draggableComponent = document.getElementById('draggableComponent');
    let newDraggableComponent = draggableComponent?.cloneNode(true) as HTMLDivElement;

    newDraggableComponent.setAttribute("id", "svgComponent_" + this.svgCount);

    newDraggableComponent.removeAttribute("hidden");

    let svgText = await getSvgText(this.selectedFile);

    newDraggableComponent.innerHTML += svgText;

    newDraggableComponent.addEventListener("dragstart", this.drag);
    newDraggableComponent.addEventListener("mousemove", this.onMouseMove);
    newDraggableComponent.addEventListener("mousedown", this.onMouseDown);
    newDraggableComponent.addEventListener("mouseup", this.onMouseUp);
    newDraggableComponent.addEventListener("mouseleave", this.onMouseLeave);

    itemsConatinerDiv?.appendChild(newDraggableComponent);

    let embeddedSvg = newDraggableComponent.getElementsByTagName('svg')[0];

    embeddedSvg.setAttribute('id', 'svgComponent_' + this.svgCount + '_svg');
    embeddedSvg.setAttribute('height', '100');
    embeddedSvg.setAttribute('width', '100');
    
    this.svgCount++;
  }

  async onPlanFileSelected(e: Event) {
    this.selectedFile = (e.target as HTMLInputElement).files![0];

    (e.target as HTMLInputElement).value = '';

    let svgConatinerDiv = document.getElementById('svg-container');
    let draggableComponent = document.getElementById('draggableComponent');
    let newDraggableComponent = draggableComponent?.cloneNode(true) as HTMLDivElement;

    newDraggableComponent.setAttribute("id", "svgPlanComponentDiv");

    newDraggableComponent.classList.remove("draggableComponent");

    newDraggableComponent.removeAttribute("hidden");

    let svgText = await getSvgText(this.selectedFile);

    newDraggableComponent.innerHTML += svgText;

    svgConatinerDiv?.appendChild(newDraggableComponent);

    let embeddedSvg = newDraggableComponent.getElementsByTagName('svg')[0];

    embeddedSvg.setAttribute('id', 'svgPlanComponent');
  }

  allowDrop(ev: any) {
    ev.preventDefault();
  }
  
  drag(ev: any) {
    let divElement = ev.target as any;
    let svgElement = divElement.getElementsByTagName('svg')[0];
    ev.dataTransfer.setData("text", svgElement.id);
  }

  async dropInItemContainer(ev: any) {
    ev.preventDefault();
    
    var data = ev.dataTransfer.getData("text").split('_');

    var holder = data[0];
    var id = data[1];
    var name = data[2];

    if (holder == 'svgComponent') {
      var divElement = document.getElementById(holder + "_" + id);
      divElement?.appendChild(document.getElementById(ev.dataTransfer.getData("text"))!);

      // start of positioning code
      const divPoint = this.getDivPointByItems(event, divElement);
      this.setPosition(divElement, { x: divPoint.x, y: divPoint.y  })
    }
    else if (holder == 'svgContainer') {
      let itemsConatinerDiv = document.getElementById('items-container');
      let draggableComponent = document.getElementById('draggableComponent');
      let newDraggableComponent = draggableComponent?.cloneNode(true) as HTMLDivElement;

      newDraggableComponent.setAttribute("id", "svgComponent_" + id);

      newDraggableComponent.removeAttribute("hidden");

      newDraggableComponent.appendChild(document.getElementById(ev.dataTransfer.getData("text"))!);

      newDraggableComponent.addEventListener("dragstart", this.drag);
      newDraggableComponent.addEventListener("mousemove", this.onMouseMove);
      newDraggableComponent.addEventListener("mousedown", this.onMouseDown);
      newDraggableComponent.addEventListener("mouseup", this.onMouseUp);
      newDraggableComponent.addEventListener("mouseleave", this.onMouseLeave);

      itemsConatinerDiv?.appendChild(newDraggableComponent);

      let embeddedSvg = newDraggableComponent.getElementsByTagName('svg')[0];

      embeddedSvg.setAttribute('id', 'svgComponent_' + id + '_svg');
      embeddedSvg.setAttribute('height', '100');
      embeddedSvg.setAttribute('width', '100');

      var element = document.getElementById(holder + "_" + id);
      element?.remove();
    }
  }

  dropInSvgContainer(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text").split('_');

    var holder = data[0];
    var id = data[1];
    var name = data[2];

    if (holder == 'svgContainer') {
      var divElement = document.getElementById(holder + "_" + id);
      divElement?.appendChild(document.getElementById(ev.dataTransfer.getData("text"))!);

      // start of positioning code
      const divPoint = this.getDivPointBySvg(event, divElement);
      this.setPosition(divElement, { x: divPoint.x, y: divPoint.y  })
    }
    else if (holder == 'svgComponent') {
      let svgConatinerDiv = document.getElementById('svg-container');
      let draggableComponent = document.getElementById('draggableComponent');
      let newDraggableComponent = draggableComponent?.cloneNode(true) as HTMLDivElement;

      newDraggableComponent.setAttribute("id", "svgContainer_" + id);

      newDraggableComponent.removeAttribute("hidden");

      newDraggableComponent.appendChild(document.getElementById(ev.dataTransfer.getData("text"))!)

      newDraggableComponent.addEventListener("dragstart", this.drag);
      newDraggableComponent.addEventListener("mousemove", this.onMouseMove);
      newDraggableComponent.addEventListener("mousedown", this.onMouseDown);
      newDraggableComponent.addEventListener("mouseup", this.onMouseUp);
      newDraggableComponent.addEventListener("mouseleave", this.onMouseLeave);
      newDraggableComponent.addEventListener("click", this.onMouseClick);

      svgConatinerDiv?.appendChild(newDraggableComponent);

      let embeddedSvg = newDraggableComponent.getElementsByTagName('svg')[0];

      embeddedSvg.setAttribute('id', 'svgContainer_' + id + '_svg');
      embeddedSvg.setAttribute('height', '100');
      embeddedSvg.setAttribute('width', '100');

      var element = document.getElementById(holder + "_" + id);
      element?.remove();
    }
  }

  // drop(ev: any) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("text");
  //   ev.target.appendChild(document.getElementById(data));

  //   document.getElementById(data)!.setAttribute('draggable', 'true');

  //   const svgPoint = this.getSVGPoint(event, document.getElementById(data));
  //   this.setPosition(document.getElementById(data), { x: svgPoint.x, y: svgPoint.y  });
  // }

  private setPosition(element: any, coord: { x: any, y: any }) {
    element.style.position = "absolute";
    element.style.top = coord.y + "px";
    element.style.left = coord.x + "px";
  }

  onMergeLinkClick() {
    
  }

  onDownloadLinkClick() {
    //get svg element.
    var svg = document.getElementById("svgPlanComponentDiv")!.getElementsByTagName('svg')[0];
    var name = 'svg_' + this.svgDownloadCount;
    saveSvg(svg, name);
    this.svgDownloadCount++;
  }

  onMouseClick(event: any): void {
    if (event.ctrlKey) {
      let divElement = event.currentTarget as HTMLDivElement;

      let divHeight: number = divElement.getAttribute("height") ? parseInt(divElement.getAttribute("height")!.toString()) : 0;
      let divWidth: number = divElement.getAttribute("width") ? parseInt(divElement.getAttribute("width")!.toString()) : 0;

      divHeight += 5;
      divWidth += 5;

      divElement.setAttribute("height", divHeight.toString());
      divElement.setAttribute("width", divWidth.toString());

      console.log(divElement)

      let svgElement = event.currentTarget.getElementsByTagName('svg')[0] as SVGElement;

      let svgHeight: number = svgElement.getAttribute("height") ? parseInt(svgElement.getAttribute("height")!.toString()) : 0;
      let svgWidth: number = svgElement.getAttribute("width") ? parseInt(svgElement.getAttribute("width")!.toString()) : 0;

      svgHeight += 5;
      svgWidth += 5;

      svgElement.setAttribute("height", svgHeight.toString());
      svgElement.setAttribute("width", svgWidth.toString());

      console.log(svgElement)
    }

    if (event.altKey) {
      let divElement = event.currentTarget as HTMLDivElement;

      let divHeight: number = divElement.getAttribute("height") ? parseInt(divElement.getAttribute("height")!.toString()) : 0;
      let divWidth: number = divElement.getAttribute("width") ? parseInt(divElement.getAttribute("width")!.toString()) : 0;

      divHeight -= 5;
      divWidth -= 5;

      divElement.setAttribute("height", divHeight.toString());
      divElement.setAttribute("width", divWidth.toString());

      console.log(divElement)

      let svgElement = event.currentTarget.getElementsByTagName('svg')[0] as SVGElement;

      let svgHeight: number = svgElement.getAttribute("height") ? parseInt(svgElement.getAttribute("height")!.toString()) : 0;
      let svgWidth: number = svgElement.getAttribute("width") ? parseInt(svgElement.getAttribute("width")!.toString()) : 0;

      svgHeight -= 5;
      svgWidth -= 5;

      svgElement.setAttribute("height", svgHeight.toString());
      svgElement.setAttribute("width", svgWidth.toString());

      console.log(svgElement)
    }
  }

  onMouseMove(event: any): void {
    if (this.draggingElement) {
      // start of positioning code
      let data = this.draggingElement.id.split('_');
      let holder = data[0];
      let id = data[1];
      let number = data[2];

      if (holder == 'svgComponent') {
        // const divPoint = this.getDivPointByItems(event, this.draggingElement);
        // this.setPosition(this.draggingElement, { x: divPoint.x, y: divPoint.y  })

        // const conatiner = document.getElementById('items-container');
        // const itemsRect = conatiner!.getBoundingClientRect();

        // const rect: any = {};
        // rect.x = itemsRect.x + event.offsetX;
        // rect.y = itemsRect.y + event.offsetY;

        // console.log(itemsRect)

        // this.draggingElement.style.position = "absolute";
        // this.draggingElement.style.top = rect.y + "px";
        // this.draggingElement.style.left = rect.x + "px";
      }
      else if (holder == 'svgContainer') {
        // const divPoint = this.getDivPointBySvg(event, this.draggingElement);
        // this.setPosition(this.draggingElement, { x: divPoint.x, y: divPoint.y  })

        const conatiner = document.getElementById(holder + '_' + id);
        const svgRect = conatiner!.getBoundingClientRect();

        const rect: any = {};
        rect.x = svgRect.x + event.offsetX;
        rect.y = svgRect.y + event.offsetY;

        console.log(svgRect)

        this.draggingElement.style.position = "absolute";
        this.draggingElement.style.top = rect.y + "px";
        this.draggingElement.style.left = rect.x + "px";
      }
    }
  }

  getDivPointByItems(event: any, element: any): any {
    // get the mouse coordinates and set them to the SVG point
    const conatiner = document.getElementById('items-container');
    const itemsRect = conatiner!.getBoundingClientRect();

    const rect: any = {};
    rect.x = itemsRect.x + event.offsetX;
    rect.y = itemsRect.y + event.offsetY;

    console.log(rect)

    // const CTM = element.getScreenCTM();
    // const divPoint = rect.matrixTransform(CTM.inverse());

    return rect;
  }

  getDivPointBySvg(event: any, element: any): any {
    // get the mouse coordinates and set them to the SVG point
    const conatiner = document.getElementById('svg-container');
    const svgRect = conatiner!.getBoundingClientRect();

    const rect: any = {};
    
    rect.x = svgRect.x + event.offsetX;
    rect.y = svgRect.y + event.offsetY;

    console.log(rect)

    // const CTM = element.getScreenCTM();
    // const divPoint = rect.matrixTransform(CTM.inverse());

    return rect;
  }

  onMouseDown(event: any): void {
    if (event.currentTarget.getAttribute('draggable')) {
      this.draggingElement = event.currentTarget;
    }
  }

  onMouseUp(event: any): void {
    this.draggingElement = null;
  }

  onMouseLeave(event: any): void {
    this.draggingElement = null;
  }

  getSVGPoint(event: any, element: any): SVGPoint {
    // get the mouse coordinates and set them to the SVG point
    const point = element.viewportElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;

    const CTM = element.viewportElement.getScreenCTM();
    const svgPoint = point.matrixTransform(CTM.inverse());

    return svgPoint;
  }
}

function saveSvg(svgElement: any, svgName: any) {
  svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  var svgData = svgElement.outerHTML;
  var preface = '<?xml version="1.0" standalone="no"?>\r\n';
  var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
  var svgUrl = URL.createObjectURL(svgBlob);
  let anchorElement = document.getElementById("svg-container-download-link")! as HTMLAnchorElement;
  anchorElement.href = svgUrl;
  anchorElement.download = svgName;
  anchorElement.click();
}

async function getSvgText(file: File) : Promise<any> {
  let value = await file.text().then(
    (value) => { return value}
    );
  return value;
}


