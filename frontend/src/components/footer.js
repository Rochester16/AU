import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white p-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

        <div className="footer-logo space-y-3">
          <img src="/jewelry/logo.png" className="w-12" />
          <h2 className="text-xl font-bold">
            AUREVRA<br /><span className="text-sm font-normal">JEWELRY</span>
          </h2>

          <div className="flex gap-3">
            <a href="https://facebook.com"><img src="/jewelry/FB.png" className="w-6" /></a>
            <a href="https://instagram.com"><img src="/jewelry/insta.png" className="w-6" /></a>
            <a href="https://x.com"><img src="/jewelry/x.png" className="w-6" /></a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">CONTACT US</h3>
          <hr />
          <p>Email: aurevrajewelry@gmail.com</p>
          <p>Phone: 09123456789</p>
        </div>

        <div>
          <h3 className="font-bold">ABOUT US</h3>
          <hr />
          <p>Aurevra Jewelry is a timeless collection celebrating individuality and craftsmanship.</p>
        </div>

        <div>
          <h3 className="font-bold">DEVELOPERS :</h3>
          <hr />
          <p>Queenie Ruth Legaspi</p>
          <p>Josh Lenard Oliveros</p>
          <p>April Mae Agustin</p>
          <p>Vince Vuzty Nabong</p>
        </div>

        <div>
          <h3 className="font-bold">ADDRESS/OFFICE :</h3>
          <hr />
          <p>Bulacan State University, Hagonoy Bulacan</p>
        </div>

      </div>

      <div className="footer-bottom mt-6 text-center">
        <p>© 2025 Aurevra Jewelry. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
