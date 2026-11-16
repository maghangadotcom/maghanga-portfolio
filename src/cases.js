export const cases = [
  {
    "id": "supply",
    "title": "Supply",
    "cover": "supply-product-rebuild",
    "summary": "A complete Shopify rebuild, reusable content sections and upsells that became a meaningful share of annual revenue.",
    "tags": [
      "Online Store 2.0",
      "Custom Liquid",
      "Rebuy"
    ],
    "role": "Shopify Developer & CRO Specialist, 2021–2023. The technical go-to for the team, working across development, research, experimentation and merchandising.",
    "context": "Supply’s older Liquid-template storefront was slow and had low Lighthouse scores. The goal was to rebuild the shopping experience without losing the brand’s established messaging, then give the team a better foundation for ongoing improvements.",
    "built": [
      "Rebuilt the storefront for Online Store 2.0.",
      "Developed native Liquid sections to replace third-party page-builder components.",
      "Built landing pages to support paid traffic.",
      "Implemented Rebuy upsell and cross-sell flows.",
      "Addressed performance issues on product and collection pages and supported storefront experiments."
    ],
    "gallery": [
      {
        "type": "browser",
        "img": "sup-lp-comparison",
        "cap": "Campaign landing page with a product comparison section."
      },
      {
        "type": "browser",
        "img": "sup-progress-rebuycart",
        "cap": "Rebuy cart drawer with a progress bar and product recommendations."
      },
      {
        "type": "phone",
        "img": "sup-checkout-upsell-mobile",
        "cap": "Supply checkout upsell interface on mobile."
      },
      {
        "type": "phone",
        "img": "sup-quiz-lander-mobile",
        "cap": "Mobile landing page introducing the product quiz."
      }
    ],
    "implementation": "The work connected reusable Liquid sections and campaign landing pages to the main Shopify storefront, with Rebuy providing the upsell and cross-sell integration. I worked with growth, media and creative teams on the implementation and supported storefront experiments.",
    "constraint": "Replacing page-builder components with native sections changed the implementation, not the purpose of the pages. The aim was to retain the campaign content while making the theme easier to maintain; no measured speed or conversion improvement is claimed here.",
    "featured": true,
    "headline": "A faster storefront. A more useful growth platform.",
    "metrics": [
      [
        "38%",
        "increase in sitewide conversion"
      ],
      [
        "35%",
        "load-time improvement"
      ],
      [
        "16% → 21%",
        "annual revenue share from upsells"
      ],
      [
        "$1,200/mo",
        "saved after seven apps were removed"
      ]
    ],
    "evidence": "Conversion and load-time improvements are reported against the previous store. Load time was measured in Shopify’s dashboard. Upsells and cross-sells accounted for 16% of annual revenue in year one and 21% in year two after further iterations; this is revenue share, not an absolute revenue-growth claim.",
    "working": "I stayed involved beyond the rebuild: customer research, copywriting, prototyping, technical SEO, landing pages, experiments and third-party integrations. Being the team’s technical go-to meant connecting requests to working storefront changes, rather than handing over a theme and moving on.",
    "flow": [
      "Reusable Liquid sections",
      "Product-specific content",
      "Rebuy recommendations",
      "Ongoing experiments"
    ],
    "chapters": [
      {
        "title": "Rebuild the foundation, preserve the brand",
        "body": "I rebuilt the whole store for Online Store 2.0, updating the homepage and product-page layout while keeping the messaging consistent. Moving from older Liquid templates to sections throughout the storefront made the new design a reusable system rather than a collection of one-off pages.",
        "img": "supply-product-rebuild",
        "cap": "The rebuilt product page brings imagery, variants, purchase action and supporting information together."
      },
      {
        "title": "Make content easier to reuse",
        "body": "I added metafields and metaobjects to the below-the-fold product sections so products could share one template while displaying their own content. I also rebuilt page-builder landing pages as reusable Liquid sections, giving the team components for future campaigns.",
        "img": "sup-lp-comparison",
        "cap": "Campaign content became reusable theme sections instead of separate page-builder implementations."
      },
      {
        "title": "Build value across the customer journey",
        "body": "Using Rebuy, I added popup, embedded product-page, in-cart and checkout offers, with personalization for customer segments. I also brought upsells into customer-account and subscription interfaces to support the existing customer base. Continued iteration increased the share of annual revenue attributed to upsells and cross-sells, with limited discounting.",
        "img": "sup-progress-rebuycart",
        "cap": "Cart recommendations connect relevant add-ons to a purchase already in progress."
      }
    ]
  },
  {
    "id": "fifthray",
    "title": "Fifth Ray",
    "summary": "A subscription-first product experience shaped by customer research, 10+ tests and hands-on Liquid, Skio and Videowise implementation.",
    "tags": [
      "Liquid product form",
      "Skio integration",
      "Experiment implementation"
    ],
    "role": "Shopify CRO Developer, contract, February–August 2026.",
    "context": "The product page needed to explain the offer and support quantity, subscription and one-time purchase decisions within the existing Shopify storefront. My work connected customer research and analytics investigation to the product form, its integrations and the cart.",
    "built": [
      "Rebuilt the product form on its existing Liquid foundation using current Shopify theme conventions, with a focus on fast loading and a clear subscription-first design.",
      "Ran 10+ tests before the final design using Intelligems, including theme, price and shipping tests across layout, offer hierarchy, messaging, subscription preselection and delivery expectations.",
      "Designed, styled and configured the Skio subscription widget, and integrated Videowise for interactive, shoppable videos presented in an Instagram-style stories block.",
      "Replaced a third-party cart app with a native Liquid cart drawer to address paid-social traffic failures in in-app browsers.",
      "Investigated an observed 51% difference between GA4 and Shopify reporting and rebuilt the analytics implementation.",
      "Analysed 849+ customer reviews to create a customer-language bank for product-page content and the test roadmap."
    ],
    "research": "10+ tests · 18%+ relative increase in product-page conversion rate · 16%+ increase in subscriptions on the product page versus previous versions",
    "gallery": [
      {
        "type": "browser",
        "img": "fifthray-product-form-desktop",
        "cap": "Rebuilt Liquid product form with offer hierarchy, quantity selection, shoppable stories and Skio purchase options."
      },
      {
        "type": "phone",
        "img": "fifthray-offers-mobile",
        "cap": "Mobile stories block and quantity offers, with distinct pricing and offer messages."
      },
      {
        "type": "phone",
        "img": "fifthray-skio-mobile",
        "cap": "Custom Skio subscription presentation, one-time purchase option and delivery expectations."
      },
      {
        "type": "phone",
        "img": "fifthray-videowise-mobile",
        "cap": "Videowise shoppable video experience with an embedded product action."
      }
    ],
    "implementation": "The existing Liquid product form was the foundation. I rebuilt its layout and purchase-option experience, designed and configured the Skio subscription widget, and integrated Videowise for interactive, shoppable videos. Intelligems supported theme, pricing and shipping experiments, connecting the implementation to an iterative test programme.",
    "constraint": "The reported improvements compare the product-page experience with previous versions: an 18%+ relative increase in conversion rate and 16%+ increase in subscriptions on the product page. The work covered the Liquid storefront and integrations; Skio and Videowise supplied their respective application services.",
    "featured": true,
    "cover": "fifthray-product-form-desktop",
    "headline": "Make the product decision clearer. Test what matters.",
    "metrics": [
      [
        "18%+",
        "increase in product-page conversion"
      ],
      [
        "16%+",
        "increase in product-page subscriptions"
      ],
      [
        "10+",
        "product-experience tests"
      ]
    ],
    "evidence": "Reported increases compare the product-page experience with previous versions. The test period and subscription-measure definition are not published here; the figures do not imply that every individual change produced a measured lift.",
    "working": "I used customer language and test findings to refine the experience, not just a preferred design. The wider work included reviewing 849+ customer reviews, investigating a GA4/Shopify reporting discrepancy and replacing a third-party cart with a native Liquid drawer to address in-app-browser failures.",
    "flow": [
      "Customer research",
      "Liquid product form",
      "Skio + Videowise",
      "Intelligems tests"
    ],
    "chapters": [
      {
        "title": "Build on the existing product form",
        "body": "I rebuilt the product-form area on its existing Liquid foundation, organizing quantity offers, purchase options and delivery expectations into a clear subscription-first experience. The aim was a fast-loading interface that explained the decision without adding unnecessary complexity.",
        "img": "fifthray-product-form-desktop",
        "cap": "Offer hierarchy, social proof and purchase options are presented as one connected experience."
      },
      {
        "title": "Connect subscriptions and product confidence",
        "body": "I designed, styled and configured the Skio subscription widget. I also integrated Videowise to bring interactive, shoppable videos into the product page. My contribution was the storefront experience and integration; the apps supplied their underlying services.",
        "img": "fifthray-skio-mobile",
        "cap": "The mobile subscription and one-time purchase options, with delivery expectations near the purchase action.",
        "secondImg": "fifthray-videowise-mobile",
        "secondCap": "Videowise opens a shoppable video experience from the stories-style block."
      },
      {
        "title": "Iterate beyond the first design",
        "body": "I ran more than 10 tests using Intelligems, covering theme, price and shipping experiments. The programme explored layout, offer placement, messaging, subscription preselection and delivery expectations before arriving at the final design.",
        "img": "fifthray-offers-mobile",
        "cap": "The mobile offer layout makes quantity and pricing choices visible alongside the video content."
      }
    ]
  },
  {
    "id": "bluatlas",
    "title": "Blu Atlas",
    "summary": "Kingdom to Horizon, with reusable sections, Recharge subscriptions and Rebuy customizations. Validated in a month-long theme test.",
    "tags": [
      "Custom sections",
      "Subscriptions",
      "Cart development"
    ],
    "role": "Shopify development across the theme rebuild, landing pages and subscription experience, with QA and coordination with customer experience and site merchandising.",
    "context": "The work was a complete theme rebuild from Kingdom to Horizon, covering the storefront and its subscription journey. The new experience needed to support brand-specific design without fighting the architecture of the underlying theme.",
    "built": [
      "Rebuilt hero and collection templates, product-page information and trust blocks, and a product comparison section.",
      "Developed a native subscription widget.",
      "Built a custom cart drawer with a free-shipping progress bar, alongside embedded and popup upsell interfaces."
    ],
    "gallery": [
      {
        "type": "browser",
        "img": "blu-hero",
        "cap": "Custom homepage hero section."
      },
      {
        "type": "browser",
        "img": "blu-product-meta",
        "cap": "Product information and trust content on the product page."
      },
      {
        "type": "browser",
        "img": "blu-vs-everyone",
        "cap": "Product comparison section."
      },
      {
        "type": "browser",
        "img": "blu-subscription-widget",
        "cap": "Product subscription selection interface."
      },
      {
        "type": "phone",
        "img": "blu-cart-progress-mobile",
        "cap": "Cart drawer and free-shipping progress display on mobile."
      },
      {
        "type": "phone",
        "img": "blu-popup-upsell-mobile",
        "cap": "Mobile product upsell interface."
      }
    ],
    "implementation": "Product and collection sections handled merchandising content; the subscription interface presented purchase options; and the cart drawer brought shipping progress and upsell interfaces into the buying journey. My contribution was the storefront components and their interactions.",
    "constraint": "The contribution spans the theme and shopping interfaces: product content, purchase-option presentation and cart features. The subscription platform remains a separate integration rather than a custom-built backend.",
    "featured": true,
    "cover": "blu-horizon-product",
    "headline": "A theme migration built around the whole buying journey.",
    "metrics": [
      [
        "14%",
        "conversion increase in theme test"
      ],
      [
        "25%",
        "load-time improvement"
      ],
      [
        "1 month",
        "Optimizely comparison"
      ]
    ],
    "evidence": "The 14% conversion increase was reported from a one-month Optimizely test of the new Horizon theme against Kingdom. The separate 25% load-time improvement was measured in Shopify’s dashboard. The conversion result evaluates the theme experience as a whole, not speed in isolation.",
    "working": "I followed Horizon’s existing architecture when adding custom sections, tested the rebuilt experience and stayed in contact with CX and merchandising about unexpected issues after the update. The work combined learning a new theme foundation with practical implementation and post-release follow-through.",
    "flow": [
      "Horizon theme + sections",
      "Recharge purchase options",
      "Rebuy customizations",
      "Optimizely validation"
    ],
    "chapters": [
      {
        "title": "Rebuild around a maintainable theme system",
        "body": "I migrated the whole theme from Kingdom to Horizon and built custom sections on top of Horizon’s existing architecture. The scope included the homepage, product page, cart, checkout experience and 404 page. Landing pages were rebuilt in Replo, then converted into reusable Liquid sections for future page creation.",
        "img": "blu-horizon-collection",
        "cap": "The rebuilt collection experience within the new theme."
      },
      {
        "title": "Carry subscriptions through the shopping journey",
        "body": "Recharge powered subscriptions. I designed the subscription widget and added subscription upsells in key placements. I connected selling plans to the Rebuy subscription-widget code and used the Rebuy REST API to customize the widget and subscription flows.",
        "img": "blu-horizon-product",
        "cap": "The product page presents subscription frequency and one-time purchase options together."
      },
      {
        "title": "Validate the change, then support the team",
        "body": "I tested the new Horizon experience against Kingdom for a full month in Optimizely, reporting a 14% conversion increase. Alongside the rebuild, I worked on messaging and feature experiments. QA and communication with CX and merchandising helped surface unexpected issues after the theme update.",
        "img": "blu-subscription-benefits",
        "cap": "Subscription benefits are explained within the buying experience."
      }
    ]
  },
  {
    "id": "benevolence",
    "title": "Benevolence LA",
    "summary": "Cart drawer and Rebuy upsell implementation.",
    "tags": [
      "Cart development",
      "Rebuy",
      "Custom Liquid"
    ],
    "role": "I built a custom cart drawer with a Rebuy upsell and cross-sell module.",
    "context": "CRO and storefront development for a meaningful-gifting jewellery brand on Shopify. The cart work brought relevant product recommendations into the buying flow.",
    "built": [
      "Developed a custom Liquid cart drawer.",
      "Implemented a Rebuy-powered upsell and cross-sell module for the brand’s gifting products and bundles."
    ],
    "gallery": [
      {
        "type": "browser",
        "img": "bla-cart-upsell",
        "cap": "Cart drawer with the Rebuy upsell module."
      }
    ],
    "implementation": "The native Liquid cart drawer provided the storefront interface, with Rebuy supplying the recommendation integration. My work brought upsell and cross-sell content into the cart alongside the products already selected.",
    "constraint": "The custom drawer and the recommendation service have different responsibilities. Liquid owns the storefront presentation; Rebuy provides the recommendation integration. The case demonstrates that connected interface rather than a replacement recommendation engine.",
    "featured": false
  },
  {
    "id": "shopdeck",
    "title": "ShopDeck",
    "summary": "Theme architecture, AJAX cart and navigation development.",
    "tags": [
      "Theme architecture",
      "AJAX cart",
      "Navigation"
    ],
    "role": "I worked on theme architecture, cart interactions, navigation and performance investigation.",
    "context": "Storefront engineering focused on a maintainable theme, cart interactions and navigation.",
    "built": [
      "Rebuilt theme architecture and developed a custom mega menu.",
      "Built an AJAX cart with a fetch-based add-to-cart flow.",
      "Profiled storefront performance and investigated Core Web Vitals using browser debugging tools."
    ],
    "gallery": [
      {
        "type": "browser",
        "img": "shopdeck-theme",
        "cap": "ShopDeck theme architecture and development workspace."
      },
      {
        "type": "browser",
        "img": "shopdeck-menu",
        "cap": "Custom mega menu navigation."
      },
      {
        "type": "browser",
        "img": "shopdeck-fetch-cart",
        "cap": "Fetch-based AJAX cart implementation."
      },
      {
        "type": "browser",
        "img": "shopdeck-cart",
        "cap": "Custom cart drawer interface."
      },
      {
        "type": "browser",
        "img": "shopdeck-performance",
        "cap": "Storefront performance inspection."
      },
      {
        "type": "browser",
        "img": "shopdeck-debug",
        "cap": "Browser debugging during storefront development."
      }
    ],
    "implementation": "The theme architecture, navigation and fetch-based add-to-cart flow formed the storefront implementation. Browser debugging and performance profiling supported investigation of the interactions and loading behaviour.",
    "constraint": "The work stays focused on theme architecture, navigation and cart interactions. Performance profiling informed the investigation; the available material does not include a measured before-and-after score.",
    "featured": false
  },
  {
    "id": "technorv",
    "title": "TechnoRV",
    "summary": "Cart promotion display and discount-state updates.",
    "tags": [
      "Cart promotions",
      "Discount display",
      "Custom Liquid"
    ],
    "role": "I worked on the storefront display of promotions and cart discount states.",
    "context": "Storefront development for a specialist RV technology and accessories retailer on Shopify. The work focused on how promotions appeared in the cart.",
    "built": [
      "Developed Liquid presentation for cart promotions and applied discount information.",
      "Updated the displayed discount states as cart contents changed."
    ],
    "gallery": [
      {
        "type": "browser",
        "img": "technorv-cart-discounts",
        "cap": "Cart interface displaying promotions and applied discount states."
      }
    ],
    "implementation": "Liquid displayed promotion and applied-discount information in the cart, with the displayed states updated as the cart contents changed. This work focused on what the shopper sees during cart interactions.",
    "constraint": "The cart should present the applied discount state rather than invent an offer from a display calculation. My scope was that presentation and its updates as the cart changed, separate from the rules that authorize a discount.",
    "featured": false
  }
];

export const selectedCases = cases.filter((study) => study.featured);
