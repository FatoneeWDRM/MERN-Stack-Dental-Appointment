
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO = ({
    title,
    description,
    keywords = 'clinic, doctor, health, medical, appointment',
    image = '/og-image.jpg', // Default image
    url = 'https://betterbone-clinic.pages.dev', // Replace with actual domain
    type = 'website',
}: SEOProps) => {
    const siteTitle = 'BetterBone Clinic';

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MedicalClinic",
                    "name": siteTitle,
                    "url": url,
                    "logo": `${url}/logo.png`, // Update if you have a logo
                    "image": image,
                    "description": description,
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Bangkok",
                        "addressCountry": "TH"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+66-123-456-789",
                        "contactType": "customer service"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
