import Image, { ImageProps } from 'next/image'
import {
    EB_Garamond
} from "next/font/google"

const garamond = EB_Garamond({
    weight: '400',
    subsets: [
        'latin'
    ]
})

export function useMDXComponents() {
    return {
      h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className={`${garamond.className} mb-2 `} style={{ fontSize: '55px' }}>{children}</h1>
      ),
      img: (props: ImageProps) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          {...(props as ImageProps)}
        />
      ),
      h2 : ({ children }: { children: React.ReactNode }) => (
        <h2 className={`${garamond.className} mb-2 `} style={{ fontSize: '48px' }}>{children}</h2>
      ),
      p: ({ children }: { children: React.ReactNode }) => (
        <p 
        className={`${garamond.className} mb-2 `}
        style={{ fontSize: '24px', lineHeight: '1.5' }}>{children}</p>
      ),
      // add styles for list items
      ul: ({ children }: { children: React.ReactNode }) => (
        <ul style={{ fontSize: '24px', lineHeight: '1.5' }}>{children}</ul>
      ),
      li: ({ children }: { children: React.ReactNode }) => (
        <li style={{ fontSize: '24px', lineHeight: '1.5' }}>{children}</li>
      ),

    };
  }