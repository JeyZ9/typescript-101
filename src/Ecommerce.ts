class Customer {
    private name: string;
    private address: any;

    constructor(name:string, address:any){
        this.name = name;
        this.address = address;
    }

    public toString():string{
        return "name: " + this.name + " address: " + this.address;
    }
}

class Order{
    private date: string;
    private status: string;
    private customer: Customer;
    // ทำภายหลัง
    private payment: Payment = new Cash(0, 0);
    private orderDetails:OrderDetails[] = [];

    // constructor(date: string, status: string, customer:Customer, payment:Payment){
    constructor(date: string, status: string, customer:Customer){
        this.date = date;
        this.status = status;
        this.customer = customer;
        // this.payment = payment;
    }

    public calcSubTotal():number{
        let subTotal:number = 0;
        this.orderDetails.forEach(item => {
            subTotal += item.calcSubTotal();
        });

        // for(let i=0; i<this.orderDetails.length; i++){
        //     total += this.orderDetails[i].calcSubTotal();
        // }
        return subTotal;
    }
    public calcTax():number{
        let vat:number = 0;
        this.orderDetails.forEach(item => vat += item.calcTax());
        return vat;
    }
    public calcTotal():number{
        return this.calcSubTotal() + this.calcTax();
    }
    public calcTotalWeight():number{
        let weight:number = 0;
        this.orderDetails.forEach(item => weight += item.calcWeight());
        return weight;
    }

    public addOrderDetails(orderDetail: OrderDetails):void{
        this.orderDetails.push(orderDetail);
    }

    public getOrderDetails():OrderDetails[]{
        return this.orderDetails
    }

    public getPayment():Payment{
        return this.payment
    }

    public setPayment(payment: Payment):void{
        this.payment = payment
    }

    public printOrderDetails():void{
        this.orderDetails.forEach(item => item.printOrderDetails());
        // for(let i=0; i<this.orderDetails.length;i++){
        //     this.orderDetails[i].printOrderDetails();
        // }
    }
}

abstract class Payment{
    private amount:number;
    
    constructor(amount:number){
        this.amount = amount;
    }

    public getAmount():number{
        return this.amount;
    }
}

class Cash extends Payment{
    private cashTendered: number;
    constructor(cashTendered:number, amount:number){
        super(amount);
        this.cashTendered = cashTendered;
    }

    public getChange():number{
        return this.cashTendered - this.getAmount();
    }

    public getCashTendered():number {
        return this.cashTendered;
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
        return this.item.getPriceForQuantity() * this.quantity;
    }
    public calcWeight():number{
        return this.quantity * this.item.getShippingWeight();
    }
    public calcTax():number{
        if(this.taxStatus == "not included"){
            return this.quantity * this.item.getTax();
        }
        return 0;
    }

    public printOrderDetails():void{
        console.log(this.item.getDescription() + "\t" + this.quantity + "\t" + this.calcSubTotal());
        // console.log("hello");
    }
}

class Item{
    private shippingWeight: number;
    private description: string;
    private price: number

    constructor(shippingWeight: number, description: string, price:number){
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }

    public getPriceForQuantity():number{
        return this.price;
    }
    public getTax():number{
        return this.price * 0.07; // 7% == 7 / 100
    }
    public inStock():boolean{
        return true;
    }

    public getShippingWeight():number{
        return this.shippingWeight;
    }

    public getDescription():string{
        return this.description;
    }

    public toString():string{
        return "{ \n" + " shippingWeight: " + this.shippingWeight + ", \n" + " description: " + this.description + ", \n" + " price: " + this.price + "\n}";
    }
}

// Create Obj

// Customer
const customer1 = new Customer("Wisarut", "Nakhon Pathom");
const customer2 = new Customer("Wisarut Saelao", "Nakhon Pathom");

// console.log(customer1.toString());
// console.log(customer2.toString());

// Item
const item1 = new Item(1.5, "Lotus Water", 15);
const item2 = new Item(0.05, "Lays", 30);
const item3 = new Item(0.10, "MaMa", 10);

// console.log(item1.toString());
// console.log(item2.toString());

// Order
const order1 = new Order("16/12/2567", "in progress", customer1);
const order2 = new Order("16/12/2567", "in progress", customer1);

// OrderDetails
const orderDetail1 = new OrderDetails(1, "not included", item1);
const orderDetail2 = new OrderDetails(2, "not included", item2);

const orderDetail3 = new OrderDetails(5, "not included", item3);

// OrderDetails => Order
order1.addOrderDetails(orderDetail1);
order1.addOrderDetails(orderDetail2);

order2.addOrderDetails(orderDetail3);

// Payment
const amount = order1.calcTotal();
const amount2 = order2.calcTotal();
const cash = new Cash(1000, amount);

const cash2 = new Cash(1000, amount2);

order1.setPayment(cash);

order2.setPayment(cash2);

// console.log("############### Order ###############");
// console.log("SubTotal:", order1.calcSubTotal());
// console.log("Vat:", order1.calcTax());
// // console.log("Weight:", order1.calcTotalWeight());
// console.log("Recieve:", (order1.getPayment() as Cash).getCashTendered());
// console.log("Change:", (order1.getPayment() as Cash).getChange());
// console.log("Total:", order1.calcTotal());

// console.log("############### Order ###############");
// console.log("SubTotal:", order2.calcSubTotal());
// console.log("Vat:", Number(order2.calcTax().toFixed(2)));
// // console.log("Weight:", order1.calcTotalWeight());
// console.log("Recieve:", (order2.getPayment() as Cash).getCashTendered());
// console.log("Change:", (order2.getPayment() as Cash).getChange());
// console.log("Total:", order2.calcTotal());

console.log(order1.getOrderDetails());
order1.printOrderDetails()
console.log("################### order2 ##################")
order2.printOrderDetails()