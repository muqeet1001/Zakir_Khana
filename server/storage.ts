import { products, shows, cartItems, orders, type Product, type Show, type CartItem, type Order, type InsertProduct, type InsertShow, type InsertCartItem, type InsertOrder } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Shows
  getShows(): Promise<Show[]>;
  getShow(id: number): Promise<Show | undefined>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private shows: Map<number, Show>;
  private cartItems: Map<number, CartItem & { product: Product }>;
  private orders: Map<number, Order>;
  private currentProductId: number;
  private currentShowId: number;
  private currentCartId: number;
  private currentOrderId: number;

  constructor() {
    this.products = new Map();
    this.shows = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.currentProductId = 1;
    this.currentShowId = 1;
    this.currentCartId = 1;
    this.currentOrderId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed products
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Sakht Launda Classic Tee",
        description: "Premium cotton t-shirt with signature design",
        price: "899.00",
        image: "https://m.media-amazon.com/images/I/71eTSq-DPzL.jpg",
        category: "T-Shirts",
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        name: "Sakht Launda Hoodie",
        description: "Cozy hoodie for comedy lovers",
        price: "1599.00",
        image: "https://www.styched.in/cdn/shop/files/sakht-launda-hoodie.jpg?v=1747858513",
        category: "Hoodies",
        sizes: ['S', 'M', 'L', 'XL'],
        inStock: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        name: "Comedy Quote Mug",
        description: "Start your day with laughter",
        price: "499.00",
        image: "https://funkydecors.com/cdn/shop/files/funkydecors-zakir-khan-standup-comedy-funny-quotes-ceramic-mug-350-ml-multicolor-mugs-894.jpg?crop=center&height=1024&v=1717837872&width=1024",
        category: "Mugs",
        sizes: ['Standard'],
        inStock: true,
        createdAt: new Date(),
      },
      {
        id: 4,
        name: "Sakht Launda Poster",
        description: "Decorate with comedy vibes",
        price: "299.00",
        image: "https://rukminim2.flixcart.com/image/832/832/xif0q/poster/k/i/r/small-sakht-launda-poster-with-wooden-base-without-frame-a3-size-original-imah76kcwfyhpjzj.jpeg?q=70&crop=false",
        category: "Posters",
        sizes: ['A3', 'A2'],
        inStock: true,
        createdAt: new Date(),
      },
    ];

    mockProducts.forEach(product => {
      this.products.set(product.id, product);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
    });

    // Seed shows
    const mockShows: Show[] = [
      {
        id: 1,
        title: "Mumbai Live Show",
        city: "Mumbai",
        venue: "Phoenix Mills",
        date: new Date("2024-03-15T20:00:00"),
        time: "8:00 PM",
        price: "1500.00",
        image: "https://t3.ftcdn.net/jpg/01/69/13/46/240_F_169134635_BtuUZImNHXOb5x2GZPQMVA4BMnEbPjiQ.jpg",
        address: "Phoenix Mills, Lower Parel, Mumbai",
        duration: "90 minutes",
        capacity: 500,
        availableTickets: 450,
      },
      {
        id: 2,
        title: "Delhi Live Show",
        city: "Delhi",
        venue: "Siri Fort Auditorium",
        date: new Date("2024-03-22T19:30:00"),
        time: "7:30 PM",
        price: "1200.00",
        image: "https://t3.ftcdn.net/jpg/02/00/55/38/240_F_200553856_wKJI6Kh5DjqjEBegIcOlU2oHAYEvBAnx.jpg",
        address: "Siri Fort Auditorium, August Kranti Marg, Delhi",
        duration: "90 minutes",
        capacity: 800,
        availableTickets: 720,
      },
      {
        id: 3,
        title: "Bangalore Live Show",
        city: "Bangalore",
        venue: "UB City Mall",
        date: new Date("2024-04-05T20:30:00"),
        time: "8:30 PM",
        price: "1300.00",
        image: "https://t3.ftcdn.net/jpg/03/41/95/04/240_F_341950409_Gq1sN2OqYgRZrUTvPohSmgQVubaqzlA5.jpg",
        address: "UB City Mall, Vittal Mallya Road, Bangalore",
        duration: "90 minutes",
        capacity: 400,
        availableTickets: 380,
      },
      {
        id: 4,
        title: "Pune Live Show",
        city: "Pune",
        venue: "Seasons Mall",
        date: new Date("2024-04-12T19:00:00"),
        time: "7:00 PM",
        price: "1100.00",
        image: "https://t4.ftcdn.net/jpg/12/20/84/09/240_F_1220840998_YUQu1tWX6iintrmfKSA8zXlO2ZiexyG0.jpg",
        address: "Seasons Mall, Magarpatta City, Pune",
        duration: "90 minutes",
        capacity: 300,
        availableTickets: 250,
      },
      {
        id: 5,
        title: "Hyderabad Live Show",
        city: "Hyderabad",
        venue: "Forum Sujana Mall",
        date: new Date("2024-04-20T20:00:00"),
        time: "8:00 PM",
        price: "1250.00",
        image: "https://t3.ftcdn.net/jpg/03/97/74/64/240_F_397746410_YP1kxMSzQUhzDrlXCGu9wpKeDakisHjH.jpg",
        address: "Forum Sujana Mall, Kukatpally, Hyderabad",
        duration: "90 minutes",
        capacity: 450,
        availableTickets: 400,
      },
      {
        id: 6,
        title: "Chennai Live Show",
        city: "Chennai",
        venue: "Express Avenue",
        date: new Date("2024-05-03T19:30:00"),
        time: "7:30 PM",
        price: "1400.00",
        image: "https://t4.ftcdn.net/jpg/02/71/61/93/240_F_271619354_ZpYbXBGET0ESbSV7QKJhoxrEdhBQ7J3W.jpg",
        address: "Express Avenue, Royapettah, Chennai",
        duration: "90 minutes",
        capacity: 600,
        availableTickets: 580,
      },
    ];

    mockShows.forEach(show => {
      this.shows.set(show.id, show);
      this.currentShowId = Math.max(this.currentShowId, show.id + 1);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getShows(): Promise<Show[]> {
    return Array.from(this.shows.values());
  }

  async getShow(id: number): Promise<Show | undefined> {
    return this.shows.get(id);
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const product = this.products.get(item.productId!);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values())
      .find(cartItem => 
        cartItem.sessionId === item.sessionId && 
        cartItem.productId === item.productId && 
        cartItem.size === item.size
      );

    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
      return existingItem;
    }

    const id = this.currentCartId++;
    const cartItem: CartItem & { product: Product } = {
      ...item,
      id,
      createdAt: new Date(),
      product,
    };
    
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const newOrder: Order = {
      ...order,
      id,
      createdAt: new Date(),
    };
    
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
