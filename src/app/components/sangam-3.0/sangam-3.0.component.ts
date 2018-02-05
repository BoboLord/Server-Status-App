import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sangam-3.0',
  templateUrl: './sangam-3.0.component.html',
  styleUrls: ['./sangam-3.0.component.scss']
})

export class SangamComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        window.open('https://accounts.google.com/signin/oauth/identifier?client_id=326621612300-lenba9rehne5osmfollsn3193jrq60k0.apps.googleusercontent.com&as=eAhJajucLA8IdMgz9YGMDdbQT5yqyNu-bUpaS20AoEYYqEwIZprNe1B63w9gvj0YBDnu5VlvJs6SUXVgzvd6TqfBjfXadz-fZURIc2VSx4x5WVIP-uvfvQ4aSYnyBPnUv_W_hR3CQxftoYHmFIKvtTDQBwHMur4rujSRtzKaKf8&destination=http%3A%2F%2Fsangam.ggktech.com&approval_state=!ChRFT3VvX1Rna1FteGhJZVZ1WkQ1bhIfVTBlRlh2Q3dGVjRRVU9xWmlfQjdtUjhFSFlSc0ZoWQ%E2%88%99ACThZt4AAAAAWnnWrzcSoT80XwZznR9GZ5hF_pfw7w4m&xsrfsig=AHgIfE_sAylgTUAB8_4FxTcV7Ngy7ozEpg&flowName=GeneralOAuthFlow', 'a');
    }
}
