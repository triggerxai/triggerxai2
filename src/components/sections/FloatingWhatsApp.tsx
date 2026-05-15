const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FloatingWhatsApp = () => {
  const whatsappMessage = encodeURIComponent(
    "Hi Aditya! I've reviewed your work and was impressed. I'm planning to implement an AI system for my business and would love to discuss how you can help."
  );
  const whatsappLink = `https://wa.me/8801317003255?text=${whatsappMessage}`;

  return (
    <>
      <style>{`
        @keyframes floatingCtaGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .floating-expert-cta {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px 12px 14px;
          border-radius: 9999px;
          text-decoration: none;
          color: #1f2937;
          background:
            linear-gradient(135deg,
              rgba(167, 211, 178, 0.95) 0%,
              rgba(170, 220, 215, 0.95) 35%,
              rgba(245, 230, 210, 0.95) 70%,
              rgba(247, 200, 170, 0.95) 100%);
          background-size: 200% 200%;
          animation: floatingCtaGradient 12s ease infinite;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow:
            0 10px 30px -10px rgba(37, 211, 102, 0.25),
            0 4px 14px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-position 0.3s ease;
        }
        .floating-expert-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 16px 40px -10px rgba(37, 211, 102, 0.35),
            0 6px 20px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
        }
        .floating-expert-cta__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #4FBE7E 0%, #2FA968 100%);
          color: #ffffff;
          box-shadow:
            0 4px 12px rgba(47, 169, 104, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }
        .floating-expert-cta__title {
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.005em;
          line-height: 1.1;
          color: #1f2937;
        }
        .floating-expert-cta__sub {
          font-weight: 500;
          font-size: 11px;
          line-height: 1.1;
          margin-top: 2px;
          color: rgba(31, 41, 55, 0.6);
        }
      `}</style>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to an Expert on WhatsApp"
        data-click-sound
        className="floating-expert-cta"
      >
        <span className="floating-expert-cta__icon">
          <WhatsAppIcon className="h-[18px] w-[18px]" />
        </span>
        <span className="floating-expert-cta__title">Talk to an Expert</span>
      </a>
    </>
  );
};

export default FloatingWhatsApp;
