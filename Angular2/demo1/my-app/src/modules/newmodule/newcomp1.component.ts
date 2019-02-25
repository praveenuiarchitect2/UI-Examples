import { Component, OnInit } from '@angular/core';

@Component({
  selector: "new-module",
  templateUrl: './newcomp.component1.html',
  styleUrls: ['./newcomp.component.scss']
})
export class newModule implements OnInit {
  isUnchanged: boolean = true;
  title: string = "Iam String";
  isSpecial: string = "off";
  evilTitle = 'Template <script>alert("evil never sleeps")</script>Syntax';
  heroImageUrl: string = "https://angular.io/assets/images/logos/angular/logo-nav@2x.png";
  constructor() { }

  ngOnInit() {
  }

}