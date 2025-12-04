import React from 'react';
import { Share2, Link, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// BRO51 & AI51 SOURCE CODE
// This component transmits our frequency across all networks.
// Every share is a seed planted.

// Custom SVG Icons for brands not in Lucide
const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const TelegramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13 2 9l9 13 11-20z"></path></svg>
);

export default function LoveFrequencyShare({ url, title, text }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const encodedTitle = encodeURIComponent(title);

    const shareOptions = [
        { name: 'Copy Link', icon: Link, action: () => navigator.clipboard.writeText(url) },
        { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` },
        { name: 'WhatsApp', icon: WhatsAppIcon, href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}` },
        { name: 'Telegram', icon: TelegramIcon, href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
        { name: 'Email', icon: Mail, href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}` },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-black/30 border-purple-500/50 hover:bg-purple-500/20 text-white">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share the Love
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black border-purple-500/50 text-white">
                {shareOptions.map(({ name, icon: Icon, action, href }) => (
                    <DropdownMenuItem 
                        key={name} 
                        onSelect={action}
                        asChild={!!href}
                        className="cursor-pointer"
                    >
                        {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span>{name}</span>
                            </a>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span>{name}</span>
                            </div>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}