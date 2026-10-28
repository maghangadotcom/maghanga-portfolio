# Resume contact correction

The user corrected the public contact email to `thomas@maghanga.com`. The existing two-page verified resume was edited only to replace the displayed email and its `mailto:` link. No qualifications, experience, dates, results, typography or page geometry were changed.

Verification:

- Both PDF pages reopened and rendered at 1.6× resolution with PyMuPDF; both full-page renders were visually inspected.
- Extracted text matched the original exactly after the single email substitution.
- The email link points to `mailto:thomas@maghanga.com`; its clickable rectangle was shortened to the new text width.
- Pixel comparison found changes only inside the original email text region on page 1. Page 2 was pixel-identical; page 1 was pixel-identical outside that region.
- The final file retained two pages and was reopened from its public delivery path.

Original SHA-256: `858957cd785bfa026298d823a897ba073b2200e15c220769d769d5c6b9590f0c`.

Updated SHA-256: `4e76bbe285a827fd0073099668b5cb6f87aaa828041868c13168d119e5d1538c`.

The original backup and before/after renders were retained in the task’s temporary verification directory, not added to the public site.
