import GuideCard from '@/components/guide-card'
import { PiSneakerMove} from 'react-icons/pi'
import { GiPrism, GiCircuitry, GiWaves } from "react-icons/gi";
const guides = [
  { 
    title: 'Fuerzas y movimiento', 
    icon: 
    PiSneakerMove, 
    href: '/blog/guia-1-ciencias' 
  },
  { 
    title: 'Óptica y los fenómenos cotidianos', 
    icon: GiPrism, 
    href: '/blog/guia-2-ciencias' 
  },
  { 
    title: '¡Explora el Mundo de la Electricidad y los Circuitos: Una Aventura para Niños Curiosos!', 
    icon: GiCircuitry, 
    href: '/blog/guia-3-ciencias' 
  },
  { 
    title: 'Viaje Sonoro: Aventuras en el Mundo de las Ondas', 
    icon: GiWaves, 
    href: '/blog/guia-4-ciencias' 
  },
]

export default function Science() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Guías de Ciencias</h1>
        <div className="space-y-6">
          {guides.map((guide, index) => (
            <GuideCard key={index} {...guide} />
          ))}
        </div>
      </div>
    </div>
  )
}

