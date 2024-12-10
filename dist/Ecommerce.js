"use strict";
class Customer {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}
class Order {
    constructor(date, status, customer, payment) {
        // ทำภายหลัง
        this.payment = new Cash(0, 0);
        this.orderDetails = [];
        this.date = date;
        this.status = status;
        this.customer = customer;
        this.payment = payment;
    }
    addOrderDetails(orderDetail) {
        this.orderDetails.push(orderDetail);
    }
    setPayment(payment) {
        this.payment = payment;
    }
}
class Payment {
    constructor(amount) {
        this.amount = amount;
    }
}
class Cash extends Payment {
    constructor(cashTendered, amount) {
        super(amount);
        this.cashTendered = cashTendered;
    }
}
class Check extends Payment {
    constructor(name, bankID, amount) {
        super(amount);
        this.name = name;
        this.bankID = bankID;
    }
}
class Credit extends Payment {
    constructor(number, type, expDate, amount) {
        super(amount);
        this.number = number;
        this.type = type;
        this.expDate = expDate;
    }
}
class OrderDetails {
    constructor(quantity, taxStatus, item) {
        this.quantity = quantity;
        this.taxStatus = taxStatus;
        this.item = item;
    }
}
class Item {
    constructor(shippingWeight, description) {
        this.shippingWeight = shippingWeight;
        this.description = description;
    }
}
