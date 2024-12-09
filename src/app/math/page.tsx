import GuideCard from '@/components/guide-card'
import { PiMapPin, PiSquare, PiListNumbers, PiHouse } from 'react-icons/pi'


const guides = [
  { 
    title: 'Encuentra al personaje utilizando coordenadas', 
    icon: PiMapPin, 
    href: '/blog/guia-1-mate' 
  },
  { 
    title: 'Cálculo aproximado de áreas', 
    icon: PiSquare, 
    href: '/blog/guia-2-mate' 
  },
  { 
    title: 'Sucesiones y Fibonacci', 
    icon: PiListNumbers, 
    href: '/blog/guia-3-mate' 
  },
  { 
    title: 'El problema de las casas y los suministros', 
    icon: PiHouse, 
    href: '/blog/guia-4-mate' 
  },
]

export default function Math() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Guías de Matemáticas</h1>
        <div className="space-y-6">
          {guides.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>
      </div>
    </div>
  )
}

