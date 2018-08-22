import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ToursService } from '../services/tours.service';


@Component({
    selector: 'br-about',
    templateUrl: './templates/safety-first.component.html',
    styleUrls: ['./styles/about.component.css']

})

export class SafetyFirstComponent {
    Equipment: any;

    constructor(private pser: PortfoliosService,
        private temp: SecuritiesService,
        private tourService: ToursService) {

    }

    ngOnInit(): void {
        this.tourService.getEquipment()
            .then(res => {
                this.Equipment = res;
            });
    }
}
