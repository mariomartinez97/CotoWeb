import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ToursService } from '../services/tours.service';

declare let $: any;

@Component({
    selector: 'br-about',
    templateUrl: './templates/safety-first.component.html',
    styleUrls: ['./styles/about.component.css']

})

export class SafetyFirstComponent {
    Equipment: any;
    totalEquipment: number = 0;

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

    sendGrandTotal($event) {
        console.log("TEST")
        // var summ = Number($("#total[0]").text()) + Number($("#total[1]").text());
        //     console.log(summ);
        var td = document.querySelectorAll('#equipmentTbl > tbody > td:last-child');
        console.log(td);
        
        // var total = [].reduce.call(td, function(a, b) {
        //     console.log(a, b)
        //     return a + parseInt(b.innerText);
        // }, 0);
        var total  = [];
        console.log(td.length);
        for (let i = 0; i < td.length; i++) {
            
            total[i] += parseInt(td[i].textContent.replace('$', ''))
        }


        //total = parseInt(td[0].textContent.replace('$', '')) +  parseInt(td[1].textContent.replace('$', ''));
        // total += parseInt(td[1].innerHTML);
        
        function getSum(total, num) {
                return total + num;
            }
        
        document.getElementById('area_total').innerText = '$'+total.reduce(getSum);
    }

    grandTotal(amt, price) {
        price = parseInt(price, 10);
        this.totalEquipment += amt * price;
        
    }
}
