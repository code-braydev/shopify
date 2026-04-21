import { defineStore } from "pinia";
import type {
  CartItem,
  LoginPayload,
  PaymentPayload,
  Product,
  RegisterPayload,
  ShopState,
  SortOption,
  UserAccount,
  UserProfile,
} from "~/types/shop";

const STORAGE_KEYS = {
  cart: "bztore_cart",
  user: "bztore_user",
  users: "bztore_users",
} as const;

const PRODUCT_SOURCE_URL = "/data/products.json";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Laptop BZ Pro 14",
    price: 4599000,
    category: "Laptops",
    brand: "BZTech",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
    rating: 4.8,
    ratingCount: 132,
    stock: 7,
  },
  {
    id: 2,
    name: "Mouse Pulse X2",
    price: 189000,
    category: "Accesorios",
    brand: "Pulse",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900",
    rating: 4.6,
    ratingCount: 98,
    stock: 18,
  },
];

const seedUsers: UserAccount[] = [
  {
    name: "Braydev",
    email: "admin@admin.com",
    password: "admin123",
  },
];

const formatCOP = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

const parseStorage = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const isProduct = (item: unknown): item is Product => {
  if (!item || typeof item !== "object") return false;

  const candidate = item as Product;

  return (
    typeof candidate.id === "number" &&
    typeof candidate.name === "string" &&
    typeof candidate.price === "number" &&
    typeof candidate.category === "string" &&
    typeof candidate.brand === "string" &&
    typeof candidate.image === "string" &&
    typeof candidate.rating === "number" &&
    typeof candidate.ratingCount === "number" &&
    typeof candidate.stock === "number"
  );
};

const sanitizeCart = (cart: unknown): CartItem[] => {
  if (!Array.isArray(cart)) return [];

  return cart
    .filter((item) => item && typeof item === "object")
    .map((item) => item as CartItem)
    .filter(
      (item) =>
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.price === "number" &&
        typeof item.image === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0,
    );
};

