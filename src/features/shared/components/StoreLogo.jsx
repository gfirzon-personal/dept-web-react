export default function StoreLogo() {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="storeGradient" x1="10" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#FB7185" />
        </linearGradient>
      </defs>
      <path d="M12 24L16 12H48L52 24V28C52 33.523 47.523 38 42 38C37.879 38 34.341 35.511 32.806 31.95C31.271 35.511 27.733 38 23.612 38C18.089 38 13.612 33.523 13.612 28V24H12Z" fill="url(#storeGradient)" />
      <path d="M18 28H46V52H18V28Z" fill="#FFF7ED" />
      <path d="M24 34H32V52H24V34Z" fill="#1F2937" />
      <path d="M36 34H42V40H36V34Z" fill="#FDBA74" />
      <path d="M13 24H51" stroke="#FFF7ED" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 52H46" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}