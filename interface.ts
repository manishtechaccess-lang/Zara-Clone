export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  cart?: Cart;
  wishlist?: Wishlist;
  orders: Order[];
  createdAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  user: User;
  items: CartItem[];
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  externalProductId: string;
  title: string;
  price: number;
  image?: string;
  quantity: number;
  cart: Cart;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  user?: User;
  items: WishlistItem[];
  createdAt: Date;
}

export interface WishlistItem {
  id: string;
  wishlistId: string;
  externalProductId: string;
  title: string;
  price: number;
  image?: string;
  wishlist?: Wishlist;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  user: User;
  items: OrderItem[];
  totalItems: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  externalProductId: string;
  title: string;
  quantify: number;
  price: number;
  order: Order;
  createdAt: Date;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}
export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
