import { FC } from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface GuideCardProps {
  title: string
  icon: IconType
  href: string
}

const GuideCard: FC<GuideCardProps> = ({ title, icon: Icon, href }) => {
  return (
    <Link href={href} className="block w-full">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 flex items-center transition-transform hover:scale-105">
        <Icon className="text-4xl text-blue-500 mr-4 flex-shrink-0" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </Link>
  )
}

export default GuideCard

