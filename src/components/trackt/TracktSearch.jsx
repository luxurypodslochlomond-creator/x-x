import React from 'react';
import { Search, X } from 'lucide-react';

export default function TracktSearch({ query, setQuery, resultCount, totalCount }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search assets — try "wheelchair" or "Ward 4" or a tag ID...'
          className="w-full bg-black/40 border border-white/10 text-white placeholder-gray-600 pl-10 pr-10 py-3 font-mono text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {query && (
        <span className="text-gray-500 font-mono text-xs whitespace-nowrap">
          {resultCount} / {totalCount}
        </span>
      )}
    </div>
  );
}