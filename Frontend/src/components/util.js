// cashfreeLoader.js
import {load} from '@cashfreepayments/cashfree-js';

export async function loadCashfree() {
    const cashfree = await load({
        mode: "sandbox" //or production
    });
    return cashfree;
}
