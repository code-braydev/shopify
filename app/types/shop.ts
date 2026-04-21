export type SortOption = "destacados" | "precio_asc" | "precio_desc" | "rating";
export type CheckoutState = "idle" | "processing" | "success" | "error";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating: number;
  ratingCount: number;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface UserAccount extends UserProfile {
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface PaymentPayload {
  card: string;
  name: string;
  exp: string;
  cvv: string;
}

export interface ShopState {
  products: Product[];
  filters: {
    category: string;
    search: string;
    sort: SortOption;
  };
  cart: CartItem[];
  user: UserProfile | null;
  users: UserAccount[];
  dialogs: {
    cart: boolean;
    login: boolean;
  };
  checkoutState: CheckoutState;
  authError: string;
  checkoutError: string;
  ui: {
    cartPulseKey: number;
    checkoutPulseKey: number;
  };
}
