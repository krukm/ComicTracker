import dynamic from 'next/dynamic'

// This allows the client to hydrate with differing render than the server component.
const SearchBar = dynamic(() => import('../components/Textbox/Search'), {
  ssr: false,
})

export default async function Home() {
  return (
    <main>
      <SearchBar />
    </main>
  )
}
