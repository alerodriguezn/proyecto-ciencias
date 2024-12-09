import {
  EB_Garamond
} from "next/font/google"

const garamond = EB_Garamond({
  weight: '400',
  subsets: [
      'latin'
  ]
})


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const slug = (await params).slug;
    const { default: Post } = await import(`/src/docs/${slug}.mdx`);
  
    return (
      <main className="w-full flex justify-center  ">
        <div className={`w-[60%] ${garamond.className} `}>
          <Post />
        </div>
      </main>
  );
  }
  
  export function generateStaticParams() {
    return [
        { slug: 'guia-1-ciencias' },
        { slug: 'guia-2-ciencias' },
        { slug: 'guia-3-ciencias' },
        { slug: 'guia-4-ciencias' },
        { slug: 'guia-1-mate'},
        { slug: 'guia-2-mate'},
        { slug: 'guia-3-mate'},
        { slug: 'guia-4-mate'},

    ];
  }
  
  export const dynamicParams = false;