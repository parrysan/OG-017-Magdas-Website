'use client';

import { useState } from 'react';
import { Button } from './Button';

interface ContactFormProps {
  tabs: { key: string; label: string }[];
  fields: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
  };
  placeholders: Record<string, string>;
  className?: string;
}

export function ContactForm({ tabs, fields, placeholders, className = '' }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');

  return (
    <div className={`max-w-xl mx-auto ${className}`}>
      <div className="flex gap-1 mb-[var(--spacing-8)] bg-[var(--color-bg-muted)] rounded-full p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 py-2.5 px-4 rounded-full text-[var(--text-sm)] font-medium transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-white text-[var(--color-text)] shadow-[var(--shadow-sm)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); }}
        className="space-y-[var(--spacing-4)]"
      >
        <div>
          <label htmlFor="name" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.name}
          </label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.email}
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.phone}
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-[var(--text-sm)] font-medium text-[var(--color-text)] mb-1">
            {fields.message}
          </label>
          <textarea
            id="message"
            rows={5}
            required
            placeholder={placeholders[activeTab] || ''}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-[var(--text-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-cta)] focus:border-transparent transition-shadow resize-y"
          />
        </div>
        <Button type="submit" pill size="lg" className="w-full">
          {fields.submit}
        </Button>
      </form>
    </div>
  );
}
