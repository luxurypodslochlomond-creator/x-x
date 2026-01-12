import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronRight, Radio } from 'lucide-react';

/**
 * BREADCRUMBS - So dafties don't get lost ❤️😎
 * Simple navigation path indicator
 */

export default function ScottBreadcrumbs({ path }) {
    return (
        <div className="flex items-center gap-2 text-sm font-mono mb-4">
            {path.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && <ChevronRight className="w-4 h-4 text-gray-600" />}
                    {item.url ? (
                        <Link 
                            to={createPageUrl(item.url)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors font-bold"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-gray-500 font-bold">{item.label}</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}