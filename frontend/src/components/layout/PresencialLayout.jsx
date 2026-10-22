import { Outlet } from 'react-router-dom';
import PresencialNavbar from '../common/PresencialNavbar';
import Footer from '../common/Footer';
import CookieConsent from '../common/CookieConsent';

export default function PresencialLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-white selection:bg-[#EF7F7D] selection:text-white">
      <PresencialNavbar />
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
