import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

interface Variant {
  id: string
  storage: string
  price: string
  priceNumeric: number
  features: string[]
  highlight?: boolean
}

const variants: Variant[] = [
  {
    id: 'base',
    storage: '256GB',
    price: '₹39,999',
    priceNumeric: 39999,
    features: [
      '12GB RAM',
      '256GB UFS 4.0 Storage',
      'All standard features'
    ]
  },
  {
    id: 'pro',
    storage: '512GB',
    price: '₹44,999',
    priceNumeric: 44999,
    features: [
      '12GB RAM',
      '512GB UFS 4.0 Storage',
      'All standard features',
      'Premium packaging'
    ],
    highlight: true
  }
]

function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.pricing-header',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          }
        }
      )

      // Variant cards animation
      variants.forEach((variant, index) => {
        const delay = index * 0.1

        gsap.fromTo(`.variant-${variant.id}`,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: `.variant-${variant.id}`,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-black py-24 px-6 lg:px-20"
    >
      {/* Header */}
      <div className="pricing-header text-center mb-20 opacity-0">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] text-white/60 uppercase tracking-[0.15em]">
            PRICING
          </span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight text-white">
          From ₹39,999
        </h2>
        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Choose your storage. Everything else stays exceptional.
        </p>
      </div>

      {/* Variant Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className={`variant-${variant.id} opacity-0 relative`}
          >
            <div
              className={`
                rounded-3xl p-8 lg:p-10
                transition-all duration-500
                ${variant.highlight
                  ? 'bg-white text-black border-2 border-white'
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                }
              `}
            >
              {/* Highlight Badge */}
              {variant.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-full">
                    Popular
                  </span>
                </div>
              )}

              {/* Storage Label */}
              <div className="mb-6">
                <span
                  className={`text-sm font-mono uppercase tracking-wider ${
                    variant.highlight ? 'text-black/60' : 'text-white/60'
                  }`}
                >
                  Nothing Phone 3
                </span>
                <h3
                  className={`text-4xl font-bold mt-2 ${
                    variant.highlight ? 'text-black' : 'text-white'
                  }`}
                >
                  {variant.storage}
                </h3>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div
                  className={`text-5xl lg:text-6xl font-bold ${
                    variant.highlight ? 'text-black' : 'text-white'
                  }`}
                >
                  {variant.price}
                </div>
                <p
                  className={`text-sm mt-2 ${
                    variant.highlight ? 'text-black/60' : 'text-white/60'
                  }`}
                >
                  or ₹{Math.round(variant.priceNumeric / 12).toLocaleString()}/month for 12 months
                </p>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-3">
                {variant.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        variant.highlight ? 'text-black' : 'text-white'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        variant.highlight ? 'text-black/80' : 'text-white/80'
                      }`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`
                  w-full py-4 px-6 rounded-full font-semibold text-base
                  transition-all duration-300
                  ${variant.highlight
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-white text-black hover:bg-white/90'
                  }
                `}
                data-hover
              >
                Order Now
              </button>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <a
                  href="#"
                  className={`text-xs ${
                    variant.highlight ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                  } underline transition-colors`}
                >
                  Learn more about financing options
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <p className="text-white/40 text-sm leading-relaxed">
          Free shipping on all orders. 30-day return policy. 2-year warranty included.
        </p>
      </div>
    </section>
  )
}

export default PricingSection
