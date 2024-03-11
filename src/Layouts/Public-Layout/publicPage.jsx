import React, { useEffect, useState, CSSProperties } from "react";
import Header from "./components/header";
import "./public.scss";
import Home from "./components/home";
import Services from "./components/services";
import Support from "./components/support";
import Footer from "./components/footer";
import Loader from "../../utils/react-loader";


export default function PublicPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  }, []);

  return (
    <>
      <Header />
        <div>
          <section id="personal">
            <Home />
          </section>

          <section id="Services">
            <Services />
          </section>

          <section id="support">
            <Support />
          </section>

          <section>
            <Footer />
          </section>
        </div>

    </>
  );
}
