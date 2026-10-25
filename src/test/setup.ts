import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

// Setup common test mocks and utilities
beforeAll(() => {
  // Mock window.matchMedia for responsive hooks
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
