import { OrderProduct } from "./order-product";
import { OrderState } from "./order-state";

export class Order {

    constructor(
        public id:number|null,
        public dateCreated:Date,
        public orderProducts:OrderProduct [],
        public userId:number,
        public state:OrderState
    
    ) {}
}
