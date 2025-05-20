class OrderController {
    constructor() {
        this.cart = [];
        this.items = [];
        this.customers = [];
        this.orderId = '';
        this.orderDate = '';
        this.customerSelect = document.getElementById('customer-select');
        this.itemSelect = document.getElementById('item-select');
        this.itemQty = document.getElementById('item-qty');
        this.cartTbody = document.getElementById('cart-tbody');
        this.orderTotal = document.getElementById('order-total');
        this.customerAddress = document.getElementById('customer-address');
        this.customerContact = document.getElementById('customer-contact');
        this.addToCartBtn = document.getElementById('add-to-cart');
        this.clearCartBtn = document.getElementById('clear-cart');
        this.placeOrderBtn = document.getElementById('place-order');
        
        this.addToCartBtn.addEventListener('click', () => this.addToCart());
        this.clearCartBtn.addEventListener('click', () => this.clearCart());
        this.placeOrderBtn.addEventListener('click', () => this.placeOrder());
        this.customerSelect.addEventListener('change', () => this.loadCustomerDetails());
        
        this.loadItems();
        this.loadCustomers();
        this.generateOrderId();
    }

    addToCart() {
        const item = this.itemSelect.value;
        const qty = this.itemQty.value;

        if (!item || !qty) {
            alert('Please select an item and quantity');
            return;
        }

        const itemObj = this.items.find(i => i.id === item);
        if (!itemObj) {
            alert('Item not found');
            return;
        }

        if (qty > itemObj.qty) {
            alert('Quantity exceeds available stock');
            return;
        }

        const cartItem = {
            itemId: item,
            name: itemObj.name,
            price: itemObj.price,
            qty: parseInt(qty),
            total: itemObj.price * parseInt(qty)
        };

        this.cart.push(cartItem);
        this.loadCart();
        this.calculateTotal();
        
        // Clear inputs
        this.itemSelect.value = '';
        this.itemQty.value = '';
        
        showSuccessAnimation('Item added successfully!');
    }

    // ... rest of the existing methods ...
} 