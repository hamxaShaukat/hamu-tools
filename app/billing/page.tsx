interface IconProps extends React.SVGProps<SVGSVGElement> {}


export default function Billing() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background">
        <div className="animate-bounce">
          <HammerIcon className="w-24 h-24 text-primary" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-foreground">Under Construction</h2>
        <p className="mt-2 text-muted-foreground">We&apos;re working hard to bring you something amazing.</p>
      </div>
    )
  }
  
  function HammerIcon(props:IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
        <path d="m18 15 4-4" />
        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172V7l-2.26-2.26a6 6 0 0 0-4.202-1.756L9 2.96l.92.82A6.18 6.18 0 0 1 12 8.4V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
      </svg>
    )
  }
  
  
  function XIcon(props:IconProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }