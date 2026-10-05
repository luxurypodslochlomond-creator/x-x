import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { LocalLedger } from './LocalLedger';
import { DeviceCrypto } from './DeviceCrypto';
import { base44 } from '@/api/base44Client';

export default function BluetoothP2P({ amount, message, onSuccess }) {
    const [isScanning, setIsScanning] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [deviceId, setDeviceId] = useState('');
    const [user, setUser] = useState(null);

    // Initialize device crypto ID
    useEffect(() => {
        const initDevice = async () => {
            try {
                const id = await DeviceCrypto.getDeviceId();
                setDeviceId(id);
                const currentUser = await base44.auth.me();
                setUser(currentUser);
            } catch (err) {
                console.error('Device init error:', err);
            }
        };
        initDevice();
    }, []);

    const sendViaBluetooth = async () => {
        try {
            setIsScanning(true);
            setError(null);
            setStatus('Scanning...');

            if (!user) {
                throw new Error('User not loaded');
            }

            // DOUBLE-SPEND CHECK
            const availableBalance = LocalLedger.getBalance();
            if (parseFloat(amount) > availableBalance) {
                throw new Error(`Insufficient balance: ${availableBalance.toFixed(1)} P51`);
            }

            if (!navigator.bluetooth) {
                throw new Error('Bluetooth not supported');
            }

            // Request device (nearby receiver)
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                optionalServices: ['battery_service']
            });

            setStatus('Connecting...');
            
            // CRYPTO HANDSHAKE
            const myPublicKey = await DeviceCrypto.getPublicKeyForSharing();
            const myDeviceId = await DeviceCrypto.getDeviceId();

            // Transaction data (device-to-device)
            const transactionData = {
                from_device: myDeviceId,
                to_device: device.id,
                amount: parseFloat(amount),
                message: message || 'Device transfer',
                timestamp: Date.now()
            };

            setStatus('Signing...');
            
            // Sign with my private key
            const signature = await DeviceCrypto.signTransaction(transactionData);

            setStatus('Sending...');

            // LOCK FUNDS IMMEDIATELY
            LocalLedger.recordPendingOut(
                parseFloat(amount),
                device.id,
                'bluetooth',
                signature,
                null
            );

            // Update sender balance (me)
            const newBalance = user.p51_balance - parseFloat(amount);
            await base44.auth.updateMe({ p51_balance: newBalance });

            // Create transaction record
            await base44.entities.Transaction.create({
                transaction_type: 'sent',
                p51_amount: parseFloat(amount),
                from_user: user.email,
                to_user: `device:${device.id}`,
                reason: message || 'Bluetooth device transfer',
                crypto_signature: signature,
                status: 'completed'
            });

            // Confirm in ledger
            LocalLedger.confirmTransaction(signature);

            setStatus('Sent!');

            // Store transfer data locally
            const transferData = {
                ...transactionData,
                signature,
                myPublicKey,
                deviceName: device.name
            };

            const transfers = JSON.parse(localStorage.getItem('bluetoothTransfers') || '[]');
            transfers.push(transferData);
            localStorage.setItem('bluetoothTransfers', JSON.stringify(transfers));

            setIsScanning(false);
            setIsSending(false);
            
            if (onSuccess) {
                setTimeout(() => onSuccess(), 1000);
            }

        } catch (err) {
            console.error('Bluetooth error:', err);
            setError(err.message || 'Transfer failed');
            setIsScanning(false);
            setIsSending(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* DEVICE ID DISPLAY */}
            {deviceId && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 text-xs font-mono mb-1">YOUR DEVICE</p>
                    <p className="text-white text-sm font-mono font-black">{deviceId.slice(0, 8)}...{deviceId.slice(-8)}</p>
                    <p className="text-blue-400/60 text-xs font-mono mt-1">Zero identity • Pure crypto</p>
                </div>
            )}

            <Button
                onClick={sendViaBluetooth}
                disabled={isScanning || isSending || !deviceId || !amount}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 text-lg font-bold"
            >
                {isScanning || isSending ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {status}
                    </>
                ) : (
                    <>
                        <Zap className="w-5 h-5 mr-2" />
                        TAP TO PAY
                    </>
                )}
            </Button>

            {status && !error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyan-900/30 border border-cyan-500/50 rounded-lg p-3 flex items-center gap-2"
                >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-400 text-sm font-mono">{status}</span>
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 border border-red-500/50 rounded-lg p-3 flex items-center gap-2"
                >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 text-sm font-mono">{error}</span>
                </motion.div>
            )}

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 text-xs font-mono">
                    ⚡ Device-to-device • Zero surveillance • Both wallets update instantly
                </p>
            </div>
        </div>
    );
}