import { getServices, type Service } from "@/lib/firestore"; 

const defaultServices: Service[] = [
  {
    id: "1",
    name: "Aluminum Window Installation",
    description:
      "Professional aluminum window installation with high-quality materials and expert craftsmanship. Includes measurement, custom fitting, and warranty.",
    price: "Starting from $150 per window",
    category: "aluminum",
    images: ["/modern-aluminum-installation.png", "/public/aluminum-workshop.png", "/public/image75.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "2",
    name: "Aluminum Door Fabrication",
    description:
      "Custom aluminum door design and installation for residential and commercial properties. Weather-resistant and durable construction.",
    price: "$300 - $800 per door",
    category: "aluminum",
    images: ["/modern-aluminum-installation.png", "/public/image copy.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "3",
    name: "Aluminum Roofing Systems",
    description:
      "Complete aluminum roofing solutions including gutters, downspouts, and protective coatings. Long-lasting and maintenance-free.",
    price: "$12 - $18 per sq ft",
    category: "aluminum",
    images: ["/image74.png", "/public/image4 copy.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "4",
    name: "Car Rental Service",
    description:
      "Daily and weekly car rental services with well-maintained vehicles. Includes insurance coverage and 24/7 roadside assistance.",
    price: "$25 - $60 per day",
    category: "automotive",
    images: ["/rental-cars.png", "/public/car-showroom-1.png", "/public/image16.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "5",
    name: "Used Car Sales",
    description:
      "Quality pre-owned vehicles with thorough inspection and warranty. Financing options available with competitive rates.",
    price: "$5,000 - $25,000",
    category: "automotive",
    images: ["/used-cars.png", "/public/car-showroom-3.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "6",
    name: "Property Management",
    description:
      "Comprehensive property management services including tenant screening, maintenance coordination, and rent collection.",
    price: "8% - 12% of monthly rent",
    category: "property",
    images: ["/property-management.png", "/public/image5.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "7",
    name: "Construction Consultation",
    description:
      "Expert construction consultation and project management services. From planning to completion with quality assurance.",
    price: "$100 - $200 per hour",
    category: "construction",
    images: ["/construction-consultation.png", "/public/image6.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "8",
    name: "Maintenance Services",
    description:
      "Regular maintenance services for residential and commercial properties including plumbing, electrical, and general repairs.",
    price: "$50 - $150 per hour",
    category: "maintenance",
    images: ["/maintenance-services.png", "/public/image7.png", "/public/image9.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "9",
    name: "Custom Aluminum Fabrication",
    description:
      "High-quality custom aluminum fabrication services for specialized projects.",
    price: "Contact for pricing",
    category: "aluminum",
    images: ["/public/image10.png", "/public/image11.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
  {
    id: "10",
    name: "Advanced Roofing Solutions",
    description:
      "Innovative roofing systems for residential and commercial buildings.",
    price: "$15 - $25 per sq ft",
    category: "construction",
    images: ["/public/image14.png", "/public/image15.png"],
    createdAt: { seconds: Date.now() / 1000, nanoseconds: 0 } as any,
  },
];