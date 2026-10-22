import { Outlet } from 'react-router-dom';
import OnlineNavbar from '../common/OnlineNavbar';
import Footer from '../common/Footer';
import CookieConsent from '../common/CookieConsent';

export default function OnlineLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-900 text-white selection:bg-sky-500 selection:text-white">
      <OnlineNavbar />
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
