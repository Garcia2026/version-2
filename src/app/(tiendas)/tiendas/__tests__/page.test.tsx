import { render, screen } from '@testing-library/react';
import TiendasPage from '../page';
import '@testing-library/jest-dom';

describe('TiendasPage', () => {
  it('renders Tiendas heading', () => {
    render(<TiendasPage />);
    expect(screen.getByText('Tiendas')).toBeInTheDocument();
  });
});
