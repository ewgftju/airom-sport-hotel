"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BedDouble,
  Car,
  Check,
  ChevronDown,
  Clock3,
  FileCheck2,
  Hotel,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Users,
  UtensilsCrossed,
  Wifi,
} from "lucide-react";
import { siteCopy, type SiteLocale } from "./content";
import { getHotelRates } from "./hotel-data";
import MenuExplorer from "./menu-explorer";

const phoneDisplay = "+7 775 808 3169";
const phoneHref = "tel:+77758083169";
const instagramHref = "https://www.instagram.com/airom_hotel/";
const mapHref = "https://2gis.kz/atyrau/geo/70030076164553461";

const roomImages = [
  "/sport/photos/single-room.webp",
  "/sport/photos/twin-room-a.webp",
  "/sport/photos/team-room-main.webp",
];

const galleryImages = [
  "/sport/photos/single-room-b.webp",
  "/sport/photos/bathroom-basic.webp",
  "/sport/photos/shower.webp",
  "/sport/photos/bunk-portrait-a.webp",
  "/sport/photos/bunk-portrait-b.webp",
  "/sport/photos/bunk-portrait-c.webp",
  "/sport/photos/bunk-detail-wide-a.webp",
  "/sport/photos/bunk-detail-wide-b.webp",
  "/sport/photos/bunk-detail-wide-c.webp",
];

