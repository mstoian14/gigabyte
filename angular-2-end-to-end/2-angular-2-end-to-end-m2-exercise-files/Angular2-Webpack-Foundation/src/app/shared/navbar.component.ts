import { Component } from '@angular/core';

@Component({
    selector: 'navi-bar',
    template:  `
                    <div class="top-bar">
                        <div class="top-bar-title"><a [routerLink]="['']">GigaByte Gaming Company</a></div>
                        <div>
                            <ul class="menu">
                                <!--<li class="nav-menu"><a href="#">Menu Item 1</a></li>-->
                                <li class="nav-menu"><a [routerLink]="['/admin']">Admin Area</a></li>
                            </ul>
                        </div>
                    </div>
    `,
    styleUrls: ['./navbar.component.css']
})
export class NavComponent {}