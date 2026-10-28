const storefrontGuides = [
  {
    slug: 'merchant-editable-shopify-sections',
    title: 'Build Shopify sections your team can actually edit',
    description: 'A practical brief for reusable Shopify sections: useful editor controls, resilient content, clear ownership and a realistic handover test.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      'A new section is only useful if your team can keep it useful after the developer leaves. A beautiful benefits row that needs a code change for every new product is a recurring production task. A section with forty unexplained settings creates a different problem: nobody is confident enough to change it.',
      'The aim is a small set of decisions that a merchant can make safely. Think of a product education section with an optional heading, a short introduction and a handful of reorderable feature blocks. This guide describes how to brief, review and hand over that customization. It is an implementation planning guide, not a tested theme package or a promise of a conversion improvement.',
    ],
    sections: [
      {
        id: 'decide-what-repeats', title: 'Start with the editing job, not the screenshot',
        paragraphs: [
          'Write down who edits the content, how often it changes and where it appears. A campaign manager might need to reorder proof points every month. A product team might need the same layout with different material information across fifty products. These are different jobs, even when the first screenshot looks identical.',
          'Ask the editor to perform the task in plain language: “Add a fourth benefit, move it above the delivery note, and use the product-specific explanation.” That sentence becomes a better acceptance criterion than “make it fully customizable.” Agree which decisions should stay fixed, such as spacing rules, heading order and readable text widths.',
        ],
        steps: [
          'List the pages that need the section and the content that changes between them.',
          'Separate shared design rules from editable content and genuinely optional display choices.',
          'Choose one ordinary example and one awkward example before development starts.',
        ],
      },
      {
        id: 'choose-controls', title: 'Give each control a clear purpose',
        paragraphs: [
          'Shopify sections and blocks expose settings in the theme editor through schema. A JSON template can hold a configurable sequence of sections. Use those capabilities to match the actual editing workflow rather than recreating every CSS property as a switch.',
          'Prefer specific labels such as “Supporting sentence” and “Feature image” over “Text 2” and “Image B.” Explain useful limits near the control: whether a heading should be one sentence, whether an image needs an empty background, and what happens when a field is blank. Restrict design choices to combinations the developer has checked. A free text colour field is rarely the best way to protect contrast.',
          'Use blocks for repeated items that need their own content or order. Ask the developer to explain whether the implementation uses local section blocks or reusable theme blocks; their capabilities differ. This choice should follow the theme architecture and editing need, rather than a requirement to use the newest feature everywhere.',
        ],
      },
      {
        id: 'content-model', title: 'Keep product facts out of duplicated layouts',
        paragraphs: [
          'If every product uses the same layout with different facts, consider connecting compatible settings to product data through dynamic sources. That can avoid creating an alternate template for every SKU. A one-off campaign message can still live in a section setting; it does not need a data model simply because a data model is available.',
          'Define the empty state before filling the happy path. A missing image should not leave a broken box. An optional heading should not create an empty heading element. A product without a specification should not inherit an unrelated specification from a default example. Ask for content ownership as well as code ownership: somebody must know where to change the underlying fact.',
        ],
      },
      {
        id: 'handover', title: 'Make the handover a live editing test',
        paragraphs: [
          'Review an unpublished theme before changing the live storefront. Have the person who will maintain the section build a second version without developer help. Watch where they hesitate. A short screen recording of the completed workflow is useful documentation; a recording that requires the developer to rescue every step is evidence that the editor needs work.',
          'The developer handoff should include the section file names, any shared snippets, the templates affected, the data definitions used and the rollback path. Record whether an update to the parent theme could overwrite the customization. Keep a before-and-after content example so a later developer can distinguish intentional behaviour from a regression.',
          'Do not extend this pattern to a complex product configurator merely to avoid an app. Pricing rules, compatibility checks and account-specific workflows can require a broader application design. Merchant editing is one requirement within that design, not a substitute for it.',
        ],
      },
      {
        id: 'qa', title: 'Acceptance checklist',
        paragraphs: ['Approve the section only after checking the editing workflow and the customer experience together. A successful theme-editor save does not prove that the published layout is understandable.'],
        checklist: [
          'An editor can add, remove and reorder items using meaningful labels, with no code changes.',
          'Long headings, missing optional fields, one item and the maximum supported items remain readable.',
          'The layout works at narrow mobile widths, with zoom and with keyboard navigation.',
          'Multiple instances on one page do not share accidental JavaScript state or duplicate control IDs.',
          'Theme-editor changes update correctly, and a fresh storefront load shows the saved content.',
          'Images have appropriate alternative text, dimensions and loading behaviour for their position.',
          'The team has the editing instructions, affected files and a way to restore the previous version.',
        ],
      },
    ],
    takeaway: 'Brief the task your editor needs to complete, then prove that task works in an unpublished theme. Flexible code and confident merchant editing should be reviewed together.',
    related: ['metaobjects-product-education', 'liquid-sections-vs-page-builders', 'shopify-campaign-landing-pages'],
    sources: [
      { label: 'Shopify: Section schema', url: 'https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema' },
      { label: 'Shopify: JSON templates', url: 'https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates' },
      { label: 'Shopify: Blocks', url: 'https://shopify.dev/docs/storefronts/themes/architecture/blocks' },
      { label: 'Shopify: Dynamic data sources', url: 'https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources' },
    ],
  },
  {
    slug: 'metaobjects-product-education',
    title: 'Use metaobjects to keep product education consistent',
    description: 'Plan reusable ingredient, material, size and care content in Shopify without turning every product description into a separate maintenance job.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      'A material explanation appears on twelve product pages. The product team updates it in ten places, misses two and receives a support question about the conflicting advice. The content problem is repetition: the store has twelve copies of what should be one reviewed fact.',
      'Shopify metaobjects can represent a reusable record made of several fields. They are useful for structured education such as material profiles, care instructions or size guides. They do not write the content, verify a claim or automatically decide which product should use it. This guide explains the merchant decisions to make before asking a developer to connect that information to your theme.',
    ],
    sections: [
      {
        id: 'decide-model', title: 'Choose the smallest useful content model',
        paragraphs: [
          'Start with three real products and their current education content. Highlight the pieces that are truly shared and the pieces that only apply to one product. If a single extra product field answers the requirement, a metafield may be enough. If an explanation has its own name, image, short summary and long description, a reusable record becomes more useful.',
          'For an illustrative material profile, a reasonable brief might include an internal display name, customer-facing title, short explanation, care note and optional image. Do not create fields because they may be useful someday. Every field adds a decision for the content team, and unused fields make the admin harder to understand.',
          'Agree whether editing one entry should update every product that references it. That is often the benefit, but it can also surprise a campaign manager who expected a local change. If one product requires a qualified version of the explanation, decide whether it needs a separate record or an explicit product-specific addition.',
        ],
      },
      {
        id: 'build-records', title: 'Create a content workflow before the layout',
        paragraphs: [
          'Shopify separates a metaobject definition, which describes the fields, from entries, which contain the actual content. Your developer can explain how product references connect those entries to the storefront. The merchant handoff should show both places: where to edit the shared explanation and where to choose it for a product.',
          'Use plain descriptions and sensible validation so editors know what belongs in each field. A short summary should not accidentally become a full product description. Decide which fields are required and which can disappear gracefully. Name entries in a way that distinguishes similar materials or regions without exposing confusing internal labels to customers.',
        ],
        steps: [
          'Agree the record fields using actual content, including the longest realistic explanation.',
          'Create a small set of reviewed entries and connect them to a limited product group.',
          'Have the developer build the display and its empty states in an unpublished theme.',
          'Check the editing process with the product team before importing the rest of the catalogue.',
        ],
      },
      {
        id: 'render', title: 'Keep the product page useful when content is missing',
        paragraphs: [
          'Ask for a deliberate fallback. A product without a linked size guide should not display another product’s guide. A draft or unavailable entry should not leave an empty accordion title. If the content is essential to choosing a product safely, flag missing data for the team instead of quietly hiding a critical explanation.',
          'Compatible theme settings can use dynamic sources, but the exact editor connection depends on the setting type and page context. Have the developer demonstrate the connection rather than assume any field can feed any control. A custom Liquid section may be appropriate when the content requires a specific list layout or conditional display.',
          'Avoid using metaobjects as a dumping ground for arbitrary HTML copied from old pages. Structured fields are valuable because their roles are predictable. Separate content from presentation so a later design update does not require rewriting every entry. Keep factual substantiation and approval notes in the team’s content process where needed.',
        ],
      },
      {
        id: 'limits', title: 'Know when a reusable record is unnecessary',
        paragraphs: [
          'A single seasonal announcement on one landing page may belong in that page’s section settings. A one-line product-specific measurement may belong in a product metafield. A complex product compatibility service may require logic beyond a content record. Choose metaobjects when the content has a stable reusable structure, not as a default response to every theme request.',
          'Plan localization and ownership before a large rollout. Ask who will review translations, how a regional difference will be represented and who can approve shared edits. A technically tidy model still fails if nobody knows that updating one material explanation affects the entire product family.',
        ],
      },
      {
        id: 'qa', title: 'Review content, connections and change impact',
        paragraphs: ['Test a shared update as carefully as a new layout. The acceptance test is whether the right education reaches the right product and stays maintainable.'],
        checklist: [
          'Each sample product shows the correct entries in the intended order.',
          'An edit to a shared entry updates the intended products and leaves unrelated products alone.',
          'Missing references, empty optional fields and unavailable entries have sensible outcomes.',
          'Long copy and translated content fit without clipping or unreadable mobile accordions.',
          'Images and headings remain accessible; essential buying information is easy to find.',
          'Editors can explain the difference between editing a shared record and changing a product reference.',
          'A content inventory records which entries are in use and who reviews their accuracy.',
        ],
      },
    ],
    takeaway: 'Model a reviewed piece of product knowledge once, connect it deliberately and test the effect of shared edits before scaling across the catalogue.',
    related: ['merchant-editable-shopify-sections', 'honest-product-comparisons', 'liquid-sections-vs-page-builders'],
    sources: [
      { label: 'Shopify Help: Metaobjects', url: 'https://help.shopify.com/en/manual/custom-data/metaobjects' },
      { label: 'Shopify: Custom data', url: 'https://shopify.dev/docs/apps/build/custom-data' },
      { label: 'Shopify: Dynamic data sources', url: 'https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources' },
      { label: 'Shopify: Liquid metaobject object', url: 'https://shopify.dev/docs/api/liquid/objects/metaobject' },
    ],
  },
  {
    slug: 'shopify-variant-selector-qa',
    title: 'Stop variant selectors from adding the wrong item',
    description: 'A merchant-friendly specification and test plan for Shopify product options, sold-out combinations, deep links and reliable add-to-cart behaviour.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      'A customer chooses a large blue product, sees the correct image and adds it to the cart. The drawer then shows a small black product. That is a functional failure, even if the selector looks polished. The visible option, underlying variant, displayed price and submitted item must agree throughout the buying flow.',
      'A variant selector is a small interface connected to several systems. Product data, availability, browser history, media, purchase plans and cart requests can all influence it. This guide gives merchants a practical specification and review plan. It does not provide a drop-in selector or claim that a particular theme has passed these checks.',
    ],
    sections: [
      {
        id: 'state-contract', title: 'Define what a selection must update',
        paragraphs: [
          'Write a state contract in ordinary language. When an option changes, what should happen to the product image, price, compare-at price, unit information, stock message and add button? Which changes are genuinely variant-specific? A single checklist prevents the developer from updating the colour swatch while forgetting the purchase form.',
          'Distinguish a combination that exists but cannot currently be purchased from a combination that does not exist. Merchants should agree how both states are explained. A disabled button without a reason can make the page feel broken. Avoid silently switching to a different purchasable combination merely to keep the add button enabled.',
          'If the product supports subscriptions, state whether a selected selling plan remains valid after the variant changes. If not, the interface needs a clear recovery path. The same principle applies to bundles and quantity rules: do not let yesterday’s selection remain attached to today’s incompatible item.',
        ],
      },
      {
        id: 'implementation', title: 'Ask the developer to verify the source of truth',
        paragraphs: [
          'The final cart submission must use the intended Shopify variant identifier. Visual labels are not enough. Ask the developer to demonstrate a selection in the page and then inspect the returned cart line. This is particularly important after replacing a theme control with a custom design or introducing quick-add cards.',
          'Shopify documents variant deep links and current option-value APIs for theme development. For large variant catalogues, avoid a design that assumes every variant is already present in a single rendered list. Current guidance explains that Liquid product.variants returns at most 250 variants and provides a different approach for high-variant products. Have compatibility checked against the actual catalogue, theme and installed apps.',
          'A developer should also handle quick successive changes. If a slower response for an earlier choice arrives after a newer choice, the page must not return to the older state. Ask for a slow-network demonstration rather than accepting only the fastest desktop path.',
        ],
      },
      {
        id: 'customer-journeys', title: 'Test entry routes, not just option clicks',
        paragraphs: [
          'Customers can arrive at a specific variant from an advert, collection card or shared link. Open those URLs in a new tab and compare the initial controls, media and price. Then change the selection, use the browser Back button and reload. The selected item should remain understandable; the implementation should not depend on having clicked through the page in one particular order.',
          'Repeat the exercise in a quick-add context if the store uses one. A product page and a collection-card modal can render different controls and maintain separate state. Multiple product forms on a page must not accidentally share identifiers or update each other. The cart should confirm enough option detail for a customer to recognise the item they chose.',
        ],
        steps: [
          'Choose representative products: one option, multiple options, a sale variant and a sold-out combination.',
          'Add a high-variant product if the catalogue has one, rather than assuming a simple test product represents it.',
          'Record expected variant, visible price and cart result for each important selection.',
          'Exercise direct links, rapid changes, slow requests, browser history and repeated add attempts.',
        ],
      },
      {
        id: 'accessible-controls', title: 'Make the choice understandable without colour alone',
        paragraphs: [
          'A colour circle needs an accessible name and a visible indication of selection. A greyed-out option needs a meaning beyond its shade. Keyboard users should be able to reach and change choices without opening a mouse-only tooltip. Ask the developer to choose appropriate native controls or implement the complete interaction expected for a custom control.',
          'Do not redesign a reliable selector simply because another store has a more elaborate one. A small catalogue with clear option names may need better labels, a size guide or improved error handling rather than a new component. The goal is confident selection and correct fulfilment, not complexity.',
        ],
      },
      {
        id: 'qa', title: 'Variant acceptance checklist',
        paragraphs: ['Use a real test order workflow or inspect the cart in an unpublished theme with safe test products. Keep the evidence for future theme and app updates.'],
        checklist: [
          'Selected option labels, image, price, availability and submitted variant agree.',
          'Sold-out and nonexistent combinations have distinct, understandable recovery paths.',
          'Deep links, refresh and browser Back do not leave stale controls or prices.',
          'Rapid changes and slow responses cannot restore an earlier choice.',
          'Subscription or bundle settings stay valid or reset with a clear explanation.',
          'Quick add, sticky add controls and the main product form submit the intended item.',
          'Keyboard operation, visible focus, labels and mobile touch targets remain usable.',
          'The resulting cart line displays enough detail to confirm the customer’s choice.',
        ],
      },
    ],
    takeaway: 'Treat variant selection as a contract between the page and the cart. Test the item that is submitted, not only the option that appears selected.',
    related: ['merchant-editable-shopify-sections', 'metaobjects-product-education', 'shopify-campaign-landing-pages'],
    sources: [
      { label: 'Shopify: Support product variants', url: 'https://shopify.dev/docs/storefronts/themes/product-merchandising/variants' },
      { label: 'Shopify: Support high-variant products', url: 'https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products' },
      { label: 'Shopify: Theme accessibility', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility' },
      { label: 'Shopify Help: Adding variants and compatibility considerations', url: 'https://help.shopify.com/en/manual/products/variants/add-variants' },
    ],
  },
  {
    slug: 'shopify-campaign-landing-pages',
    title: 'Build campaign landing pages without creating a second storefront',
    description: 'A practical plan for Shopify campaign pages that preserve the buying journey, editing workflow, performance and measurement.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      'A campaign page needs room to explain the offer, but it still belongs to a working store. When a landing page develops its own prices, cart behaviour, mobile navigation and tracking rules, every campaign creates another place for the store to drift out of sync.',
      'The useful question is how to create a focused buying journey while keeping the shared parts reliable. This guide outlines a merchant brief for campaign pages built around reusable Shopify components. It is a planning framework, not evidence that a particular layout improves conversion or that a campaign has been measured.',
    ],
    sections: [
      {
        id: 'brief', title: 'Agree one audience, one promise and one next step',
        paragraphs: [
          'Begin with the reason someone clicked. Write the advert’s promise, what the visitor already knows and the question the page must answer before asking for a purchase. A first-time visitor comparing materials needs different information from a returning customer looking for a refill. Pasting the entire homepage into a campaign template avoids making that decision.',
          'List the objections in order of importance and assign each section a job. An introduction can establish relevance; a demonstration can explain use; a comparison can clarify fit; delivery information can reduce uncertainty. Remove sections that repeat the same message. A longer page is justified by unanswered questions, not by a target section count.',
          'Choose the primary action deliberately. It may lead to a product page, select a specific variant or add a clearly described product. If the action skips the product page, ensure the landing page provides the information and choices that the product page normally supplies. Never treat an abbreviated path as automatically better.',
        ],
      },
      {
        id: 'architecture', title: 'Share product truth and buying behaviour',
        paragraphs: [
          'Ask the developer which content comes from Shopify product data and which belongs to the campaign. Product availability and purchasable variants should not depend on a copied spreadsheet embedded in the page. Keep the source of prices, product links and purchase behaviour explicit, particularly when the campaign spans multiple markets.',
          'A reusable JSON template with focused sections can give the marketing team flexibility without maintaining a separate storefront application. A page builder may also be appropriate when it fits the team’s workflow. In either route, identify which shared components handle the cart, consent controls, navigation and error messages. Review the final customer journey rather than only the landing-page screenshot.',
          'For repeated campaigns, create a small documented component library. Name components by the job they do, such as “Product comparison” or “How it works,” and provide a good content example. Avoid copying an old page wholesale when its offer, claims and product references are no longer current.',
        ],
      },
      {
        id: 'performance', title: 'Protect the first useful view',
        paragraphs: [
          'A high-resolution hero, several video embeds and multiple app scripts can undermine an otherwise clear page. Ask for an asset inventory before launch: which files are required immediately, which can wait and which add no useful information. The first product explanation and action should not be held behind an ornamental animation.',
          'Review the page on a constrained mobile connection as well as a desktop preview. Check when the main content appears, whether images move the layout and whether controls respond while third-party code loads. Shopify’s performance guidance provides the technical implementation reference; the merchant acceptance test is whether someone can understand and use the page under realistic conditions.',
        ],
      },
      {
        id: 'measurement', title: 'Make launch and learning separate decisions',
        paragraphs: [
          'Before launching, record the destination URLs, campaign parameters, primary action and purchase path. Have the analytics owner verify the events that matter and the consent conditions under which they fire. A button-click event is not a completed purchase, and a dashboard difference is not automatically lost revenue.',
          'If the page is part of an experiment, document the hypothesis, eligible audience, assignment method and decision rule separately from the build brief. If traffic or instrumentation cannot support a trustworthy test, use the page as a release with monitored behaviour and qualitative feedback. Label that evidence honestly instead of presenting a before-and-after chart as causal proof.',
          'Keep a rollback plan and decide what happens when the campaign ends. An expired offer can harm customer trust. Redirect, retire or update the page deliberately, preserving useful URLs where appropriate. Assign an owner to check old adverts and internal links rather than leaving campaign cleanup to the next redesign.',
        ],
      },
      {
        id: 'qa', title: 'Campaign launch checklist',
        paragraphs: ['Test the route from the actual advert URL through the final handoff to checkout, using an unpublished theme or safe preview environment before release.'],
        checklist: [
          'The advert promise matches the page heading, offer conditions and destination product.',
          'Prices, variants, availability and market-specific details stay consistent with the store.',
          'Mobile layouts, in-app browsers, keyboard navigation and long translated copy are checked.',
          'Images have dimensions; the first useful content and primary control load promptly.',
          'Cart actions handle success, slow responses, unavailable items and failures clearly.',
          'Tracking and consent behaviour are reviewed by the measurement owner.',
          'The campaign owner, expiry plan, rollback version and learning method are documented.',
        ],
      },
    ],
    takeaway: 'Give the campaign its own argument and content order while keeping product truth, cart behaviour and operational ownership connected to the store.',
    related: ['merchant-editable-shopify-sections', 'liquid-sections-vs-page-builders', 'honest-product-comparisons'],
    sources: [
      { label: 'Shopify: JSON templates', url: 'https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates' },
      { label: 'Shopify: Theme development best practices', url: 'https://shopify.dev/docs/storefronts/themes/best-practices' },
      { label: 'Shopify: Theme performance guidance', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance' },
      { label: 'Shopify: Theme accessibility', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility' },
    ],
  },
  {
    slug: 'liquid-sections-vs-page-builders',
    title: 'Custom Liquid sections or a page builder: how to choose',
    description: 'Compare editing needs, recurring cost, maintenance, performance and migration risk before replacing or adding a Shopify page builder.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      '“Remove the page builder” is not a complete brief. Neither is “give marketing total flexibility.” A page builder can help a team launch campaigns without a development queue. A custom section can make a repeated, well-understood layout easier to maintain. Either choice can become expensive when the editing workflow and support model are ignored.',
      'Choose the tool around the work your team repeats. This guide offers a decision process for Shopify merchants, with an emphasis on proving the workflow before migrating a live page. It does not rank individual apps or claim that native Liquid is automatically faster, cheaper or more effective.',
    ],
    sections: [
      {
        id: 'inventory', title: 'Measure the current problem first',
        paragraphs: [
          'Collect a month of actual requests. How many were simple content edits, new layouts, urgent campaign launches or bug fixes? Who waited, and for how long? If the main frustration is that nobody has documented the existing editor, rebuilding the page may simply reproduce the same confusion in a new interface.',
          'Audit the current page at the component level. Note what is shared across campaigns, which features rely on an app and which content is unique. Record forms, tracking, subscriptions, product selectors, localization and third-party integrations. A visually simple replacement can still remove an important behaviour that was hidden inside the original page.',
          'Also define the desired result in observable terms: a campaign manager can build an approved page from known sections in an afternoon; an editor can update delivery content without a developer; or a page can stop loading an unused dependency. These are useful acceptance criteria. “More native” is a preference until tied to a practical outcome.',
        ],
      },
      {
        id: 'fit', title: 'Match the tool to the rate of design change',
        paragraphs: [
          'Custom sections fit recurring layouts with stable design rules. A comparison block, product education module or consistent campaign hero can offer carefully chosen settings and predictable responsive behaviour. Shopify’s section architecture and JSON templates support merchant editing within that defined system.',
          'A page builder may fit a team that needs frequent layout exploration and already has people trained to use it. Confirm the exact capabilities of the chosen product and plan rather than assuming all builders behave alike. Flexibility has a governance cost: somebody still needs to review accessibility, content accuracy and the complete purchase path.',
          'A hybrid can be sensible. A store might keep a builder for occasional campaign exploration and use custom sections for proven patterns repeated across product pages. The important boundary is ownership: document which tool owns each route and avoid layering several editors over the same component.',
        ],
      },
      {
        id: 'cost', title: 'Compare the cost after launch',
        paragraphs: [
          'Include app fees, developer build time, ongoing support, onboarding and theme updates in the comparison. A one-time development invoice does not eliminate maintenance. A recurring app fee does not necessarily cost more than an internal queue. Ask who will fix a broken section during a campaign and whether that person has enough documentation to do so.',
          'Check portability before committing. Can content be exported or reused? What happens after uninstalling an app? Does a theme update require reapplying custom files? Avoid guessing: run a controlled proof in an unpublished theme and preserve a rollback copy. Never uninstall a live dependency simply to see what breaks.',
        ],
      },
      {
        id: 'performance', title: 'Test the page, not the category label',
        paragraphs: [
          'A badly built Liquid section can load large assets and unnecessary JavaScript. A carefully configured builder page can be perfectly usable. Review representative pages with comparable content and real integrations. Check loading, layout movement and responsiveness, then inspect what is responsible for any problem.',
          'Use Shopify’s theme performance recommendations as a technical checklist and verify the whole customer journey. A score by itself cannot tell you whether the variant picker submits the right product or whether the editor can safely maintain the content. Keep performance findings specific to the tested page and conditions.',
          'Do not combine a design rewrite, editor migration and analytics overhaul unless the risk is justified. A smaller pilot makes it easier to attribute problems and compare the new workflow. Start with a lower-risk page, retain its URL and confirm redirects if any route must change.',
        ],
      },
      {
        id: 'pilot', title: 'Run a pilot your team can judge',
        paragraphs: [
          'Ask the developer or app specialist to reproduce one real page, including its difficult content and buying behaviour. Have the intended editor make a second version. Record the work required, the confusing decisions and the dependencies. This is more informative than a polished demo populated by its creator.',
          'If the pilot passes, migrate in batches and keep an inventory of old components. Remove unused assets only after checking that no live route still relies on them. The migration is complete when the team can maintain the new page, monitoring still works and the old dependency has a deliberate retirement plan.',
        ],
        checklist: [
          'The editor can complete the recurring task without hidden developer intervention.',
          'Existing forms, product choices, cart behaviour, tracking and localization still work.',
          'Mobile and keyboard experiences are checked with realistic content.',
          'Recurring fees, support owner, update process and rollback are documented.',
          'Routes and internal links are preserved or intentionally redirected.',
          'Unused dependencies are identified from evidence rather than removed by assumption.',
        ],
      },
    ],
    takeaway: 'Choose the smallest toolset that lets your team publish reliable pages repeatedly. Prove that workflow with one real page before migrating the rest.',
    related: ['merchant-editable-shopify-sections', 'shopify-campaign-landing-pages', 'metaobjects-product-education'],
    sources: [
      { label: 'Shopify: Sections', url: 'https://shopify.dev/docs/storefronts/themes/architecture/sections' },
      { label: 'Shopify: JSON templates', url: 'https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates' },
      { label: 'Shopify: Theme performance guidance', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance' },
      { label: 'Shopify: Theme development best practices', url: 'https://shopify.dev/docs/storefronts/themes/best-practices' },
    ],
  },
  {
    slug: 'honest-product-comparisons',
    title: 'Build a product comparison that helps customers choose',
    description: 'Choose fair comparison criteria, substantiate product claims and design a readable Shopify comparison that answers a real buying question.',
    pillar: 'storefront', readingMinutes: 8, date: '2026-10-28',
    intro: [
      'A comparison is useful when it makes a trade-off easier to understand. It is less useful when every row gives your product a green tick and every alternative a red cross. Customers still need to know which option fits their situation, what the evidence supports and what they give up by choosing it.',
      'This guide covers a merchant brief for comparing products within a catalogue or explaining a product against a clearly defined alternative. The examples are educational. They do not establish a client result, substantiate a real product claim or imply that a comparison section will improve conversion.',
    ],
    sections: [
      {
        id: 'question', title: 'Choose one buying question',
        paragraphs: [
          'Start with a question heard in support tickets, research interviews or product reviews: which size suits a small apartment, which formula is fragrance-free, or which purchase option fits an occasional user? Choose criteria that help answer that question. Do not begin with a table template and search for enough claims to fill it.',
          'Keep the comparison scope visible. If two products are compared for a particular use case, say so. A premium material may have a maintenance trade-off; a smaller format may cost more per unit but suit travel better. Showing a reasonable fit for another option can make the comparison more useful than pretending one choice wins in every situation.',
          'For competitor comparisons, assign a factual reviewer and a review date. Product specifications, prices and policies can change. Describe the exact version or conditions compared and link to the underlying evidence where appropriate. Obtain qualified review for regulated or legally sensitive claims rather than treating interface copy as permission to publish them.',
        ],
      },
      {
        id: 'evidence', title: 'Separate facts, interpretation and unknowns',
        paragraphs: [
          'Create a simple content worksheet before design: criterion, source, date checked, customer meaning and limitations. “Weight: 450 g” is a fact if supported by a reliable specification. “Easier to carry” is an interpretation that depends on context. “Best quality” is not made credible by placing it in a table.',
          'Use the same standard for every column. Do not compare your introductory subscription price against another product’s one-time price without explaining the different commitment. Do not compare total package size in one column with serving size in another. If information is unavailable, say that it was not verified rather than treating the blank as a product disadvantage.',
          'Keep claims narrow enough to maintain. A detailed comparison with no owner will become stale. For recurring catalogue comparisons, structured product fields or reusable content records can reduce conflicting copies. The data model should keep the source and review workflow clear; a metaobject does not validate the underlying claim.',
        ],
      },
      {
        id: 'layout', title: 'Design for scanning and small screens',
        paragraphs: [
          'Use a short list of consequential criteria and write the labels in customer language. Group related information rather than mixing material, delivery, price and marketing slogans into one long grid. Where a technical specification matters, add a short explanation of what it means for the intended use.',
          'A real comparison table should preserve understandable row and column relationships. Ask the developer how headings will be conveyed to assistive technology and how the layout behaves on a narrow screen. Horizontal scrolling can work when its existence is clear and labels stay understandable, but hiding half the comparison behind a clipped container does not.',
          'A mobile alternative might show concise option cards followed by a focused comparison of the most important differences. Whatever the layout, test it with realistic long names and missing data. Do not communicate a positive or negative value using colour alone; words must carry the meaning.',
        ],
      },
      {
        id: 'next-step', title: 'Connect the comparison to the right next step',
        paragraphs: [
          'A recommendation should follow from the criteria. “Choose the smaller format if storage space matters most” is more useful than “Shop now” repeated after every row. Link each option to the correct product and preserve any clearly stated variant choice. Confirm that customers can still inspect full details before committing.',
          'If there is no meaningful decision to clarify, a comparison may be unnecessary. A demonstration, material explanation or delivery note may answer the real objection more directly. Keep the comparison only if a person can explain what decision it helps them make after reading it.',
          'To evaluate it, begin with comprehension: ask a few target customers to choose an option and explain why. Watch for misunderstood units and missing criteria. If later testing the commercial effect, define the experiment and guardrails separately. A click on the comparison is engagement evidence, not proof that it caused a purchase.',
        ],
      },
      {
        id: 'qa', title: 'Comparison publishing checklist',
        paragraphs: ['Review the content and interaction together before release. A readable layout cannot compensate for an unsupported claim.'],
        checklist: [
          'The comparison answers a documented customer question and names its scope.',
          'Each factual claim has a source, reviewer and truthful review date.',
          'Units, purchase terms and test conditions are comparable across columns.',
          'Unknown information is labelled; disadvantages are not invented.',
          'Table relationships, reading order, contrast and keyboard access are understandable.',
          'Mobile users can discover and read every criterion without accidental clipping.',
          'Product links and selected variants lead to the intended destination.',
          'An owner knows when to recheck specifications, prices and policies.',
        ],
      },
    ],
    takeaway: 'A good comparison explains fit and trade-offs with evidence. Design the section around a real buying question and a content review process.',
    related: ['metaobjects-product-education', 'shopify-campaign-landing-pages', 'merchant-editable-shopify-sections'],
    sources: [
      { label: 'Shopify: Theme accessibility', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility' },
      { label: 'Shopify: Custom data', url: 'https://shopify.dev/docs/apps/build/custom-data' },
      { label: 'Google Search Central: Helpful, reliable, people-first content', url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content' },
    ],
  },
];

export default storefrontGuides;
