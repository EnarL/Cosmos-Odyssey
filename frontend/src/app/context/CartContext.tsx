import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import {TravelItem} from "@/app/types/travel";
interface CartItem {
    offerId: string;
    priceListId: string;
    companyName: string;
    fromName: string;
    toName: string;
    price: number;
    flightDuration: number;
    amount: number;
}
interface CartContextType {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    addToCart: (item: TravelItem) => void;
    removeFromCart: (offerId: string) => void;
    removeOne: (offerId: string) => void;
    totalPrice: number;
    totalDurationMillis: number;
    errorMessage: string;
    setErrorMessage: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalDurationMillis, setTotalDurationMillis] = useState<number>(0);

    const addToCart = (item: TravelItem): void => {
        try {
            setCart((prevCart) => {
                if (!item || !item.offerId) {
                    throw new Error('Invalid item or missing offerId');
                }

                const existingItem = prevCart.find(cartItem => cartItem.offerId === item.offerId);
                if (existingItem) {
                    return prevCart.map(cartItem =>
                        cartItem.offerId === item.offerId
                            ? { ...cartItem, amount: cartItem.amount + 1 }
                            : cartItem
                    );
                } else {
                    const newCartItem: CartItem = {
                        offerId: item.offerId,
                        priceListId: item.priceListId,
                        companyName: item.companyName,
                        fromName: item.fromName,
                        toName: item.toName,
                        price: item.price,
                        flightDuration: item.flightDuration,
                        amount: 1,
                    };
                    return [...prevCart, newCartItem];
                }
            });
        } catch (error) {
            console.error("Error adding item to cart:", (error as Error).message);
        }
    };

    const removeFromCart = (offerId: string): void => {
        setCart((prevCart) =>
            prevCart.filter(item => item.offerId !== offerId)
        );
    };

    const removeOne = (offerId: string): void => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.offerId === offerId) {
                        return item.amount > 1 ? { ...item, amount: item.amount - 1 } : null;
                    }
                    return item;
                })
                .filter((item): item is CartItem => item !== null)
        );
    };

    useEffect(() => {
        const newTotalPrice = cart.reduce((acc, item) => acc + item.amount * item.price, 0);
        const newTotalDurationMillis = cart.reduce((acc, item) => acc + item.amount * item.flightDuration, 0);

        setTotalPrice(newTotalPrice);
        setTotalDurationMillis(newTotalDurationMillis);
    }, [cart]);

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            removeFromCart,
            removeOne,
            totalPrice,
            totalDurationMillis,
            errorMessage,
            setErrorMessage
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};