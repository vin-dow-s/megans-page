import {
    EB_Garamond,
    Great_Vibes,
    Jost,
    Playfair_Display,
} from 'next/font/google'

export const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-playfair',
    display: 'swap',
})

export const ebGaramond = EB_Garamond({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-garamond',
    display: 'swap',
})

export const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-jost',
    display: 'swap',
})

export const greatVibes = Great_Vibes({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-great-vibes',
    display: 'swap',
})
