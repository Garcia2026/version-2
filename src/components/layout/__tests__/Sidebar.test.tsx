import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import '@testing-library/jest-dom';

describe('Sidebar', () => {
  it('renders navigation links', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Tiendas')).toBeInTheDocument();
  });
});
