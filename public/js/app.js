import { CustomerController } from '../../controller/CustomerController.js';
import { ItemController } from '../../controller/ItemController.js';
import { OrderController } from '../../controller/OrderController.js';

class App {
    constructor() {
        this.initializeControllers();
        this.setupNavigation();
        this.setupSidebar();
        this.loadInitialView();
    }

    initializeControllers() {
        this.customerController = new CustomerController();
        this.itemController = new ItemController();
        this.orderController = new OrderController();
    }

    setupSidebar() {
        const sidebarCollapse = document.getElementById('sidebarCollapse');
        const sidebar = document.getElementById('sidebar');
        const content = document.getElementById('content');

        if (sidebarCollapse && sidebar && content) {
            sidebarCollapse.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                content.classList.toggle('active');
            });

            // Handle responsive behavior
            const handleResize = () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.add('active');
                    content.classList.add('active');
                } else {
                    sidebar.classList.remove('active');
                    content.classList.remove('active');
                }
            };

            window.addEventListener('resize', handleResize);
            handleResize(); // Initial check
        }
    }

    setupNavigation() {
        const navItems = ['nav-dashboard', 'nav-customer', 'nav-item', 'nav-order'];
        navItems.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
            }
        });

        document.getElementById('nav-dashboard')?.addEventListener('click', () => this.loadView('dashboard'));
        document.getElementById('nav-customer')?.addEventListener('click', () => this.loadView('customer'));
        document.getElementById('nav-item')?.addEventListener('click', () => this.loadView('item'));
        document.getElementById('nav-order')?.addEventListener('click', () => this.loadView('order'));
    }

    async loadView(viewName) {
        try {
            const mainContent = document.getElementById('main-content');
            if (!mainContent) {
                console.error('Main content element not found');
                return;
            }
            
            // Update active state in sidebar
            const navItems = ['nav-dashboard', 'nav-customer', 'nav-item', 'nav-order'];
            navItems.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    if (id === `nav-${viewName}`) {
                        element.parentElement.classList.add('active');
                    } else {
                        element.parentElement.classList.remove('active');
                    }
                }
            });

            switch(viewName) {
                case 'dashboard':
                    await this.loadDashboard();
                    break;
                case 'customer':
                    await this.customerController.loadView();
                    break;
                case 'item':
                    await this.itemController.loadView();
                    break;
                case 'order':
                    await this.orderController.loadView();
                    break;
                default:
                    console.error('Invalid view name:', viewName);
            }
        } catch (error) {
            console.error('Error loading view:', error);
            alert('Error loading view. Please try again.');
        }
    }

    async loadDashboard() {
        const mainContent = document.getElementById('main-content');
        if (!mainContent) return;

        try {
            // Fetch data from controllers
            const customerCount = await this.customerController.getCustomerCount();
            const itemCount = await this.itemController.getItemCount();
            const orderCount = await this.orderController.getOrderCount();

            mainContent.innerHTML = `
                <div class="container-fluid">
                    <div class="row g-4">
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <i class="bi bi-people-fill text-primary mb-3"></i>
                                    <h5 class="card-title">Total Customers</h5>
                                    <h2 class="card-text">${customerCount}</h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <i class="bi bi-box-seam-fill text-success mb-3"></i>
                                    <h5 class="card-title">Total Items</h5>
                                    <h2 class="card-text">${itemCount}</h2>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body text-center">
                                    <i class="bi bi-cart-check-fill text-warning mb-3"></i>
                                    <h5 class="card-title">Total Orders</h5>
                                    <h2 class="card-text">${orderCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            mainContent.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error loading dashboard data. Please try again.
                </div>
            `;
        }
    }

    loadInitialView() {
        this.loadView('dashboard');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Success Animation Function
function showSuccessAnimation(message) {
    // Create success animation container if it doesn't exist
    let container = document.querySelector('.success-animation');
    if (!container) {
        container = document.createElement('div');
        container.className = 'success-animation';
        container.innerHTML = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <span class="success-message">${message}</span>
        `;
        document.body.appendChild(container);
    } else {
        container.querySelector('.success-message').textContent = message;
    }

    // Show the animation
    container.classList.add('show');

    // Hide and remove after animation
    setTimeout(() => {
        container.classList.remove('show');
        setTimeout(() => {
            container.remove();
        }, 300);
    }, 2000);
} 