export const useShopStore = defineStore("shop", {
  state: (): ShopState => ({
    products: fallbackProducts,
    filters: {
      category: "Todo",
      search: "",
      sort: "destacados",
    },
    cart: [],
    user: null,
    users: seedUsers,
    dialogs: {
      cart: false,
      login: false,
    },
    checkoutState: "idle",
    authError: "",
    checkoutError: "",
    ui: {
      cartPulseKey: 0,
      checkoutPulseKey: 0,
    },
  }),

  getters: {
    categories: (state) => [
      "Todo",
      ...new Set(state.products.map((product) => product.category)),
    ],

    filteredProducts: (state) => {
      const term = state.filters.search.trim().toLowerCase();
      let list = [...state.products];

      if (state.filters.category !== "Todo") {
        list = list.filter(
          (product) => product.category === state.filters.category,
        );
      }

      if (term) {
        list = list.filter(
          (product) =>
            product.name.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term) ||
            product.category.toLowerCase().includes(term),
        );
      }

      if (state.filters.sort === "precio_asc") {
        list.sort((a, b) => a.price - b.price);
      } else if (state.filters.sort === "precio_desc") {
        list.sort((a, b) => b.price - a.price);
      } else if (state.filters.sort === "rating") {
        list.sort((a, b) => b.rating - a.rating);
      }

      return list;
    },

    cartCount: (state) =>
      state.cart.reduce((acc, item) => acc + item.quantity, 0),

    cartSubtotal: (state) =>
      state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0),

    shipping: (state) => (state.cart.length ? 18000 : 0),

    cartTotal(): number {
      return this.cartSubtotal + this.shipping;
    },

    isAuthenticated: (state) => Boolean(state.user),
  },

  actions: {
    async loadCatalogFromSource() {
      if (!import.meta.client) return;

      try {
        const payload = await $fetch<unknown>(PRODUCT_SOURCE_URL);

        if (
          Array.isArray(payload) &&
          payload.every(isProduct) &&
          payload.length > 0
        ) {
          this.products = payload;
          return;
        }

        this.products = fallbackProducts;
      } catch {
        this.products = fallbackProducts;
      }
    },

    hydrate() {
      if (!import.meta.client) return;

      this.cart = sanitizeCart(
        parseStorage<unknown>(localStorage.getItem(STORAGE_KEYS.cart), []),
      );

      const rawUser = parseStorage<UserProfile | null>(
        localStorage.getItem(STORAGE_KEYS.user),
        null,
      );
      this.user =
        rawUser &&
        typeof rawUser.name === "string" &&
        typeof rawUser.email === "string"
          ? rawUser
          : null;

      const rawUsers = parseStorage<unknown>(
        localStorage.getItem(STORAGE_KEYS.users),
        seedUsers,
      );
      if (Array.isArray(rawUsers)) {
        const validUsers = rawUsers
          .filter((item) => item && typeof item === "object")
          .map((item) => item as UserAccount)
          .filter(
            (item) =>
              typeof item.name === "string" &&
              typeof item.email === "string" &&
              typeof item.password === "string",
          );

        this.users = validUsers.length ? validUsers : seedUsers;
      }

      this.persistUsers();
      void this.loadCatalogFromSource();
    },

    persistCartAndUser() {
      if (!import.meta.client) return;
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(this.cart));
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(this.user));
    },

    persistUsers() {
      if (!import.meta.client) return;
      localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(this.users));
    },

    setSearch(value: string) {
      this.filters.search = value;
    },

    setCategory(value: string) {
      this.filters.category = value;
    },

    setSort(value: SortOption) {
      this.filters.sort = value;
    },

    addToCart(product: Product) {
      if (!this.isAuthenticated) {
        this.authError =
          "Debes iniciar sesion para agregar productos al carrito.";
        this.openLogin();
        return false;
      }

      const found = this.cart.find((item) => item.id === product.id);

      if (found) {
        found.quantity += 1;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      this.ui.cartPulseKey += 1;
      this.persistCartAndUser();
      return true;
    },

    incrementQty(id: number) {
      const found = this.cart.find((item) => item.id === id);
      if (!found) return;

      found.quantity += 1;
      this.ui.cartPulseKey += 1;
      this.persistCartAndUser();
    },

    decrementQty(id: number) {
      const found = this.cart.find((item) => item.id === id);
      if (!found) return;

      if (found.quantity <= 1) {
        this.removeFromCart(id);
        return;
      }

      found.quantity -= 1;
      this.persistCartAndUser();
    },

    removeFromCart(id: number) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.persistCartAndUser();
    },

    clearCart() {
      this.cart = [];
      this.persistCartAndUser();
    },

    rateProduct(productId: number, rating: number) {
      if (!this.isAuthenticated) {
        this.authError = "Debes iniciar sesion para calificar productos.";
        this.openLogin();
        return false;
      }

      const product = this.products.find((item) => item.id === productId);
      if (!product) return false;

      const safeRating = Math.min(5, Math.max(1, rating));
      const totalScore = product.rating * product.ratingCount + safeRating;
      product.ratingCount += 1;
      product.rating = Number((totalScore / product.ratingCount).toFixed(1));
      return true;
    },

    openCart() {
      this.dialogs.cart = true;
    },

    closeCart() {
      this.dialogs.cart = false;
      this.checkoutState = "idle";
      this.checkoutError = "";
    },

    openLogin() {
      this.dialogs.login = true;
    },

    closeLogin() {
      this.dialogs.login = false;
      this.authError = "";
    },

    login(payload: LoginPayload) {
      const email = payload.email.trim().toLowerCase();
      const account = this.users.find(
        (item) =>
          item.email.toLowerCase() === email &&
          item.password === payload.password,
      );

      if (!account) {
        this.authError = "Credenciales invalidas.";
        return false;
      }

      this.user = {
        name: account.name,
        email: account.email,
      };

      this.authError = "";
      this.dialogs.login = false;
      this.persistCartAndUser();
      return true;
    },

    register(payload: RegisterPayload) {
      const name = payload.name.trim();
      const email = payload.email.trim().toLowerCase();
      const password = payload.password.trim();

      if (!name || !email || password.length < 6) {
        this.authError =
          "Completa el formulario y usa una clave de al menos 6 caracteres.";
        return false;
      }

      const exists = this.users.some(
        (item) => item.email.toLowerCase() === email,
      );
      if (exists) {
        this.authError = "Este correo ya esta registrado.";
        return false;
      }

      const account: UserAccount = {
        name,
        email,
        password,
      };

      this.users.push(account);
      this.persistUsers();

      this.user = {
        name,
        email,
      };

      this.authError = "";
      this.dialogs.login = false;
      this.persistCartAndUser();
      return true;
    },

    logout() {
      this.user = null;
      this.authError = "";
      this.persistCartAndUser();
    },

    async simulatePayment(payload: PaymentPayload) {
      if (!this.isAuthenticated) {
        this.checkoutError = "Inicia sesion para completar el pago.";
        this.openLogin();
        return false;
      }

      const hasInvalidField =
        !payload.card.trim() ||
        !payload.name.trim() ||
        !payload.exp.trim() ||
        !payload.cvv.trim();

      if (hasInvalidField) {
        this.checkoutError = "Completa todos los datos de pago.";
        return false;
      }

      this.checkoutError = "";
      this.checkoutState = "processing";

      await new Promise((resolve) => setTimeout(resolve, 1400));

      this.checkoutState = "success";
      this.ui.checkoutPulseKey += 1;
      this.clearCart();
      return true;
    },

    formatPrice(value: number) {
      return formatCOP(value);
    },
  },
});
