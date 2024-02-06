import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';

/**
 * Directiva para mostrar un tooltip.
 * @Directive
 * @example
 * <div customTooltip [tooltip]="Texto del tooltip">Contenido</div>
 */
@Directive({
  selector: '[customTooltip]',
})
export class TooltipDirective {
  /** Texto del tooltip */
  @Input() public tooltip: string = '';

  /** Desplazamiento vertical del tooltip */
  @Input() public tooltipOffsetTop: number = 0;

  /** Referencia al componente del tooltip */
  private _componentRef: ComponentRef<any> | null = null;

  constructor(
    private _elementRef: ElementRef,
    private _appRef: ApplicationRef,
    private _viewContainerRef: ViewContainerRef
  ) {}

  /**
   * Muestra el tooltip.
   * @returns {void}
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this._componentRef === null) {
      this._componentRef =
        this._viewContainerRef.createComponent(TooltipComponent);
      const domElem = (this._componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);

      this.setTooltipComponentProperties();
    }
  }

  /**
   * Establece las propiedades del componente del tooltip.
   * @returns {void}
   * @private
   */
  private setTooltipComponentProperties(): void {
    if (this._componentRef !== null) {
      this._componentRef.instance.tooltip = this.tooltip;
      const { left, right, bottom } =
        this._elementRef.nativeElement.getBoundingClientRect();
      this._componentRef.instance.left = (right - left) / 2 + left;
      this._componentRef.instance.top = bottom + this.tooltipOffsetTop;
    }
  }

  /**
   * Oculta el tooltip.
   * @returns {void}
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * Destruye el componente del tooltip.
   * @returns {void}
   * @private
   */
  destroy(): void {
    if (this._componentRef !== null) {
      this._appRef.detachView(this._componentRef.hostView);
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }
}
