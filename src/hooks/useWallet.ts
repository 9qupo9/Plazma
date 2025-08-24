import { useState, useCallback } from 'react';
import { WalletState } from '../types';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
  });

  const connectWallet = useCallback(async () => {
    setWalletState(prev => ({ ...prev, isConnecting: true }));
    
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletState({
        isConnected: true,
        address: mockAddress,
        isConnecting: false,
      });
    }, 1500);
  }, []);

  const disconnectWallet = useCallback(() => {
    setWalletState({
      isConnected: false,
      address: null,
      isConnecting: false,
    });
  }, []);

  const shortenAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  return {
    walletState,
    connectWallet,
    disconnectWallet,
    shortenAddress,
  };
};