const roomIcons = [Hotel, BedDouble, Users];
const advantageIcons = [Clock3, UtensilsCrossed, FileCheck2, Car, Wifi, ShieldCheck];

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5l-4.4 1.2 1.2-4.2a8.5 8.5 0 1 1 15.8-4.5Z" />
      <path d="M8.2 7.7c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.8 2c.1.2.1.4 0 .6l-.6.8c-.2.2-.2.4 0 .7.5.9 1.2 1.6 2.1 2.1.3.2.5.2.7 0l.9-1.1c.2-.2.4-.3.7-.2l2.1 1c.3.1.4.3.4.5 0 .4-.2 1.2-.6 1.7-.4.5-1.1.8-1.9.8-1 0-2.5-.4-4.2-1.9-2.1-1.8-3.5-4.6-3.6-6.3 0-.7.2-1.2.5-1.6Z" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <span className="brand-mark-wrap">
        <Image src="/sport/brand-mark.png" alt="" width={54} height={52} priority />
      </span>
      <span className="brand-copy">
        <strong>AIROM</strong>
        <span>SPORT HOTEL</span>
      </span>
    </span>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<SiteLocale>("ru");
  const t = siteCopy[locale];
  const hotelRates = getHotelRates(locale);
  const whatsappHref = `https://wa.me/77758083169?text=${encodeURIComponent(t.whatsapp)}`;

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("airom-sport-language");
    if (savedLocale === "ru" || savedLocale === "kk") setLocale(savedLocale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.metaTitle;
  }, [locale, t.metaTitle]);

  const selectLanguage = (nextLocale: SiteLocale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("airom-sport-language", nextLocale);
  };

  return (
    <main data-locale={locale}>
      <header className="site-header">
        <a href="#top" className="header-brand" aria-label={t.homeLabel}><Brand compact /></a>

        <nav className="desktop-nav" aria-label={t.mainNavigation}>
          <a href="#rooms">{t.nav.rooms}</a>
          <a href="#rates">{t.nav.rates}</a>
          <a href="#menu">{t.nav.menu}</a>
          <a href="#teams">{t.nav.teams}</a>
          <a href="#contacts">{t.nav.contacts}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label={t.languageLabel}>
            <button type="button" aria-pressed={locale === "ru"} onClick={() => selectLanguage("ru")}>РУС</button>
            <span>/</span>
            <button type="button" aria-pressed={locale === "kk"} onClick={() => selectLanguage("kk")}>ҚАЗ</button>
          </div>
          <a className="header-phone" href={phoneHref}><Phone size={16} /><span>{phoneDisplay}</span></a>
          <a className="header-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} />{t.actions.write}</a>
        </div>

        <details className="mobile-menu">
          <summary aria-label={t.openMenu}><Menu size={25} /></summary>
          <nav aria-label={t.mobileNavigation}>
            <a href="#rooms">{t.nav.rooms}</a>
            <a href="#rates">{t.nav.rates}</a>
            <a href="#menu">{t.nav.menu}</a>
            <a href="#teams">{t.nav.teams}</a>
            <a href="#contacts">{t.nav.contacts}</a>
            <a href={phoneHref}>{phoneDisplay}</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow eyebrow--accent">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}<span>{t.hero.titleAccent}</span></h1>
          <p className="hero-lead">{t.hero.lead}</p>
          <div className="hero-actions">
            <a className="button button--accent" href={whatsappHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={19} />{t.hero.book}<ArrowRight size={19} />
            </a>
            <a className="button button--dark-outline" href="#rates">{t.hero.viewRates}</a>
          </div>
          <div className="hero-price">
            <span>{t.hero.fromLabel}</span>
            <strong>{t.hero.from}</strong>
            <small>{t.hero.perNight}</small>
          </div>
        </div>

        <div className="hero-visual">
          <Image src="/sport/photos/twin-room-b.webp" alt={t.hero.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
          <div className="hero-visual-label"><span>01</span><strong>{t.hero.visualLabel}</strong></div>
        </div>
      </section>

      <section className="fact-strip" aria-label={t.factsLabel}>
        {t.facts.map((fact, index) => (
          <div key={fact.label}><span>0{index + 1}</span><strong>{fact.value}</strong><small>{fact.label}</small></div>
        ))}
      </section>

      <section className="section rooms-section" id="rooms">
        <div className="section-heading">
          <div><p className="eyebrow">{t.rooms.eyebrow}</p><h2>{t.rooms.title}</h2></div>
          <p>{t.rooms.intro}</p>
        </div>

        <div className="room-cards">
          {t.rooms.types.map((room, index) => {
            const Icon = roomIcons[index];
            return (
              <article className={`room-card room-card--${index + 1}`} key={room.name}>
                <div className="room-photo">
                  <Image src={roomImages[index]} alt={room.imageAlt} fill sizes="(max-width: 760px) 100vw, 34vw" />
                  <span className="room-number">0{index + 1}</span>
                </div>
                <div className="room-card-copy">
                  <Icon size={26} />
                  <div><h3>{room.name}</h3><p>{room.description}</p></div>
                  <strong>{room.price}</strong>
                </div>
              </article>
            );
          })}
        </div>

        <div className="amenities-grid">
          {t.advantages.items.map((item, index) => {
            const Icon = advantageIcons[index];
            return <article key={item.title}><Icon size={23} /><div><h3>{item.title}</h3><p>{item.text}</p></div></article>;
          })}
        </div>
      </section>

      <section className="section gallery-section" aria-labelledby="gallery-title">
        <div className="section-heading gallery-heading">
          <div><p className="eyebrow">{t.gallery.eyebrow}</p><h2 id="gallery-title">{t.gallery.title}</h2></div>
          <p>{t.gallery.intro}</p>
        </div>
        <div className="photo-gallery">
          {galleryImages.map((src, index) => (
            <figure className="gallery-photo" key={src}>
              <Image src={src} alt={t.gallery.imageAlts[index]} fill sizes="(max-width: 700px) 100vw, (max-width: 980px) 50vw, 34vw" />
              <figcaption><span>0{index + 1}</span>{t.gallery.captions[index]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rates-section" id="rates">
        <div className="section rates-inner">
          <div className="section-heading section-heading--light">
            <div><p className="eyebrow eyebrow--accent">{t.rates.eyebrow}</p><h2>{t.rates.title}</h2></div>
            <p>{t.rates.intro}</p>
          </div>

          {hotelRates.map((hotel) => (
            <article className="rates-board" key={hotel.name}>
              <header className="rates-board-header">
                <div><Hotel size={25} /><span><small>{t.rates.hotel}</small><strong>{hotel.name}</strong><em>{hotel.address}</em></span></div>
                <b>{hotel.from}</b>
              </header>
              <div className="rate-room-list">
                {hotel.rooms.map((room, index) => (
                  <details className="rate-room" key={room.name} open={index === 0}>
                    <summary><span><strong>{room.name}</strong><small>{room.description}</small></span><ChevronDown size={20} /></summary>
                    <div className="rate-table" role="table" aria-label={`${hotel.name}: ${room.name}`}>
                      <div className="rate-row rate-row--head" role="row"><span>{t.rates.tariff}</span><span>{t.rates.perRoom}</span><span>{t.rates.perPerson}</span></div>
                      {room.options.map((option) => (
                        <div className="rate-row" role="row" key={option.label}><span>{option.label}</span><strong>{option.total}</strong><small>{option.perPerson ?? "—"}</small></div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
          <p className="rates-note"><span>*</span>{t.rates.note}</p>
        </div>
      </section>

      <section className="food-section" id="food">
        <div className="food-visual">
          <Image src="/sport/photos/team-room-tv.webp" alt={t.food.imageAlt} fill sizes="(max-width: 900px) 100vw, 52vw" />
        </div>
        <div className="food-copy">
          <p className="eyebrow">{t.food.eyebrow}</p>
          <h2>{t.food.title}</h2>
          <p className="food-intro">{t.food.intro}</p>
          <div className="meal-list">
            {t.food.meals.map((meal, index) => <div key={meal}><span>0{index + 1}</span><strong>{meal}</strong></div>)}
          </div>
          <a className="text-link" href="#menu">{t.food.openMenu}<ArrowRight size={19} /></a>
        </div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="section-heading menu-heading">
          <div><p className="eyebrow">{t.menu.eyebrow}</p><h2>{t.menu.title}</h2></div>
          <p>{t.menu.intro}</p>
        </div>
        <MenuExplorer locale={locale} />
        <div className="menu-footnote"><UtensilsCrossed size={21} /><p>{t.menu.note}</p></div>
      </section>

      <section className="section teams-section" id="teams">
        <div className="teams-heading">
          <div className="teams-heading-main">
            <p className="eyebrow eyebrow--accent">{t.teams.eyebrow}</p>
            <h2>{t.teams.title}</h2>
          </div>
          <div className="teams-heading-aside">
            <span aria-hidden="true">01</span>
            <p>{t.teams.intro}</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={19} />{t.actions.write}<ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className="teams-layout">
          <div className="team-room-photo">
            <Image src="/sport/photos/team-room-angle.webp" alt={t.teams.imageAlt} fill sizes="(max-width: 900px) 100vw, 52vw" />
          </div>
          <div className="documents-card">
            <FileCheck2 size={31} />
            <p>{t.teams.documents}</p>
            <h3>{t.teams.package}</h3>
            <ul>{t.teams.documentList.map((item) => <li key={item}><Check size={18} />{item}</li>)}</ul>
            <small>{t.teams.tax}</small>
          </div>
        </div>
      </section>

      <section className="booking-section">
        <div><p className="eyebrow eyebrow--accent">{t.booking.eyebrow}</p><h2>{t.booking.title}</h2></div>
        <div className="booking-price"><span>{t.booking.from}</span><strong>14 000 ₸</strong><small>{t.booking.perNight}</small></div>
        <div className="booking-actions">
          <a className="button button--accent" href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon size={19} />{t.actions.write}</a>
          <a className="button button--dark-outline" href={phoneHref}><Phone size={18} />{t.actions.call}</a>
        </div>
      </section>

      <section className="contacts-section" id="contacts">
        <div className="contact-map-panel">
          <div className="map-grid" aria-hidden="true" />
          <MapPin size={42} />
          <span>AIROM</span>
          <strong>SPORT HOTEL</strong>
          <small>{t.contacts.city}</small>
        </div>
        <div className="contact-copy">
          <p className="eyebrow">{t.contacts.eyebrow}</p>
          <h2>{t.contacts.title}</h2>
          <div className="contact-lines">
            <a href={mapHref} target="_blank" rel="noreferrer"><MapPin size={22} /><span><small>{t.contacts.addressLabel}</small>{t.contacts.address}</span></a>
            <a href={phoneHref}><Phone size={22} /><span><small>{t.contacts.bookingLabel}</small>{phoneDisplay}</span></a>
            <a href={instagramHref} target="_blank" rel="noreferrer"><InstagramIcon size={22} /><span><small>Instagram</small>@airom_hotel</span></a>
            <div><Clock3 size={22} /><span><small>{t.contacts.reception}</small>{t.contacts.alwaysOpen}</span></div>
          </div>
          <a className="button button--ink" href={mapHref} target="_blank" rel="noreferrer">{t.contacts.route}<ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="site-footer">
        <div><Brand /><p>{t.footer.description}</p></div>
        <nav><a href="#rooms">{t.nav.rooms}</a><a href="#rates">{t.nav.rates}</a><a href="#menu">{t.nav.menu}</a><a href="#contacts">{t.nav.contacts}</a></nav>
        <div className="footer-contact"><a href={phoneHref}>{phoneDisplay}</a><a href={instagramHref} target="_blank" rel="noreferrer">@airom_hotel</a><span>© 2026 AIROM Sport Hotel</span></div>
      </footer>

      <div className="mobile-contact-bar">
        <a href={phoneHref}><Phone size={18} />{t.actions.call}</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} />{t.actions.write}</a>
      </div>
    </main>
  );
}
