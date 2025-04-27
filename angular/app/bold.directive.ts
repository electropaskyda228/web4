import {Directive, ElementRef, Renderer2, HostListener} from "@angular/core";

@Directive({
    selector: "[bold]",
    standalone: true,
    host: {
        "(mouseenter)": "onMouseEnter()",
        "(mouseleave)": "onMouseLeave()" 
    }
})
export class BoldDirective {
    constructor (private element: ElementRef, private renderer: Renderer2) {
        this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
    }

    private setFontWeight(val: string) {
        this.renderer.setStyle(this.element.nativeElement, "font-weight", val);
    }

    onMouseEnter() {
        this.setFontWeight("bold");
    }

    onMouseLeave() {
        this.setFontWeight("normal");
    }
}