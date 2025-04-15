import { useState, ReactNode } from "react"

interface Service {
  name: string
  price: string
}

interface ServiceCategoryProps {
  title: string
  services?: Service[]
  children?: ReactNode
}

export default function ServiceCategory({ title, services, children }: ServiceCategoryProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-3 sm:py-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="text-base sm:text-lg">{title}</h4>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        )}
      </div>

      {isOpen && (
        <div className="mt-3 sm:mt-4 pl-3 sm:pl-4">
          {services && (
            <ul className="space-y-1 sm:space-y-2">
              {services.map((service, index) => (
                <li key={index} className="flex justify-between text-sm sm:text-base">
                  <span>{service.name}</span>
                  <span className="text-gray-500">{service.price}</span>
                </li>
              ))}
            </ul>
          )}
          {children && <div className="mt-3 sm:mt-4">{children}</div>}
        </div>
      )}
    </div>
  )
}