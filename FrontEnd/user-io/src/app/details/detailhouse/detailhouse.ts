export class House {
    title: string;
    status: string;
    rate: number;
    image: string;
    address: string;
    price: number;
    range: string;
    latitude: number;
    longitude: number;
    service_price: ServicePrice

}
export class ServicePrice {

    electricity_price: number;
    garbage_price: number;
    internet_price: number;
    water_price: number;

}