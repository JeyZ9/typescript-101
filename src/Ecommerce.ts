class Customer {
    private name: string;
    private address: any;

    constructor(name:string, address:any){
        this.name = name;
        this.address = address;
    }
}

class Order{
    private date: string;
    private status: string;
    private customer: Customer;
    // ทำภายหลัง
    private payment: Payment = new Cash(0, 0);
    private orderDetails:OrderDetails[] = [];

    constructor(date: string, status: string, customer:Customer, payment:Payment){
        this.date = date;
        this.status = status;
        this.customer = customer;
        this.payment = payment;
    }

    public calcSubTotal():number{
        return 0;
    }
    public calcTax():number{
        return 0;
    }
    public calcTotal():number{
        return 0;
    }
    public calcTotalWeight():number{
        return 0;
    }

    public addOrderDetails(orderDetail: OrderDetails):void{
        this.orderDetails.push(orderDetail);
    }

    public setPayment(payment: Payment):void{
        this.payment = payment
    }
}

abstract class Payment{
    private amount:number;
    
    constructor(amount:number){
        this.amount = amount;
    }
}

class Cash extends Payment{
    private cashTendered: number;
    constructor(cashTendered:number, amount:number){
        super(amount);
        this.cashTendered = cashTendered;
    }
}

class Check extends Payment {
    private name: string;
    private bankID: string;

    constructor(name: string, bankID:string, amount:number){
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }

    public authorized():boolean{
        return false;
    }
}

class Credit extends Payment {
    private number: string;
    private type: string;
    private expDate: string;

    constructor(number: string, type:string, expDate:string, amount:number){
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }

    public authorized():boolean{
        return false;
    }
}

class OrderDetails{
    private quantity: number;
    private taxStatus: string;
    private item:Item;

    constructor(quantity: number, taxStatus: string, item:Item){
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }

    public calcSubTotal():number{
        return 0;
    }
    public calcWeight():number{
        return 0;
    }
    public calcTax():number{
        return 0;
    }
}

class Item{
    private shippingWeight: any;
    private description: string;

    constructor(shippingWeight: any, description: string){
        this.shippingWeight = shippingWeight;
        this.description = description;
    }

    public getPriceForQuantity():number{
        return 0;
    }
    public getTax():number{
        return 0;
    }
    public inStock():number{
        return 0;
    }
}