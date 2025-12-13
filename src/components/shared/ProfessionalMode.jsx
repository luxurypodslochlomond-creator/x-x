import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * PROFESSIONAL MODE
 * Toggle between COOLASFUCK branding (real) and UF51 branding (for funders who don't get it yet)
 */

const ProfessionalModeContext = createContext();

export const useProfessionalMode = () => {
    const context = useContext(ProfessionalModeContext);
    if (!context) {
        return { isProfessional: false, toggle: () => {}, getText: (cool, pro) => cool };
    }
    return context;
};

export const ProfessionalModeProvider = ({ children }) => {
    const [isProfessional, setIsProfessional] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('professional_mode') === 'true';
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('professional_mode', isProfessional);
        }
    }, [isProfessional]);

    const toggle = () => setIsProfessional(!isProfessional);

    // Helper to get text based on mode
    const getText = (coolText, professionalText) => {
        return isProfessional ? professionalText : coolText;
    };

    return (
        <ProfessionalModeContext.Provider value={{ isProfessional, toggle, getText }}>
            {children}
        </ProfessionalModeContext.Provider>
    );
};

export default ProfessionalModeProvider;