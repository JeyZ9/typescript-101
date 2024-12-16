"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    toString() {
        return "name: " + this.name + " address: " + this.address;
    }
}
class Order {
    // constructor(date: string, status: string, customer:Customer, payment:Payment){
    constructor(date, status, customer) {
        // ทำภายหลัง
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.date = date;
        this.status = status;
        this.customer = customer;
        // this.payment = payment;
    }
    calcSubTotal() {
        let subTotal = 0;
        this.orderDetails.forEach(item => {
            subTotal += item.calcSubTotal();
        });
        // for(let i=0; i<this.orderDetails.length; i++){
        //     total += this.orderDetails[i].calcSubTotal();
        // }
        return subTotal;
    }
    calcTax() {
        let vat = 0;
        this.orderDetails.forEach(item => vat += item.calcTax());
        return vat;
    }
    calcTotal() {
        return this.calcSubTotal() + this.calcTax();
    }
    calcTotalWeight() {
        let weight = 0;
        this.orderDetails.forEach(item => weight += item.calcWeight());
        return weight;
    }
    addOrderDetails(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    getOrderDetails() {
        return this.orderDetails;
    }
    getPayment() {
        return this.payment;
    }
    setPayment(payment) {
        this.payment = payment;
    }
    printOrderDetails() {
        this.orderDetails.forEach(item => item.printOrderDetails());
        // for(let i=0; i<this.orderDetails.length;i++){
        //     this.orderDetails[i].printOrderDetails();
        // }
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
    getAmount() {
        return this.amount;
    }
}
class Cash extends Payment {
    constructor(cashTendered, amount) {
        super(amount);
        this.cashTendered = cashTendered;
    }
    getChange() {
        return this.cashTendered - this.getAmount();
    }
    getCashTendered() {
        return this.cashTendered;
    }
}
class Check extends Payment {
    constructor(name, bankID, amount) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
    authorized() {
        return false;
    }
}
class Credit extends Payment {
    constructor(number, type, expDate, amount) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
    authorized() {
        return false;
    }
}
class OrderDetails {
    constructor(quantity, taxStatus, item) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }
    calcSubTotal() {
        return this.item.getPriceForQuantity() * this.quantity;
    }
    calcWeight() {
        return this.quantity * this.item.getShippingWeight();
    }
    calcTax() {
        if (this.taxStatus == "not included") {
            return this.quantity * this.item.getTax();
        }
        return 0;
    }
    printOrderDetails() {
        console.log(this.item.getDescription() + "\t" + this.quantity + "\t" + this.calcSubTotal());
        // console.log("hello");
    }
}
class Item {
    constructor(shippingWeight, description, price) {
        this.shippingWeight = shippingWeight;
        this.description = description;
        this.price = price;
    }
    getPriceForQuantity() {
        return this.price;
    }
    getTax() {
        return this.price * 0.07; // 7% == 7 / 100
    }
    inStock() {
        return true;
    }
    getShippingWeight() {
        return this.shippingWeight;
    }
    getDescription() {
        return this.description;
    }
    toString() {
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
order1.printOrderDetails();
console.log("################### order2 ##################");
order2.printOrderDetails();
