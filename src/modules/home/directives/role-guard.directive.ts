import { AuthService } from "src/modules/auth/services";
import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef
} from "@angular/core";

@Directive({
  selector: "[appRoleGuard]",
})
export class RoleGuardDirective {
  @Input() set appRoleGuard(roles: string[]) {
    this._authService.roleMatcher(roles)
      ? this._viewContainerRef.createEmbeddedView(this._templateRef)
      : this._viewContainerRef.clear();
  }

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<any>,
    private _authService: AuthService
  ) {}
}
