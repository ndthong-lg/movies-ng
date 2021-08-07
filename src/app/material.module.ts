import {NgModule} from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
  ]
})
export class AppMaterialModule { }
