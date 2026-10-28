export default [
  {
    slug: 'diagnose-shopify-core-web-vitals',
    title: 'Which Shopify speed problem should you fix first?',
    description: 'A merchant’s workflow for separating real visitor problems from a single lab score, then commissioning a focused Core Web Vitals fix.',
    pillar: 'quality', readingMinutes: 7, date: '2026-10-28',
    intro: [
      'A disappointing speed score is a starting point for an investigation. It is not yet a brief to rebuild the theme, remove every app or move to a headless storefront. Before spending development time, identify which customer action feels slow and whether the evidence describes the visitors who matter to your store.',
      'This guide is useful when product pages appear late, controls hesitate or the page jumps while someone shops. It is less useful as a way to choose a visual design or predict conversion lift. Performance work needs a repeatable technical baseline and a commercial context; a perfect score does not prove that a product offer is persuasive.',
    ],
    sections: [
      { id: 'read-the-metric', title: 'Translate the metric into a shopping problem', paragraphs: [
        'Google’s Core Web Vitals cover three different experiences. Largest Contentful Paint (LCP) describes when the main visible content appears. Interaction to Next Paint (INP) describes responsiveness to interactions. Cumulative Layout Shift (CLS) describes unexpected movement. Google’s good thresholds are LCP at or below 2.5 seconds, INP at or below 200 milliseconds and CLS at or below 0.1, assessed at the 75th percentile of visits.',
        'Turn each signal into a question for your developer. For LCP: what is the largest visible element on this template and what delays it? For responsiveness: which interactions stall, such as opening variants or adding an item? For movement: which late element pushes the purchase controls away? These questions are more actionable than asking for a higher overall Lighthouse score.',
      ] },
      { id: 'field-and-lab', title: 'Separate real visits from a controlled test', paragraphs: [
        'Field data describes people using the live site with their own devices and connections. Lab data describes a controlled run that is useful for reproducing causes. PageSpeed Insights can show both, and they can disagree. Record which report you are reading, whether it covers this URL or a broader origin, and the reporting window. Missing field data means insufficient reported evidence, not proof that the store is fast.',
        'A standard Lighthouse page-load run does not reproduce every interaction in a shopping session. Ask for an interaction trace when the complaint is a slow cart or selector. Equally, a fast test on a new laptop should not dismiss a reproducible problem on a customer’s older phone. Keep the test conditions attached to the result so later comparisons mean something.',
      ] },
      { id: 'choose-scope', title: 'Choose a representative page and one meaningful journey', paragraphs: [
        'Start with a template that receives valuable traffic, rather than only the homepage. A campaign product page with a subscription selector may behave very differently from a simple collection. Pick one representative URL and record its market, language, selected variant, consent state and acquisition link. Repeat the same journey after each change.',
        'Create a short evidence packet before development begins. Include a screen recording, the affected device and browser, the current theme version, a performance trace when available and a list of recently added apps or sections. Record the date of promotions or content changes. This reduces the chance that a later team member compares two substantially different storefronts.',
      ], steps: [
        'List the three templates with the strongest combination of traffic, business importance and reported friction.',
        'Run repeated baseline tests under consistent conditions and preserve the reports.',
        'Choose one suspected cause that the trace supports; define the smallest reversible change.',
        'Agree the customer behaviour that must remain intact, including variants, discounts and cart updates.',
      ] },
      { id: 'prioritise', title: 'Prioritise evidence-backed fixes', paragraphs: [
        'For a late product image, investigate discovery, requested dimensions and loading priority before changing every asset. For a hesitant selector, inspect main-thread work and the scripts triggered by that interaction. For jumping content, identify the element that changes size rather than hiding the symptom with a fixed height that clips the page.',
        'Removing an app is a product decision as well as a technical decision. Establish who owns its business function, whether an unused integration can be removed and how the replacement will be tested. Avoid shipping several unrelated optimisations together: if something breaks, a narrow change is easier to understand and undo.',
      ] },
      { id: 'verify', title: 'Verify the fix without overstating it', paragraphs: [
        'Use lab tests to check that the intended technical cause improved and that important journeys still work. Then observe live visitor data over an appropriate reporting period, noting other changes and differences in traffic. Do not describe one favourable test as a guaranteed field improvement, a search ranking gain or a measured revenue result.',
        'The handoff should contain the original problem, changed files or settings, before-and-after conditions, remaining limitations and the rollback path. This makes performance work maintainable when the next campaign adds images, video or a new app.',
      ], checklist: [
        'The same URL, market and purchase journey were compared under recorded conditions.',
        'The suspected LCP element, slow interaction or shifting component was identified.',
        'Variant selection, add-to-cart, subscription choices and error states still work.',
        'Mobile checks include a real device where practical, plus repeatable controlled tests.',
        'The report separates lab observations, field evidence and unmeasured business hypotheses.',
      ] },
    ],
    takeaway: 'Commission a fix for an observed shopping problem, with a repeatable baseline and a clear acceptance test. A score is evidence to interpret, not a standalone business outcome.',
    related: ['responsive-shopify-product-images', 'test-shopify-in-app-browsers', 'safe-shopify-theme-release'],
    sources: [
      { label: 'Google: Web Vitals definitions and thresholds', url: 'https://web.dev/articles/vitals' },
      { label: 'Google: why lab and field data differ', url: 'https://web.dev/articles/lab-and-field-data-differences' },
      { label: 'Shopify: theme performance best practices', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance' },
    ],
  },
  {
    slug: 'responsive-shopify-product-images',
    title: 'How to keep product photography sharp without slowing the page',
    description: 'Plan product-image sizes, loading behaviour and mobile crops so customers see useful product detail without unnecessary downloads.',
    pillar: 'quality', readingMinutes: 7, date: '2026-10-28',
    intro: [
      'Product photography answers buying questions: scale, texture, finish, contents and fit. Image optimisation should preserve those answers. Compressing everything until details become muddy can make a page lighter while making the product harder to evaluate. Start by deciding what each photograph needs to communicate and where it will appear.',
      'This workflow suits a Shopify theme with oversized galleries, slow campaign images or inconsistent mobile crops. It is not a reason to replace a working image pipeline with a complicated custom service. First check what the theme and Shopify’s image delivery already provide, then fix the gaps that appear in the actual page.',
    ],
    sections: [
      { id: 'inventory', title: 'Audit the image roles before the files', paragraphs: [
        'Make an inventory by role: first product image, gallery thumbnail, zoom image, collection card, editorial image and mobile campaign hero. Note the visible width, expected crop and whether each image appears immediately or later. A thumbnail and a zoom view should not automatically request the same download simply because they refer to the same original photograph.',
        'Also review the content. A close-up that shows a material clearly may deserve a prominent position; three nearly identical angles may not. Ask the merchandising team which questions the gallery should answer, then keep those answers in a deliberate order. This is a useful moment to remove redundant media rather than only make redundant media smaller.',
      ] },
      { id: 'responsive-delivery', title: 'Give the browser useful size choices', paragraphs: [
        'A responsive image implementation can provide alternative source widths and describe the space the image occupies. The browser can choose an appropriate resource for the display and pixel density. CSS that shrinks an enormous image visually does not, by itself, prove that a smaller file was downloaded. Inspect the requested image in the network panel.',
        'For Shopify Liquid themes, the image_url filter requests a CDN image with explicit dimensions, and image_tag produces an image element with supported image attributes. Review the current filter reference when specifying widths, sizes and loading behaviour. Ask the developer to derive choices from the actual layout instead of copying a generic list of widths into every component.',
      ] },
      { id: 'loading-order', title: 'Prioritise the image customers need first', paragraphs: [
        'The first meaningful product photograph should not be delayed behind lower-page content. Shopify’s image_tag documentation specifically cautions against lazy-loading images above the fold and describes its automatic behaviour for later sections. The important distinction is where the image appears, not whether its filename includes the word hero.',
        'For later gallery media, avoid fetching every full-resolution image before the customer needs it. Check how the gallery behaves when someone quickly switches images or opens zoom. Reserve the correct space so loading does not push the title, price or purchase button around. A gallery must remain usable if a photograph arrives slowly or fails entirely.',
      ] },
      { id: 'crop-and-context', title: 'Treat mobile crops as a content decision', paragraphs: [
        'A desktop lifestyle photograph may place the product near the edge. On a narrow screen, a centre crop can remove it. Review the actual mobile composition with the merchandiser and use a meaningful focal point or a suitable alternate asset where the design requires one. Do not ask CSS to rescue a photograph that cannot communicate its subject at that aspect ratio.',
        'Separate photographic detail from text. Essential benefit copy baked into an image can become unreadable at small widths, is harder to translate and cannot be adjusted like normal page text. Keep key selling information in accessible text, and write useful alternative text for images that communicate information. Avoid repeating the full product description in every gallery image label.',
      ] },
      { id: 'handoff', title: 'Write a practical image acceptance brief', paragraphs: [
        'The brief should define the required visual result and download behaviour together. Specify a representative product with an unusually tall image, a wide image, a transparent image and missing media. Include a long title and a translated layout. Those examples expose assumptions that a perfectly square catalogue image will hide.',
        'Keep original image assets available and document the intended ratio for merchant uploads. If the team can upload only one type of image safely, make that constraint visible in the editing guidance. After release, sample newly added products to ensure everyday content updates still use the same delivery pattern.',
      ], steps: [
        'Identify the first visible image and the largest rendered size for each component.',
        'Have the developer inspect source candidates, the sizes description and the downloaded resource.',
        'Compare sharpness and loading on narrow and wide screens, including high-density displays.',
        'Check later gallery media and zoom independently from the first image.',
      ], checklist: [
        'No horizontal page scrolling is introduced by product or editorial images.',
        'The product remains visible in each important crop and zoom retains useful detail.',
        'The first visible image is not unnecessarily lazy-loaded.',
        'Space is reserved before the image loads and purchase controls do not jump.',
        'A small visible component does not automatically download the largest source.',
        'Informative media has appropriate text alternatives; missing media has a usable fallback.',
      ] },
    ],
    takeaway: 'Optimise the image’s role, requested dimensions and loading order together. Keep the buying information that makes the photograph worth loading.',
    related: ['diagnose-shopify-core-web-vitals', 'test-shopify-in-app-browsers', 'safe-shopify-theme-release'],
    sources: [
      { label: 'Shopify Liquid: image_url', url: 'https://shopify.dev/docs/api/liquid/filters/image_url' },
      { label: 'Shopify Liquid: image_tag and loading behaviour', url: 'https://shopify.dev/docs/api/liquid/filters/image_tag' },
      { label: 'Google: responsive image principles', url: 'https://web.dev/learn/design/responsive-images' },
    ],
  },
  {
    slug: 'accessible-shopify-cart-drawer',
    title: 'What makes a Shopify cart drawer usable with a keyboard?',
    description: 'A practical acceptance brief for cart drawer focus, quantity updates, errors and closing behaviour, with a real keyboard QA sequence.',
    pillar: 'quality', readingMinutes: 7, date: '2026-10-28',
    intro: [
      'A cart drawer can save a customer from leaving the product page, but only if its controls remain understandable and reachable. A panel that looks polished can still strand keyboard users, hide errors or send focus into the page behind it. Accessibility belongs in the interaction brief before animation and upsell placement are approved.',
      'This guide is useful for reviewing a custom drawer or evaluating a cart app. It does not establish complete WCAG conformance and should not replace testing with assistive technology. If the business does not need an overlay, a clear cart page may be a simpler solution. Choose the interaction that your team can build and maintain reliably.',
    ],
    sections: [
      { id: 'choose-pattern', title: 'Decide whether the drawer is actually modal', paragraphs: [
        'A modal drawer temporarily makes the rest of the page unavailable while the cart is open. W3C’s modal dialog pattern describes focus entering the dialog, Tab and Shift+Tab remaining within it, and Escape closing it. A visible panel is not automatically a modal dialog simply because it sits on top of a page.',
        'Ask the developer to define the intended pattern and implement its behaviour consistently. A native dialog element can provide useful browser behaviour when opened modally, but labels, initial focus, updates and cross-browser verification still require attention. Adding aria-modal to a generic container without the corresponding interaction can misrepresent what customers experience.',
      ] },
      { id: 'opening-and-closing', title: 'Specify the beginning and end of the interaction', paragraphs: [
        'Write down what happens after a successful add-to-cart action and what happens when the cart icon is opened without adding anything. Focus should move to a sensible location inside the drawer. For a long cart, immediately focusing a low checkout button can skip the summary the customer needs to review. The starting point should make the changed context understandable.',
        'Provide a clearly named close button, rather than relying on clicking a backdrop or swiping. When the drawer closes, return focus to the control that opened it when that control still exists. If a full product form was replaced, choose a logical fallback. Test this flow with the keyboard instead of assuming a click test covers it.',
      ] },
      { id: 'updates', title: 'Make cart changes understandable', paragraphs: [
        'Quantity buttons need meaningful names that identify their purpose and, where necessary, the associated item. Two products named similarly should still be distinguishable by variant or selling plan. Price changes, a removed item and a failed update must be understandable without relying on a brief colour flash.',
        'Plan what happens during an asynchronous update. Prevent accidental repeated submissions where appropriate, preserve the customer’s context, and show a useful status or error. If a line is removed, decide where focus should go next. Avoid rebuilding the whole drawer in a way that repeatedly drops focus to the page body.',
      ] },
      { id: 'content', title: 'Keep purchase information ahead of decoration', paragraphs: [
        'The drawer needs to answer what is in the order, how many units, the relevant price and what happens next. Subscription frequency and recurring terms should remain visible when the item is a subscription. Shipping and tax language must accurately describe what has and has not been calculated. An upsell should never obscure the order summary or the close control.',
        'Review the longest realistic states. A cart with several products, translated text, a discount message and a stock error is a better layout test than a single short product title. Ensure the summary and buttons remain reachable when the viewport height changes or the customer increases text size.',
      ] },
      { id: 'qa-sequence', title: 'Run a complete keyboard journey', paragraphs: [
        'Start with the mouse out of reach. Reach the product controls with Tab, make a purchase choice, add the item, inspect the drawer and close it. Repeat by opening an empty cart, then with multiple items and an unavailable quantity. Record the focus location at each step and whether the visible focus indicator can be seen.',
        'Automated checks can find some missing labels and structural problems, but they cannot establish that the entire journey makes sense. Add a screen-reader check on representative browser combinations and record the actual combinations tested. A passing scan should be reported as one part of the evidence, not a certificate of complete accessibility.',
      ], checklist: [
        'The opener is a reachable, clearly named control with a visible focus indicator.',
        'Opening the drawer announces or exposes its purpose and puts focus inside it.',
        'A modal drawer keeps keyboard focus inside until it closes.',
        'Close and Escape work, and focus returns to an appropriate control.',
        'Quantity changes, removal and failed requests preserve a sensible focus location.',
        'Errors, totals and subscription terms remain available without colour-only cues.',
        'Long carts, narrow screens, text enlargement and reduced motion are checked.',
      ] },
    ],
    takeaway: 'Approve the drawer as a complete keyboard journey: open, understand, change, recover and close. A visually attractive panel is only one part of that experience.',
    related: ['test-shopify-in-app-browsers', 'safe-shopify-theme-release', 'diagnose-shopify-core-web-vitals'],
    sources: [
      { label: 'W3C WAI: modal dialog interaction pattern', url: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/' },
      { label: 'Shopify: theme accessibility best practices', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility' },
      { label: 'W3C WAI: use ARIA carefully', url: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/' },
    ],
  },
  {
    slug: 'test-shopify-in-app-browsers',
    title: 'How to test the Shopify journey your social ad visitors actually use',
    description: 'Build a focused mobile and in-app browser QA plan around real acquisition links, purchase states and useful bug reports.',
    pillar: 'quality', readingMinutes: 7, date: '2026-10-28',
    intro: [
      'A product page can work in a desktop browser and still fail in the route a customer takes from an advert. The difference may involve the actual phone, the browser inside the social app, a redirect, a consent state or an interaction that was never exercised during review. A responsive screenshot does not test that journey.',
      'Use this workflow before an important campaign or when support reports a mobile buying problem. It is not a claim that every in-app browser is broken or that a native cart will automatically fix every failure. Reproduce the specific issue before choosing a replacement. The goal is a small, realistic test matrix that your team can repeat.',
    ],
    sections: [
      { id: 'actual-entry', title: 'Start from the actual acquisition link', paragraphs: [
        'Take the same landing URL the campaign uses, including the relevant routing and campaign parameters, without exposing customer information. Open it through the intended source app on a real test device. Record the app version, operating system, device, market and time of the test. Starting by typing the clean domain into a different browser may miss the failure entirely.',
        'Describe the expected route before testing: advert to landing page, product selection, add to cart, cart review and the handoff to checkout. If the experience intentionally opens an external browser at a step, note that too. This creates an acceptance path everyone can agree on instead of a vague instruction to test mobile.',
      ] },
      { id: 'matrix', title: 'Build a matrix from traffic and risk', paragraphs: [
        'Use your acquisition and support evidence to choose representative combinations. At minimum, separate the browser inside an important source app from the phone’s normal browser. Add the operating systems and device classes that matter to your customers. A complete list of every phone is not realistic; a reasoned list of high-risk journeys is.',
        'Desktop device emulation is helpful for layout and repeatable investigations. Chrome’s documentation describes it as an approximation, with limitations that make real-device testing important. Use it to catch narrow-width problems quickly, then confirm critical interactions on actual hardware. Record which checks were emulated and which were performed on a real device.',
      ] },
      { id: 'purchase-states', title: 'Test states rather than only pages', paragraphs: [
        'Choose a simple one-time item, a product with several variant choices and a subscription item if the store offers subscriptions. Exercise an unavailable combination and an invalid quantity. Add two items rapidly, change quantity, remove an item and reopen the cart. A screenshot of the default product state cannot reveal incorrect line properties or a stalled update.',
        'Check consent choices, a returning visit and the back button where relevant. Confirm that a failed request produces a recoverable message rather than an endlessly disabled button. Keep test data and checkout procedures agreed with the merchant; do not create real charges or disturb live inventory simply to complete a QA checklist.',
      ] },
      { id: 'evidence', title: 'Give the developer a bug they can reproduce', paragraphs: [
        'A useful report includes the exact entry route, device and browser context, numbered actions, expected result and observed result. Attach a short recording that begins before the failure. State whether reloading helps and whether the same steps work in the normal browser. Remove personal details and private order data before sharing the evidence.',
        'Where the environment supports it, a developer can use remote debugging to inspect a real Android browser. Chrome provides an official workflow for discovering and inspecting supported Android content from a desktop. This does not guarantee access to every third-party app’s embedded browser. If inspection is unavailable, retain the reproducible steps and visible evidence instead of claiming a diagnosis from guesswork.',
      ] },
      { id: 'regression', title: 'Turn each confirmed failure into a release check', paragraphs: [
        'After a fix, rerun the original path before broadening the test. Confirm that the underlying purchase data is correct, rather than only that the drawer opens. Then test neighbouring flows that share the changed component. If a cart integration changed, include discounts, selling plans, line removal and checkout handoff in that regression pass.',
        'Keep a short release record with the tested combinations and unresolved limits. Campaign teams can reuse this matrix for the next landing page, and support can attach new reports to a known journey. This creates a durable quality process without pretending that any finite device list guarantees a problem-free storefront.',
      ], checklist: [
        'The journey begins from the actual campaign route in the relevant source app.',
        'Device, operating system, app/browser version and market are recorded.',
        'One-time, variant and subscription states are tested where offered.',
        'Slow, failed and repeated cart requests have a recoverable interface.',
        'Back navigation, cart reopening and checkout handoff are reviewed.',
        'The original failure and neighbouring purchase flows pass after the change.',
      ] },
    ],
    takeaway: 'Test the path customers take, on representative real devices, with realistic purchase states. Keep emulation results and confirmed device evidence distinct.',
    related: ['accessible-shopify-cart-drawer', 'safe-shopify-theme-release', 'diagnose-shopify-core-web-vitals'],
    sources: [
      { label: 'Chrome DevTools: device emulation and its limitations', url: 'https://developer.chrome.com/docs/devtools/device-mode/' },
      { label: 'Chrome DevTools: remote debugging on Android', url: 'https://developer.chrome.com/docs/devtools/remote-debugging/' },
      { label: 'Shopify: theme performance and mobile experience', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance' },
    ],
  },
  {
    slug: 'safe-shopify-theme-release',
    title: 'How to release a Shopify theme change with a rollback plan',
    description: 'A merchant-friendly release checklist covering draft themes, version control, QA, content coordination and what a theme rollback can and cannot restore.',
    pillar: 'quality', readingMinutes: 7, date: '2026-10-28',
    intro: [
      'A small storefront change can touch a large buying journey. Updating a purchase selector may affect variants, subscriptions, cart messages and analytics. The safest release is one whose scope, evidence and recovery path are understood before it reaches customers. A backup is valuable, but it is only one part of that process.',
      'Use this guide for custom Shopify theme features, campaign templates or cart updates. It does not replace the separate release process for a Shopify app, Function, checkout extension or external service. When several systems change together, list each system and its owner. A theme switch alone cannot reverse every change in the store.',
    ],
    sections: [
      { id: 'define-change', title: 'Make the change reviewable', paragraphs: [
        'Begin with a short brief: the customer problem, the intended behaviour, affected templates and what should remain unchanged. Include realistic examples such as a sold-out variant, a discounted cart and a long translated product title. Agree how the merchant will approve the result and who can publish it.',
        'Give the work a meaningful version-control branch and a description that another developer can understand. A clear commit history helps trace why a change exists and makes a later fix more precise. Avoid combining an urgent cart repair with an unrelated redesign unless the dependency is real and documented.',
      ] },
      { id: 'separate-preview', title: 'Keep development and customer traffic separate', paragraphs: [
        'Shopify supports working with development and unpublished themes. Duplicate the current theme before customising when appropriate, and give the working copy an unambiguous name. Verify that the preview belongs to the correct store and theme before anyone approves it. A screenshot from an old draft should not become release evidence for a different version.',
        'Shopify’s GitHub integration can connect branches to published or unpublished themes and synchronise theme edits. Establish which branch owns the working theme and how admin changes will be reconciled. An unmanaged mix of editor changes and code pushes can make it difficult to tell which content is included in the release.',
      ] },
      { id: 'checks', title: 'Use code checks and buying-flow checks together', paragraphs: [
        'Theme Check identifies classes of Liquid and JSON issues, including syntax problems and some best-practice violations. Passing it does not prove that a subscription selection adds the correct selling plan or that a promotion displays correctly. Pair automated checks with a practical acceptance journey on the preview.',
        'Choose the checks that match the change. A new content section needs merchant editing, empty content and mobile layout checks. A cart change needs quantity, removal, stock failure, discounts and checkout handoff checks. Record the tested version and unresolved limitations. If a critical journey cannot be verified, keep that limitation visible in the release decision.',
      ] },
      { id: 'coordinate-content', title: 'Coordinate code, content and integrations', paragraphs: [
        'A theme contains presentation and configuration, but the store also contains products, collections, menus, pages, files and app state. Shopify’s theme backup guidance makes clear that downloading a theme does not include those store resources. List any content, app or settings changes that must happen alongside the code, including the order in which they should happen.',
        'Pause overlapping edits to affected templates during the final comparison, or agree how they will be carried forward. Ask a merchant to verify that the preview still contains current campaign copy and prices. A technically sound release can still show outdated merchandising if its working copy was created weeks earlier.',
      ] },
      { id: 'rollback', title: 'Write the rollback before publishing', paragraphs: [
        'Record the currently published theme and keep an identifiable, usable recovery copy. Define what triggers a rollback: for example, a reproducible inability to add an available product. Name the person who makes the decision, the person who carries it out and the checks that confirm recovery. Keep the instructions available to the release owner.',
        'Publishing a new Shopify theme moves the previous theme into the draft section. That can provide a route back for a theme-only problem. It does not automatically undo changed product data, app configuration, discount rules, an extension deployment or orders already placed. Give each additional system its own recovery instructions instead of calling the theme backup a complete store rollback.',
      ] },
      { id: 'after-release', title: 'Check the live journey and preserve the record', paragraphs: [
        'Publish during a window when the responsible people can observe the result and respond. Immediately review a small set of live, agreed purchase journeys and compare the release with the approved preview. Check that contact, key links and tracking behaviour still meet the brief. Use safe test procedures rather than generating unplanned real transactions.',
        'Close the release with a record of the deployed version, time, checks and any follow-up work. Review customer reports and relevant operational signals after the release, while recognising that short-term conversion changes have many possible causes. The result of a release check is verified behaviour, not evidence of a revenue lift.',
      ], checklist: [
        'The exact store, working theme, source branch and release scope are identified.',
        'Current merchant content is reconciled with the preview.',
        'Code checks and relevant buying journeys pass on the version being released.',
        'Keyboard, mobile and failure states are included where affected.',
        'Theme recovery and separate integration/data recovery steps have named owners.',
        'The live version is checked and the release evidence is retained.',
      ] },
    ],
    takeaway: 'A release is ready when the change is reviewable, the buying journey is checked and every changed system has a realistic recovery path.',
    related: ['test-shopify-in-app-browsers', 'accessible-shopify-cart-drawer', 'diagnose-shopify-core-web-vitals'],
    sources: [
      { label: 'Shopify: CLI theme development workflow', url: 'https://shopify.dev/docs/storefronts/themes/tools/cli' },
      { label: 'Shopify: GitHub integration for themes', url: 'https://shopify.dev/docs/storefronts/themes/tools/github' },
      { label: 'Shopify: Theme Check', url: 'https://shopify.dev/docs/storefronts/themes/tools/theme-check' },
      { label: 'Shopify Help: duplicating themes and backup limits', url: 'https://help.shopify.com/en/manual/online-store/themes/managing-themes/duplicating-themes' },
      { label: 'Shopify Help: publishing themes', url: 'https://help.shopify.com/en/manual/online-store/themes/managing-themes/publishing-themes' },
    ],
  },
];
