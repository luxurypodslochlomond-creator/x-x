import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Building, Send } from 'lucide-react';

export default function ESGContactModal({ open, onOpenChange }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via backend
      const { sendESGInquiry } = await import('@/functions/sendESGInquiry');
      const response = await sendESGInquiry(formData);

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        setTimeout(() => {
          onOpenChange(false);
          setSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-green-500/30 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">Let's Discuss Your ESG Strategy</DialogTitle>
          <DialogDescription className="text-gray-400">
            Tell us about your organization and how we can help you achieve your sustainability goals.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="text-green-400 text-lg font-bold">✓ Message sent successfully!</div>
            <p className="text-gray-400">We'll be in touch within 24 hours at {formData.email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm font-bold block mb-2">Full Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-bold block mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email *
              </label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@company.com"
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-bold block mb-2 flex items-center gap-2">
                <Building className="w-4 h-4" /> Organization
              </label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Fund / Corporation / Foundation"
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-bold block mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44..."
                className="bg-black/50 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-bold block mb-2">Your Inquiry *</label>
              <Textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your ESG goals and how we can help..."
                className="bg-black/50 border-gray-700 text-white h-24"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold hover:opacity-90 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}