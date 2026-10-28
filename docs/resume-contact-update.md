# Resume contact and availability corrections

The user corrected the public contact email to `thomas@maghanga.com` and subsequently confirmed availability to fully overlap UK or US team hours. The existing two-page verified resume was edited only to replace the displayed email, its `mailto:` link, and the two-line availability paragraph. No qualifications, experience, dates, results, typography or page geometry were changed.

The final availability text is: “Open to remote in-house roles and contracts. Available to fully overlap UK or US team hours, with flexible scheduling.”

Verification:

- Both PDF pages reopened and rendered at 1.6× resolution with PyMuPDF; both full-page renders were visually inspected.
- For the contact correction, extracted text matched the original exactly after the single email substitution.
- The email link points to `mailto:thomas@maghanga.com`; its clickable rectangle was shortened to the new text width.
- The contact correction’s pixel comparison found changes only inside the original email text region on page 1. Page 2 was pixel-identical at that stage.
- For the subsequent availability correction, extracted text matched the contact-corrected document exactly after replacing the two availability lines. The normalised text matches the approved availability sentence above.
- The availability correction’s pixel comparison found changes only inside the availability paragraph on page 2. Page 1 was pixel-identical to the contact-corrected document; page 2 was pixel-identical outside that paragraph.
- All URI links remained unchanged during the availability correction, including the corrected email link.
- The final file retained two pages and was reopened from its public delivery path.

Original SHA-256: `858957cd785bfa026298d823a897ba073b2200e15c220769d769d5c6b9590f0c`.

Intermediate contact-corrected SHA-256: `4e76bbe285a827fd0073099668b5cb6f87aaa828041868c13168d119e5d1538c`.

Final contact-and-availability-corrected SHA-256: `b011a745584771e3d8f86c4afb1f417fc791361aba2f630e6866cbc81d9d83f7`.

The original backup and before/after renders were retained in the task’s temporary verification directory, not added to the public site.
