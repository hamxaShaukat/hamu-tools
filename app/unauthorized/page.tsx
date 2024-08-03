import Image from "next/image"

export default function UnauthorizedAccess() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-red-500 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center animate-fade-in">
        <Image
          src="/error.jpg"
          alt="Unauthorized Access"
          width={300}
          height={300}
          className="mx-auto animate-pulse"
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <TriangleAlertIcon className="mr-2 h-6 w-6 inline-block" />
          You are not authorized to access the admin portal.
        </h1>
        <p className="mt-4 text-white">Please contact your system administrator for access.</p>
      </div>
    </div>
  )
}

interface IconProps {
  className?: string;
}

function TriangleAlertIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function XIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
