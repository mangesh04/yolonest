import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import Stays from '../components/Stays'

export default function Home({ scrollTo }) {
  return (
    <>
      <div className="flex min-h-[calc(100svh-5rem)] flex-col">
        <Hero scrollTo={scrollTo} />
        {/* <TrustStrip /> */}
      </div>
      <Stays />
    </>
  )
}