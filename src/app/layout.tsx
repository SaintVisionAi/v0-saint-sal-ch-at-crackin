import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaintVision AI Agent - Image Generation & AI Chat',
  description: 'Powerful AI agent with image generation, chat, and business automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Apollo Tracking Script */}
        <Script
          id="apollo-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n=Math.random().toString(36).substring(7),
                o=document.createElement("script");
                o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,
                o.async=!0,o.defer=!0,
                o.onload=function(){window.trackingFunctions.onLoad({appId:"67f847b15d4e8f0011b44c34"})},
                document.head.appendChild(o)
              }
              initApollo();
            `,
          }}
        />

        {/* GHL Tracking Script */}
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_536af3445cba47f7bccd6946e71526bc"
          strategy="afterInteractive"
        />

        {/* Google Tag Manager - Add your GTM ID here */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  )
}
