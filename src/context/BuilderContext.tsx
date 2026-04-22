"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BaseService = "Room Aesthetics" | "Surprise Package" | "Custom Setup" | null;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
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
}

interface BuilderContextType {
  step: number;
  setStep: (step: number) => void;
  baseService: BaseService;
  setBaseService: (service: BaseService) => void;
  roomVibe: string | null;
  setRoomVibe: (vibe: string | null) => void;
  vibeImage: string | null;
  setVibeImage: (image: string | null) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  preloadItems: (items: Omit<CartItem, "quantity">[]) => void;
  cartTotal: number;
  eventDetails: EventDetails;
  updateEventDetails: (details: Partial<EventDetails>) => void;
}

const defaultEventDetails: EventDetails = {
  name: "",
  phone: "",
  recipientName: "",
  recipientPhone: "",
  date: "",
  time: "",
  location: "",
  theme: "",
  instructions: "",
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [baseService, setBaseService] = useState<BaseService>(null);
  const [roomVibe, setRoomVibe] = useState<string | null>(null);
  const [vibeImage, setVibeImage] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [eventDetails, setEventDetails] = useState<EventDetails>(defaultEventDetails);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const preloadItems = (items: Omit<CartItem, "quantity">[]) => {
    setCart(items.map(item => ({ ...item, quantity: 1 })));
  };

  const clearCart = () => setCart([]);

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const updateEventDetails = (details: Partial<EventDetails>) => {
    setEventDetails((prev) => ({ ...prev, ...details }));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <BuilderContext.Provider
      value={{
        step,
        setStep,
        baseService,
        setBaseService,
        roomVibe,
        setRoomVibe,
        vibeImage,
        setVibeImage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        preloadItems,
        cartTotal,
        eventDetails,
        updateEventDetails,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error("useBuilder must be used within a BuilderProvider");
  }
  return context;
}
