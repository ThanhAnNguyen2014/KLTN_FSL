export class House {
    constructor(
        title: string,
        status: string,
        rate: number,
        image: string,
        address: string,
        price: number,
        range: string,
        latitude: string,
        longitude: string,
        service_price: ServicePrice
    ) { }
}
export class ServicePrice {
    constructor(
        electricity_price: number,
        garbage_price: number,
        internet_price: number,
        water_price: number,
    ) { }
}