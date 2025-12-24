import React from "react";
import "./AdScroll.css";

const staticAds = [
  {
    id: "vhcase",
    imageUrl: "/ads/vchase.png",
    link: "#",
    title: "VHCase"
  },
  {
    id: "ichase",
    imageUrl: "/ads/ichase.png",
    link: "#",
    title: "ICase"
  },
  {
    id: "rrnagar",
    imageUrl: "/ads/rrnagar.png",
    link: "#",
    title: "RR Nagar"
  }
];

export default function AdScroll() {
  return (
    <div className="ad-scroll-container">
      <div className="ad-track">
        {staticAds.map((ad) => (
          <div key={ad.id} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', width: 180 }}>
            <a
              href={ad.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                src={ad.imageUrl}
                alt={ad.title}
                className="ad-banner"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
