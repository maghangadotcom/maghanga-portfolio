const offers = [
  {
    slug: 'reliable-accessible-shopify-ajax-cart',
    title: 'Build a Shopify cart drawer customers can rely on',
    description: 'A practical brief for a reliable, accessible Shopify cart drawer, from line-item updates and error recovery to keyboard and mobile QA.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      'A cart drawer is useful when it helps someone confirm an item, adjust their order and continue shopping. It becomes expensive friction when the displayed quantity differs from the order, a subscription loses its plan, or the close button is unreachable on a small phone. Start with the transaction and recovery states before choosing an animation.',
      'This guide is an implementation brief for a merchant and developer. It is not a drop-in theme component. The right solution depends on the theme, installed apps, markets and purchase options. A small, dependable cart page may be a better choice than a complex drawer your team cannot maintain.',
    ],
    sections: [
      {
        id: 'choose-the-surface',
        title: 'First choose the correct cart surface',
        paragraphs: [
          'Shopify’s Ajax API is for Shopify-hosted themes. A separate headless storefront uses the Storefront API cart instead. These are different integration paths; a copied theme endpoint is not a headless cart architecture. Confirm which storefront owns the session before estimating the work.',
          'Write the essential journeys in plain language: add the selected variant, show exactly what was added, change the quantity, remove the intended line and proceed to checkout. Include subscriptions, personalization, bundles or gift properties only when the store actually offers them. Every extra purchase option adds states that must survive an update.',
          'Keep the ordinary cart URL available as a recovery route. If a drawer fails to render, the customer should have a clear way to inspect their order. This fallback also gives support a stable destination to share instead of instructions for opening a particular overlay.',
        ],
      },
      {
        id: 'contract',
        title: 'Define what a successful update means',
        paragraphs: [
          'The server response should determine the accepted cart state. Treat the requested quantity as a request, not a guarantee: stock or purchase rules may prevent it. During a pending update, explain that the cart is updating and stop repeated clicks from creating conflicting requests.',
          'Shopify recommends targeting the current line-item key when the same variant can appear on multiple lines. A key can change as line characteristics change, so refresh it from the returned state. Use locale-aware request paths. Bundled section rendering can update the drawer and related theme sections together; a section can still return null after a successful cart change, and that needs a separate recovery path.',
          'Ask the developer to document which component owns updates. Two cart apps listening to the same event can create duplicate additions or stale totals. Do not solve that by hiding the visible symptom while both integrations continue running.',
        ],
        steps: [
          'Record the selected variant and purchase option before sending an add request.',
          'Show pending feedback and make accidental repeat actions harmless.',
          'Read the accepted response, refresh affected content and announce the useful result.',
          'If a request fails, preserve the previous confirmed cart and offer a specific retry or cart-page link.',
        ],
      },
      {
        id: 'interaction',
        title: 'Make the drawer usable without a mouse',
        paragraphs: [
          'If the drawer is modal, implement it as a coherent dialog. Give it an accessible name, move focus inside when it opens, keep keyboard focus inside while active, support Escape and restore focus when it closes. The W3C dialog pattern is a useful reference. Adding a dialog role alone does not supply those behaviours.',
          'Quantity controls need names that identify the affected product. “Decrease quantity of Travel Mug” is clearer than an unlabelled minus symbol. After removal, place focus somewhere useful rather than leaving it on a deleted element. A concise status announcement can confirm the change without rereading the entire cart.',
          'On mobile, test the longest real product title and the smallest supported screen. The footer must remain reachable when browser controls or an on-screen keyboard reduce the available height. Avoid an upsell block so large that customers cannot find their own order or the checkout action.',
        ],
      },
      {
        id: 'qa',
        title: 'Use a cart acceptance checklist',
        paragraphs: [
          'A screenshot proves layout, not transaction correctness. Review the drawer against the final checkout line items, using a development store or agreed test-order process. Keep a short recording of the most failure-prone journey so future theme changes can be compared with it.',
          'Before release, name an owner for monitoring failed additions and support reports. A technically successful request does not establish that the customer understood what happened. Combine error evidence with a small usability review and investigate repeated confusion.',
        ],
        checklist: [
          'Add, increase, decrease and remove each supported purchase type; verify the order contents at checkout.',
          'Test two lines containing the same variant with different properties or plans.',
          'Throttle the connection, click quickly and force an error; confirm quantities and totals stay coherent.',
          'Open, traverse and close using only a keyboard; verify focus after a line is removed.',
          'Test narrow mobile screens, long translations, empty carts and a cart containing many items.',
          'Verify the normal cart link, checkout link and recovery message with the installed app stack.',
        ],
      },
    ],
    takeaway: 'A useful cart drawer keeps the accepted order, the displayed order and the customer’s understanding aligned. Reliability is the feature to protect when adding merchandising.',
    related: ['shopify-subscription-selector', 'cart-upsell-test-plan', 'accurate-free-shipping-progress'],
    sources: [
      { label: 'Shopify: Ajax API scope', url: 'https://shopify.dev/docs/api/ajax' },
      { label: 'Shopify: Cart API reference and bundled section rendering', url: 'https://shopify.dev/docs/api/ajax/reference/cart' },
      { label: 'Shopify: Manage a headless cart', url: 'https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage' },
      { label: 'W3C: Modal dialog interaction pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' },
    ],
  },
  {
    slug: 'shopify-subscription-selector',
    title: 'Design a subscription selector that makes the commitment clear',
    description: 'Explain one-time and recurring purchases clearly, keep selling plans consistent with variants, and test the full subscription buying journey.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      'A subscription selector should answer a straightforward question: what am I agreeing to buy now, and what will happen later? A large discount badge cannot answer that on its own. The interface needs to explain price, billing, delivery and how the customer manages the arrangement.',
      'Use a custom selector when an existing app’s presentation does not fit the product or leaves important decisions unclear. Keep the established subscription platform responsible for the contract. A new visual component is not a reason to rebuild recurring billing, customer management and all the operational work around them.',
    ],
    sections: [
      {
        id: 'offer',
        title: 'Write the offer before designing the cards',
        paragraphs: [
          'Prepare a small offer table with the one-time amount, recurring amount, delivery interval, billing interval, introductory offer and subsequent price. Have someone from customer support review it. If the team cannot describe the offer consistently, shoppers are unlikely to infer it from two radio buttons.',
          'Pay-per-delivery and prepaid subscriptions are different arrangements. Shopify selling plans describe purchasing policies; they are not simply a percentage off the displayed price. Use the actual plan data and agreed offer terms instead of calculating an attractive-looking amount independently in the browser.',
          'For an optionally recurring product, this portfolio’s demonstration uses one-time purchase as the initial choice and asks the shopper to opt into renewal. That is a design recommendation for clear consent, not a claim about a universal Shopify default. Subscription-only products need an explicit explanation that a one-time option is unavailable.',
          'Place the important terms next to the choice. “Every four weeks” should be connected to the amount charged and the quantity delivered. Explain any conditions behind “cancel anytime”; do not imply that cancellation reverses an order that has already been processed.',
        ],
      },
      {
        id: 'states',
        title: 'Keep the selected variant and plan together',
        paragraphs: [
          'Map each supported variant to its available selling plans. When a shopper changes size, flavour or pack quantity, the interface must re-evaluate that selection. A plan that belonged to the previous variant must not remain silently attached to the new one.',
          'For a Shopify theme product form, the selected selling plan ID is submitted through the selling_plan field; leave it empty for a valid one-time purchase. This describes the integration contract, not complete production code. The implementation also needs to handle availability, changing allocations and the actual cart response.',
          'Show the purchase type again in the cart. A shopper should be able to distinguish the same product bought once from the same product on a plan. Keep frequency, quantity and recurring information understandable rather than displaying an internal plan label that only the app team recognizes.',
          'For headless work, brief the Storefront API integration separately. Do not paste a theme tutorial’s form or Ajax code into a custom storefront and assume it establishes the subscription journey.',
        ],
        steps: [
          'Inventory supported variants, plans and any subscription-only combinations.',
          'Define the initial choice and the exact visible terms for every eligible option.',
          'Specify what happens when a variant change invalidates a plan selection.',
          'Verify the submitted plan, cart summary and checkout commitment as one journey.',
        ],
      },
      {
        id: 'decision',
        title: 'Evaluate informed selection, not just initial sign-ups',
        paragraphs: [
          'A selector can increase subscription share while creating customers who did not understand renewal. Decide which downstream signals would expose that problem before running a test. Early cancellation reasons, refund requests and support conversations may explain an apparent short-term win.',
          'Treat subscription share as a diagnostic measure alongside purchase completion, contribution and later retention. Keep the observation period appropriate to the actual renewal interval. A test ending before the first recurring charge cannot establish the quality of the renewal experience.',
          'For qualitative testing, ask someone to choose an option and explain the next charge in their own words. Avoid leading questions such as “is it clear?” Their explanation reveals whether the layout actually communicated the commitment. Revise the message before adding more persuasive decoration.',
          'Do not build a custom selector if the existing app block already communicates the offer well and the team cannot own ongoing maintenance. Smaller copy and layout changes may solve the problem with less release risk.',
        ],
      },
      {
        id: 'qa',
        title: 'Check the commitment all the way through',
        paragraphs: [
          'Coordinate testing with the subscription provider and use its supported test process. Inspect what the order and customer portal show, not just the product page. Keep screenshots of the offer and terms with the release record so future pricing changes can be checked against them.',
        ],
        checklist: [
          'Switch from subscription to one-time and confirm no plan remains on the submitted item.',
          'Change every variant and interval; verify price, availability and selected plan remain consistent.',
          'Check introductory pricing and later charges separately, including prepaid arrangements if offered.',
          'Confirm the cart, checkout, order confirmation and customer-management route explain the same arrangement.',
          'Test keyboard selection, screen-reader labels, long terms and mobile wrapping.',
          'Verify analytics distinguishes an option selection from an accepted cart addition or completed subscription order.',
        ],
      },
    ],
    takeaway: 'The best subscription selector helps a shopper choose the right arrangement knowingly. Accurate plan state and clear renewal terms matter more than a louder savings badge.',
    related: ['reliable-accessible-shopify-ajax-cart', 'cart-upsell-test-plan', 'shopify-functions-vs-theme-rules'],
    sources: [
      { label: 'Shopify: Selling plans', url: 'https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans' },
      { label: 'Shopify: Add subscription support to a theme', url: 'https://shopify.dev/docs/storefronts/themes/pricing-payments/subscriptions/add-subscriptions-to-your-theme' },
      { label: 'Shopify: Subscription user experience guidelines', url: 'https://shopify.dev/docs/storefronts/themes/pricing-payments/subscriptions/subscription-ux-guidelines' },
      { label: 'Shopify: Subscription contracts and APIs', url: 'https://shopify.dev/docs/apps/build/purchase-options/subscriptions' },
    ],
  },
  {
    slug: 'cart-upsell-test-plan',
    title: 'Test cart upsells without losing sight of the original purchase',
    description: 'Choose a relevant cart offer, protect checkout usability and judge an upsell using contribution, completion and fulfilment evidence.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      'An upsell earns its place when it improves an order the customer already wants to make. A bigger average order value can conceal fewer completed purchases, a costly shipping change or a second product that gets returned. Treat the offer as a business decision with a small interface attached.',
      'Start with one relevant offer and a clear hypothesis. “A compatible replacement head helps this customer use the product for longer” is more testable than “we should increase AOV.” The objective is an understandable, commercially sensible choice, not an extra screen everyone must pass.',
    ],
    sections: [
      {
        id: 'choose',
        title: 'Choose the relationship, then the recommendation',
        paragraphs: [
          'List why the original product and proposed addition belong together. A consumable refill, a genuinely useful accessory and a larger pack solve different needs. They should not share the same copy or eligibility rules merely because a recommendation app supports them.',
          'For an accessory, explain compatibility and whether it is already included. For a larger pack, state what replaces the original selection and how the total changes. For an additional item, make clear that the customer keeps both. Ambiguous “upgrade” buttons invite order mistakes.',
          'Check the operational relationship too. Products that ship from different locations may complicate the order even when they look natural together. Ask fulfilment about packaging, picking effort, stock volatility and returns before promising convenience in the cart.',
          'Do not add an upsell when the primary purchase still fails basic usability checks, the recommendation is frequently unavailable, or the team cannot explain the commercial trade-off. Fixing the original path is often the more useful development task.',
        ],
      },
      {
        id: 'economics',
        title: 'Write a small commercial model',
        paragraphs: [
          'For each candidate offer, record selling price, product cost, discount, payment costs, likely fulfilment change and shipping subsidy. Use the business’s own finance definitions. The working question is whether the extra contribution from accepted offers outweighs any lost contribution from customers who stop buying.',
          'A fictional example makes the distinction concrete. Suppose an accessory adds 12 units of revenue and 3 units of contribution after its incremental costs. Ten accepted accessories then add 30 units of contribution before any effect on the original order. That result can be erased by losing a small number of higher-contribution primary orders. These are illustrative numbers, not client results.',
          'Consider returns and repeat purchasing separately from the immediate order. A product that helps the customer use the original purchase may create value beyond the first checkout, but a short test cannot prove it. Record that as a follow-up question instead of adding an assumed lifetime-value bonus to the result.',
        ],
      },
      {
        id: 'brief',
        title: 'Keep the implementation deliberately small',
        paragraphs: [
          'Define eligibility in terms the merchant can inspect: which primary products, which market, which purchase type and whether the recommended product is already in the cart. A voluntary subscription on the original item should not silently make an accessory recurring too.',
          'Use a separate, clearly labelled add action. Keep the price visible before acceptance and leave checkout accessible without accepting. After an addition, show what changed and allow normal quantity or removal controls. If the addition fails, preserve the customer’s existing order.',
          'Shopify’s pre-purchase offer tutorial demonstrates a checkout extension route. A theme-cart offer is a different surface with its own integration and testing work. Choose the surface from the buyer’s decision and the store’s eligibility, rather than assuming that an attractive example can be installed everywhere.',
        ],
        steps: [
          'Write the customer need, recommendation and commercial assumption in a one-page brief.',
          'Set exact eligibility and suppression rules, including stock and items already present.',
          'Build one acceptance action and one uncomplicated path to continue without it.',
          'Agree a primary outcome and guardrails before exposing the treatment.',
        ],
      },
      {
        id: 'measure',
        title: 'Separate exposure, acceptance and completed orders',
        paragraphs: [
          'An offer being rendered, a customer clicking it and an item reaching a completed order are different events. Instrument each only where it answers a decision. Avoid firing another exposure every time a drawer rerenders, because that can make the acceptance rate meaningless.',
          'For a properly designed experiment, compare outcomes using the planned assignment and eligible population. Do not compare customers who accepted with those who declined and call the difference an upsell lift; those groups made different choices. For stores without enough traffic for a useful experiment, document a staged usability and operational review and avoid causal claims.',
          'Review checkout completion, contribution per eligible visitor or session using your agreed unit, offer acceptance, cart errors and support feedback. Keep fulfilment and returns evidence alongside the early result. The decision may be to narrow the eligible products rather than to keep or remove every upsell.',
        ],
        checklist: [
          'Confirm compatibility, price and one-time or recurring status before acceptance.',
          'Test unavailable stock, rapid clicks, failed additions and removing the offered item.',
          'Verify checkout remains visible and keyboard accessible without accepting.',
          'Check that an already-present item is not added again unintentionally.',
          'Inspect assignment and event deduplication before interpreting any test report.',
          'Reconcile completed-order economics with shipping, fulfilment and returns observations.',
        ],
      },
    ],
    takeaway: 'A cart offer is successful only in the context of the whole purchase. Start with relevance, protect completion and evaluate contribution rather than celebrating a higher basket alone.',
    related: ['reliable-accessible-shopify-ajax-cart', 'accurate-free-shipping-progress', 'checkout-customization-eligibility'],
    sources: [
      { label: 'Shopify: Pre-purchase product offer extension tutorial', url: 'https://shopify.dev/docs/apps/build/checkout/product-offers/build-a-pre-purchase-offer' },
      { label: 'Shopify: Shipping strategy and shipping costs', url: 'https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/shipping-strategy' },
      { label: 'Shopify: Checkout extension surfaces', url: 'https://shopify.dev/docs/api/checkout-extensions' },
    ],
  },
  {
    slug: 'accurate-free-shipping-progress',
    title: 'Make a free-shipping progress message match checkout',
    description: 'Audit free-shipping thresholds, discounts, markets and shipping profiles before adding a progress bar to a Shopify cart.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      '“You have unlocked free shipping” is a promise. If checkout later charges for delivery, the cart has created uncertainty at the moment it was meant to remove it. A progress bar should explain an actual shipping policy, not approximate one with a hardcoded number.',
      'The first task is to identify how the store grants free shipping. A price-based rate, an automatic shipping discount and a shipping discount code are different mechanisms. Record the real configuration and supported destinations before choosing the progress calculation or writing a success message.',
    ],
    sections: [
      {
        id: 'audit',
        title: 'Audit the rule behind the message',
        paragraphs: [
          'Make a policy sheet for each supported destination or market. Include the shipping profile, qualifying rate or discount, minimum spend, excluded products, customer restrictions, rate caps and whether a code is required. Have the person who manages shipping approve this sheet, because a theme setting cannot explain a policy it does not know.',
          'Shopify’s current free-shipping-discount guidance counts eligible product value after combinable product discounts and excludes taxes from the minimum. Its shipping-rate troubleshooting guidance also describes price-based rates using cart value after discounts and before tax. Verify the specific mechanism on the store rather than applying one guessed formula to every promotion.',
          'Separate eligibility from availability. A basket can reach a spend threshold while the customer’s destination has no qualifying rate. If the address is unknown, a conditional message such as “Free standard shipping on eligible orders to the UK above £60” is more accurate than a universal success claim. The amount and location here are an example, not a recommended threshold.',
          'If several fulfilment profiles or unusual product restrictions make the result hard to predict, consider a simple policy link instead of a progress meter. A less assertive message is preferable to a confident but incorrect calculation.',
        ],
      },
      {
        id: 'currency',
        title: 'Treat market and currency as part of the rule',
        paragraphs: [
          'Do not divide a displayed foreign-currency subtotal by a threshold stored in the shop’s default currency. Those amounts are not comparable. Document where each amount originates and what currency it uses. Formatting a number with a currency symbol does not convert it.',
          'Shopify distinguishes localized shipping rates from a free-shipping discount whose shop-currency minimum is converted at checkout. That distinction matters when a merchant advertises a stable local threshold. Review the actual market configuration instead of copying a current exchange rate into theme JavaScript.',
          'Test a currency or market change while the cart already contains products. The displayed remaining spend must update with the current policy and amounts, or the message should step back to a conditional explanation. Do not keep a green success state from the previous market.',
          'Give the merchant a maintainable configuration path. If a developer must edit a number in three files whenever shipping changes, the display will eventually drift. Keep ownership clear and include the cart message in the team’s promotion and shipping-change checklist.',
        ],
      },
      {
        id: 'states',
        title: 'Design the less cheerful states too',
        paragraphs: [
          'Define the empty-cart state, the remaining-spend state, a conditional eligibility state and the confirmed qualifying state. A discount can move a cart back below the threshold. Removing an item or changing its quantity must also reverse the message when appropriate.',
          'Keep the wording proportionate to the information available. “Add £8 more for free UK standard shipping” communicates a different level of certainty from “Delivery options are confirmed at checkout.” If the interface cannot evaluate the destination or exclusions, show the limitation next to the message rather than behind an unrelated tooltip.',
          'The bar itself is supplementary. Include understandable text, avoid relying on colour alone and keep the animation optional for reduced-motion preferences. An announcement after every small cart rerender can become noisy, so announce useful state changes rather than continually narrating progress.',
        ],
        steps: [
          'Identify the shipping mechanism and write the supported eligibility rules.',
          'Map each input amount to its source, currency and discount treatment.',
          'Choose honest wording for known and unknown destination states.',
          'Test the message beside the actual delivery options using representative addresses.',
        ],
      },
      {
        id: 'qa',
        title: 'Build a threshold test matrix',
        paragraphs: [
          'For each meaningful rule, test a basket just below, exactly at and just above the threshold. Save the basket contents, discount and destination with the expected result. This produces a reusable regression checklist instead of a one-off visual sign-off.',
          'A progress bar is also a merchandising change. If you test it, inspect whether customers reach checkout and complete orders, and consider the shipping subsidy and extra product margin. A larger basket is not automatically a more profitable purchase.',
        ],
        checklist: [
          'Compare threshold boundaries against checkout for every advertised market.',
          'Apply combinable discounts, remove them and verify the message reverses correctly.',
          'Test mixed shipping profiles, restricted products and subscription items where supported.',
          'Switch market or currency without emptying the cart.',
          'Verify destination exclusions and code requirements appear in the copy.',
          'Check empty carts, failed updates, keyboard use and reduced motion.',
        ],
      },
    ],
    takeaway: 'The progress bar should be a readable view of the store’s shipping policy. Model the policy and its uncertainty before presenting a precise remaining-spend amount.',
    related: ['cart-upsell-test-plan', 'reliable-accessible-shopify-ajax-cart', 'shopify-functions-vs-theme-rules'],
    sources: [
      { label: 'Shopify: Free-shipping discount requirements', url: 'https://help.shopify.com/en/manual/discounts/discount-types/free-shipping' },
      { label: 'Shopify: Troubleshoot shipping rates', url: 'https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/troubleshooting' },
      { label: 'Shopify: Shipping rates in local currencies', url: 'https://help.shopify.com/en/manual/international/shipping/set-shipping-rates-in-local-currencies' },
      { label: 'Shopify: Discounts across Markets', url: 'https://help.shopify.com/en/manual/markets/discounts-and-gift-cards' },
    ],
  },
  {
    slug: 'checkout-customization-eligibility',
    title: 'Check what your Shopify plan allows before redesigning checkout',
    description: 'Map a checkout request to the right Shopify extension, confirm plan and API eligibility, and scope a testable merchant brief.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      '“Customize checkout” can mean adding a message, changing a discount rule, styling supported controls or collecting information after purchase. Those requests live on different Shopify surfaces. An accurate brief starts by naming the buyer’s problem and the exact place where it needs to be solved.',
      'This is a scoping guide, not a promise that every store can install every extension. The eligibility notes below were reviewed against the linked Shopify documentation for this article. Plan requirements, individual APIs and supported targets should be checked again when the project is commissioned.',
    ],
    sections: [
      {
        id: 'surface',
        title: 'Separate the screen from the rule',
        paragraphs: [
          'A checkout UI extension adds supported interface content at a defined target. A Shopify Function customizes supported backend logic. A theme customization changes the storefront before checkout. These are related tools, but a message on a product page cannot enforce a checkout rule, and a Function does not automatically provide the merchant-facing interface to configure that rule.',
          'Write the request as a buyer task. For example: “Customers need to understand that this item ships separately before they pay.” Then ask what information is required, where that information is available and where the customer can still act on it. The answer may be better product-page and cart communication rather than a checkout block.',
          'Another request might be “prevent an unsupported combination from being purchased.” That is an enforcement problem. Hiding an option with browser JavaScript only changes one route through the store. The developer needs to investigate the appropriate supported rule or validation surface.',
          'Avoid estimates based on old checkout.liquid tutorials. Begin with the currently supported checkout architecture and a defined API version. A historical code example is useful context for a migration discussion, not a suitable starting point for a new implementation.',
        ],
      },
      {
        id: 'eligibility',
        title: 'Verify eligibility for the specific feature',
        paragraphs: [
          'Shopify documents that UI extensions on the information, shipping and payment steps require Shopify Plus. Thank you and Order status extensions have different availability; the current overview lists them for plans other than Starter. Do not infer one surface’s eligibility from another surface’s screenshot.',
          'Functions need a separate check. Stores on any plan can use public App Store apps containing Functions, subject to the particular capability. Custom apps containing Function APIs require Shopify Plus, and some Function capabilities have additional Plus restrictions. “Functions are available” is therefore too broad for a bespoke project estimate.',
          'Confirm the installed app, distribution approach, required target and API constraints together. A merchant may be able to solve the problem using an existing public app even when a custom Function app is unavailable. Compare that option with the ongoing ownership cost of a bespoke integration.',
          'Ask for a short discovery deliverable: a proposed surface, documented eligibility, data requirements, limitations, test plan and rollback approach. This gives the merchant something concrete to approve before a full build starts.',
        ],
        steps: [
          'Name the exact checkout step or post-purchase surface.',
          'Classify the request as presentation, business logic, measurement or a combination.',
          'Check the store plan and the selected target or Function API documentation.',
          'Compare an existing supported app with a custom implementation and document the trade-off.',
        ],
      },
      {
        id: 'failure',
        title: 'Decide what should happen when the extension is unavailable',
        paragraphs: [
          'An optional reassurance message and a required business constraint deserve different failure handling. Customers should normally be able to buy when optional content cannot load. A rule that must be enforced needs a supported enforcement mechanism, not a fragile assumption that an interface block will always stop the buyer.',
          'Shopify’s January 2026 changelog recommends Cart and Checkout Validation Functions for custom validation rather than relying on UI extensions. Use that as a prompt to review architecture, while checking the particular validation capability and store eligibility before committing to it.',
          'For any extension, minimize the information it needs and explain why external systems are involved. A small checkout feature should not become dependent on an unrelated slow service without a deliberate decision about timeout behaviour and customer recovery.',
          'Show the merchant the unconfigured state as well as the ideal preview. An app may be installed while its block is not placed where expected. Include configuration instructions and ownership in the handoff so a future checkout-editor change does not silently remove an important message.',
        ],
      },
      {
        id: 'qa',
        title: 'Accept the change using complete journeys',
        paragraphs: [
          'Use representative products, markets and customer states in a development environment. A component test is useful, but it does not establish that a block is configured correctly in the merchant’s checkout. Keep evidence of both logic tests and the actual supported journey.',
          'Explain what has been validated and what remains a release prerequisite. A portfolio simulation can demonstrate interaction choices; it cannot establish that a Plus integration has been deployed or that a store is eligible.',
        ],
        checklist: [
          'Verify the target, plan, API version and app distribution route in the implementation brief.',
          'Test guest and returning-customer journeys where supported.',
          'Review normal checkout, accelerated paths and relevant markets for the chosen feature.',
          'Force missing data and service failures; confirm the agreed fallback behaviour.',
          'Verify merchant configuration, translations, keyboard use and narrow-screen layout.',
          'Record activation and rollback steps before production release.',
        ],
      },
    ],
    takeaway: 'A good checkout brief identifies the surface, the business rule and the store’s eligibility separately. That makes the estimate credible and the finished feature easier to maintain.',
    related: ['shopify-functions-vs-theme-rules', 'cart-upsell-test-plan', 'shopify-subscription-selector'],
    sources: [
      { label: 'Shopify: Checkout UI extensions and Plus eligibility', url: 'https://shopify.dev/docs/api/checkout-ui-extensions/latest' },
      { label: 'Shopify: Checkout extension surfaces and plan availability', url: 'https://shopify.dev/docs/api/checkout-extensions' },
      { label: 'Shopify: Functions availability', url: 'https://shopify.dev/docs/apps/build/functions' },
      { label: 'Shopify: Checkout validation and non-blocking UI extensions', url: 'https://shopify.dev/changelog/posts/checkout-ui-extensions-now-default-to-non-blocking-behavior' },
    ],
  },
  {
    slug: 'shopify-functions-vs-theme-rules',
    title: 'Know when a Shopify rule needs a Function instead of theme code',
    description: 'Separate storefront explanations from enforced Shopify rules, scope a Function responsibly and test the compiled implementation before release.',
    pillar: 'offers',
    readingMinutes: 6,
    date: '2026-10-28',
    intro: [
      'A theme can display “Buy three to qualify” and make the cart easier to understand. That does not mean the theme controls whether a discount is applied. The displayed explanation and the enforced business rule have different responsibilities, and both need to agree.',
      'Shopify Functions run supported custom backend logic. They are useful when the business needs a rule that native configuration or an appropriate existing app cannot express. They are not an automatic requirement for every bundle, shipping message or merchandising idea. Start by checking the simplest supported solution.',
    ],
    sections: [
      {
        id: 'responsibility',
        title: 'Give presentation and enforcement different jobs',
        paragraphs: [
          'Presentation answers the customer’s questions: which products qualify, how much is saved and what action remains? Enforcement determines the accepted result in a supported commerce flow. A client-side badge or disabled button can be bypassed through another buying route; it should not be the sole control for a rule the business depends on.',
          'For a simple discount, first inspect Shopify’s native discount configuration. For a requirement already served well by a maintained public app, compare its documented capabilities and operating cost with a custom build. Custom code creates a testing, release and support obligation even when its first version is short.',
          'If a Function is justified, select the API that matches the decision. Discount logic, cart transformations and cart-and-checkout validation are separate capabilities with different contracts and limitations. Do not treat a Function as an unrestricted hook that can change any part of checkout.',
          'Also check eligibility before architecture is promised. Custom apps containing Function APIs require Shopify Plus; public App Store apps can have broader availability, while individual capabilities can carry their own restrictions. A good technical proposal names the actual API and distribution route.',
        ],
      },
      {
        id: 'policy',
        title: 'Turn a promotion idea into a policy table',
        paragraphs: [
          'Write examples before implementation. For a fictional “three eligible items” promotion, specify whether three units of one variant qualify, whether subscriptions count, whether a gift card counts and what happens when another discount is present. The examples reveal disagreements faster than an abstract requirement such as “support stacking.”',
          'For every row, record the input, expected outcome and explanation the customer should see. Include a row where nothing applies. Returning no change is a valid result and should not appear to the buyer as a broken calculation.',
          'Decide which configuration a merchant can change and where it lives. Keep the accepted data shape small and validate it. A misspelled product identifier or a missing threshold should produce the agreed safe result rather than a surprisingly generous promotion.',
          'Separate launch criteria from aspirations. “Matches these twelve approved examples on the selected API version” is reviewable. “Works for all future promotions” is not. A clear boundary helps the merchant understand what an additional offer will cost to implement and test.',
        ],
        steps: [
          'Check native settings and maintained app options before commissioning custom logic.',
          'Choose the Function API and confirm its current eligibility and limitations.',
          'Agree positive, negative, boundary and combination examples in a policy table.',
          'Define configuration ownership and the safe result for invalid or missing data.',
        ],
      },
      {
        id: 'testing',
        title: 'Test the compiled Function as well as the logic',
        paragraphs: [
          'Shopify recommends both unit tests and WebAssembly integration tests. Unit tests help check the decision logic, but they do not run in the same compiled runtime. A passing unit suite alone is insufficient evidence that the deployed binary produces the expected output.',
          'Build fixtures from representative input shapes and approved policy examples. Include empty carts, just-below and exact thresholds, mixed eligibility, decimal or currency considerations appropriate to the API and missing optional information. Keep the expected result with the fixture so a future change has to explain why the policy changed.',
          'Then validate the installed and activated behaviour in a development store. The correct binary can still be connected to the wrong configuration, or the storefront can describe yesterday’s offer. Inspect the accepted discount or validation result alongside the customer-facing explanation.',
          'Avoid using a Function test as evidence for a revenue claim. These tests establish software behaviour for the tested scenarios. Whether the offer helps the business is a separate research or experimentation question with its own data and observation period.',
        ],
      },
      {
        id: 'handoff',
        title: 'Make the merchant handoff operational',
        paragraphs: [
          'The handoff should explain how the rule is activated, which fields a merchant can edit, what each value means and how to stop the promotion. Include one ordinary example and one exclusion example. A merchant should not need to read source code to understand an active commercial commitment.',
          'Agree a rollback procedure that addresses both logic and copy. Disabling an offer while leaving “free gift included” on the product page is an incomplete rollback. Keep promotional messaging, automatic rules and scheduled campaign changes in the same release checklist.',
          'Review the configuration after relevant catalogue or app changes. Renaming a collection, changing product eligibility or introducing another discount can alter the real policy even when the Function source has not changed. Named ownership prevents that maintenance from falling between development and marketing.',
        ],
        checklist: [
          'Confirm the native-settings comparison, chosen API, plan and distribution requirements.',
          'Run positive, negative, boundary and discount-combination fixtures.',
          'Test the compiled WebAssembly output as well as unit logic.',
          'Validate installation, configuration and activation in a development store.',
          'Compare product-page, cart and checkout explanations with the accepted rule.',
          'Document merchant edits, monitoring responsibility and rollback instructions.',
        ],
      },
    ],
    takeaway: 'Use theme code to explain the offer and the right supported backend mechanism to apply it. A Function is complete when its policy, compiled behaviour and merchant controls have all been checked.',
    related: ['checkout-customization-eligibility', 'accurate-free-shipping-progress', 'cart-upsell-test-plan'],
    sources: [
      { label: 'Shopify: Functions and availability', url: 'https://shopify.dev/docs/apps/build/functions' },
      { label: 'Shopify: Function API capabilities', url: 'https://shopify.dev/docs/api/functions/latest' },
      { label: 'Shopify: Test and debug Functions', url: 'https://shopify.dev/docs/apps/build/functions/test-debug-functions' },
      { label: 'Shopify: Cart and Checkout Validation API', url: 'https://shopify.dev/docs/api/functions/latest/cart-and-checkout-validation' },
    ],
  },
];

export default offers;
