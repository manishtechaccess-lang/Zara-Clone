import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  Cart,
  CartItem,
  Wishlist,
  WishlistItem,
  Order,
  OrderItem,
} from "@/interface";

const initialState = {
  userInfo: {} as User,
  cart: {} as Cart,
  wishlist: {} as Wishlist,
  orders: [] as Order[],
};

const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
    setWishlist: (state, action: PayloadAction<Wishlist>) => {
      state.wishlist = action.payload;
    },
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setUserInfo, setCart, setWishlist, setOrders } =
  dataSlice.actions;
export default dataSlice.reducer;
