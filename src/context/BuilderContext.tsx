"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export type BaseService = "Room Aesthetics" | "Surprise Package" | "Custom Setup" | string | null;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customNote?: string;
  customImage?: string;
}

export interface EventDetails {
  name: string;
  phone: string;
  recipientName: string;
  recipientPhone: string;
  date: string;
  time: string;
  location: string;
  theme: string;
  instructions: string;
  roomDescription: string;
  deliveryMethod: string;
  deliveryMethodDetails: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji: string;
  image: string;
  gender: string;
  active: boolean;
}

export interface PackageItem {
  id: string;
  name: string;
  price: number;
  items: string[];
  gender: string;
  active: boolean;
  tag?: string;
}

interface BuilderContextType {
  step: number;
  cart: CartItem[];
  cartTotal: number;
  baseService: string;
  roomVibe: string;
  vibeImage: string;
  customVibe: string;
  roomTransport: string;
  roomTransportPrice: number;
  selectedPackageName: string;
  eventDetails: EventDetails;
  dbItems: ShopItem[];
  dbPackages: PackageItem[];
  setStep: (step: number) => void;
  setBaseService: (service: string) => void;
  setRoomVibe: (vibe: string, image: string) => void;
  setCustomVibe: (v: string) => void;
  setRoomTransport: (id: string, price: number) => void;
  setSelectedPackageName: (name: string) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setCartItemNote: (id: string, note: string) => void;
  setCartItemImage: (id: string, imageStr: string) => void;
  clearCart: () => void;
  preloadItems: (items: CartItem[], packageName?: string) => void;
  setEventDetails: (details: Partial<EventDetails>) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [baseService, setBaseService] = useState("");
  const [roomVibe, setRoomVibe] = useState("");
  const [vibeImage, setVibeImage] = useState("");
  const [customVibe, setCustomVibe] = useState("");
  const [roomTransport, setRoomTransportId] = useState("self");
  const [roomTransportPrice, setRoomTransportPrice] = useState(0);
  const [selectedPackageName, setSelectedPackageName] = useState("");
  const [dbItems, setDbItems] = useState<ShopItem[]>([]);
  const [dbPackages, setDbPackages] = useState<PackageItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [eventDetails, setEventDetailsState] = useState<EventDetails>({
    name: "",
    phone: "",
    recipientName: "",
    recipientPhone: "",
    date: "",
    time: "",
    location: "",
    theme: "",
    instructions: "",
    roomDescription: "",
    deliveryMethod: "",
    deliveryMethodDetails: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [itemsRes, pkgsRes] = await Promise.all([
        supabase.from("shop_items").select("*").eq("active", true),
        supabase.from("packages").select("*").eq("active", true)
      ]);
      if (itemsRes.data) setDbItems(itemsRes.data as ShopItem[]);
      if (pkgsRes.data) setDbPackages(pkgsRes.data as PackageItem[]);
    }
    fetchData();
  }, []);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const setCartItemNote = (id: string, note: string) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, customNote: note } : i)));
  };

  const setCartItemImage = (id: string, imageStr: string) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, customImage: imageStr } : i)));
  };

  const clearCart = () => { setSelectedPackageName(""); setCart([]); };

  const preloadItems = (items: CartItem[], packageName?: string) => {
    setCart(items.map((i) => ({ ...i, quantity: 1 })));
    if (packageName) setSelectedPackageName(packageName);
  };

  const setEventDetails = (details: Partial<EventDetails>) =>
    setEventDetailsState((prev) => ({ ...prev, ...details }));

  const setRoomVibeWithImage = (vibe: string, image: string) => {
    setRoomVibe(vibe);
    setVibeImage(image);
  };

  const setRoomTransport = (id: string, price: number) => {
    setRoomTransportId(id);
    setRoomTransportPrice(price);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BuilderContext.Provider
      value={{
        step, cart, cartTotal, baseService, roomVibe, vibeImage,
        customVibe, roomTransport, roomTransportPrice,
        selectedPackageName, eventDetails, dbItems, dbPackages,
        setStep, setBaseService, setRoomVibe: setRoomVibeWithImage,
        setCustomVibe, setRoomTransport,
        setSelectedPackageName, addToCart, removeFromCart,
        updateQuantity, setCartItemNote, setCartItemImage, clearCart, preloadItems, setEventDetails,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) throw new Error("useBuilder must be used within a BuilderProvider");
  return context;
}
