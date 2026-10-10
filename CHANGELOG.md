# Changelog

All notable changes to the InvoiceKit monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-07

### Added
- **Monorepo Architecture:**
  - Configured npm workspace monorepo separating `@invoicekit/tokens`, `@invoicekit/ui`, `@invoicekit/renderer`, and `@invoicekit/docs`.
  - Configured strict TypeScript compiler configuration with global workspace path aliasing.
  - Setup Vitest test runner for automated unit and contrast testing.

- **Design System Tokens (`@invoicekit/tokens`):**
  - Full design tokens system: neutrals (Slate 50–950), brand (Indigo 50–900), semantic states (Success/Emerald, Warning/Amber, Danger/Rose, Info/Sky).
  - 4px grid spacing scale, radii scale, shadows, typography scale.
  - W3C WCAG 2.1 relative luminance and contrast ratio calculation engine (`evaluateContrast`, `getContrastRatio`, `getLuminance`).
  - Automated WCAG AA contrast unit test suite guaranteeing all default text/background token combinations meet or exceed 4.5:1.
  - CSS custom properties (`generateCssVariables`) for zero-drift token adoption.

- **Enterprise Component Suite (`@invoicekit/ui`):**
  - 24 enterprise-grade UI components with exported TypeScript prop interfaces and token-only styling:
    1. `Button` (5 variants: primary, secondary, outline, ghost, danger; 3 sizes; loading & disabled states)
    2. `Input` (labels, helper texts, validation errors, prefix/suffix icon slots)
    3. `Textarea` (multiline invoice notes and legal terms)
    4. `Select` (accessible select dropdown)
    5. `Table` (Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell with numerical right-alignment & monospace font)
    6. `Modal` (Accessible dialog with focus trap, backdrop click, and ESC key listener)
    7. `Badge` (WCAG AA compliant status badges with optional dot indicator)
    8. `StatusPill` (Invoice lifecycle pill indicators: paid, pending, overdue, draft, cancelled)
    9. `Card` (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter; outlined, elevated, flat)
    10. `Tabs` (Tabs, TabsList, TabsTrigger, TabsContent)
    11. `Toast` (`ToastProvider`, `useToast` hook supporting success, error, warning, and info with auto-dismiss)
    12. `Text` (Typography component: h1, h2, h3, h4, body, body-sm, caption, mono)
    13. `CurrencyInput` (Domain-specific currency input with symbol prefix and decimal formatting)
    14. `DatePicker` (Date picker input for issue and due dates)
    15. `Checkbox` (Accessible checkbox with label and error support)
    16. `Switch` (Accessible toggle switch)
    17. `Tooltip` (Accessible hover and focus tooltip helper)
    18. `Divider` (Horizontal and vertical separators with optional text label)
    19. `Avatar` (Initials fallback or image avatar)
    20. `Skeleton` (Pulsing loading skeleton placeholders)
    21. `EmptyState` (Zero-state illustration, title, description, and action button)
    22. `Kbd` (Keyboard shortcut badge)
    23. `Alert` (System alert banners with status tones)
    24. `DropdownMenu` (Accessible popup menu for invoice actions)

- **Universal Invoicing Engine (`@invoicekit/renderer`):**
  - Canonical domain schema (`Invoice`, `Party`, `InvoiceItem`, `InvoiceTotals`, `PaymentDetails`).
  - Universal renderer interface: `InvoiceRendererOutput<T>` and dispatcher function `renderInvoice(invoice, out)`.
  - **Renderer 1 (DOM):** `DOMInvoiceRenderer` outputs rich, interactive, responsive React DOM elements styled with `@invoicekit/ui`.
  - **Renderer 2 (PDF):** `PDFInvoiceRenderer` outputs print-ready vector ISO A4 PDFs using `jsPDF` with custom typography, brand accent bands, calculated table grids, and 1-click download.
  - **Renderer 3 (Email):** `EmailInvoiceRenderer` outputs bulletproof inline-CSS table HTML compatible with desktop and mobile email clients, plus formatted ASCII plain-text fallback.

- **Component Playground & Studio Application (`@invoicekit/docs`):**
  - **Invoice Studio:** Live preview and controls for the 3 renderers (DOM, PDF vector download, Email HTML & ASCII inspector).
  - **Component Playground:** Interactive live explorer showing every state of all 24 components.
  - **WCAG AA Inspector:** Live color contrast ratio calculator and palette compliance audit matrix.
  - **Packaging & CI:** Monorepo package inspector and deployment documentation.

- **CI/CD & Packaging:**
  - GitHub Actions workflow (`.github/workflows/ci.yml`) running typecheck, WCAG contrast tests, renderer tests, docs build, and package verification.
  - Local packaging verified via `npm pack` producing tarballs for all packages.
