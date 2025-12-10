import React from 'react';

/**
 * CURRENCY DISPLAY
 * Shows amounts in the right currency with proper symbol
 * Supports international touring (K-pop, worldwide gigs)
 */

export default function CurrencyDisplay({ amount, currency = 'GBP', className = '' }) {
    const symbols = {
        GBP: '£',
        USD: '$',
        EUR: '€',
        JPY: '¥',
        KRW: '₩',
        AUD: 'A$',
        CAD: 'C$'
    };

    const symbol = symbols[currency] || currency;
    
    // Format based on currency (Japanese Yen and Korean Won don't use decimals)
    const formatted = ['JPY', 'KRW'].includes(currency)
        ? Math.round(amount).toLocaleString()
        : amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <span className={className}>
            {symbol}{formatted}
        </span>
    );
}