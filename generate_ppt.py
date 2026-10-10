import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Brand Colors (InvoiceKit Tokens)
    C_PRIMARY = RGBColor(79, 70, 229)     # Indigo 600
    C_PRIMARY_DARK = RGBColor(49, 46, 129) # Indigo 900
    C_PRIMARY_LIGHT = RGBColor(238, 242, 255) # Indigo 50
    C_TEXT_DARK = RGBColor(15, 23, 42)    # Slate 900
    C_TEXT_MUTED = RGBColor(100, 116, 139) # Slate 500
    C_TEXT_BODY = RGBColor(51, 65, 85)    # Slate 700
    C_WHITE = RGBColor(255, 255, 255)
    C_BG_CARD = RGBColor(248, 250, 252)   # Slate 50
    C_BORDER = RGBColor(226, 232, 240)    # Slate 200
    C_ACCENT_GREEN = RGBColor(5, 150, 105) # Emerald 600
    C_ACCENT_ORANGE = RGBColor(217, 119, 6) # Amber 600

    logo_path = r"C:\Users\OM INGOLE\invoicekit\ssgmce-logo.png"

    def add_header(slide, title_text, category_text):
        # Top banner line
        top_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.12))
        top_bar.fill.solid()
        top_bar.fill.fore_color.rgb = C_PRIMARY
        top_bar.line.color.rgb = C_PRIMARY

        # Category / Section Pill
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.3))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = C_PRIMARY

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.65), Inches(9.5), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = C_TEXT_DARK

        # Top small college emblem / tag on right
        if os.path.exists(logo_path):
            slide.shapes.add_picture(logo_path, Inches(11.8), Inches(0.35), height=Inches(0.8))

        # Divider line
        div = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.5), Inches(11.733), Inches(0.02))
        div.fill.solid()
        div.fill.fore_color.rgb = C_BORDER
        div.line.color.rgb = C_BORDER

    def add_card(slide, x, y, w, h, bg_color=C_BG_CARD, border_color=C_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    # =========================================================================
    # SLIDE 1: Title & Introduction
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    bg1 = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = C_WHITE
    bg1.line.fill.background()

    # Left decorative brand strip
    strip = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(0.3), Inches(7.5))
    strip.fill.solid()
    strip.fill.fore_color.rgb = C_PRIMARY
    strip.line.fill.background()

    # College Logo
    if os.path.exists(logo_path):
        s1.shapes.add_picture(logo_path, Inches(1.0), Inches(0.8), height=Inches(1.3))

    # College Header
    col_box = s1.shapes.add_textbox(Inches(2.5), Inches(0.8), Inches(9.8), Inches(1.2))
    tf_col = col_box.text_frame
    p_c1 = tf_col.paragraphs[0]
    p_c1.text = "SHRI SANT GAJANAN MAHARAJ COLLEGE OF ENGINEERING, SHEGAON"
    p_c1.font.size = Pt(16)
    p_c1.font.bold = True
    p_c1.font.color.rgb = C_PRIMARY_DARK

    p_c2 = tf_col.add_paragraph()
    p_c2.text = "DEPARTMENT OF INFORMATION TECHNOLOGY | MAJOR ACADEMIC PROJECT"
    p_c2.font.size = Pt(11)
    p_c2.font.color.rgb = C_TEXT_MUTED
    p_c2.font.bold = True

    # Main Project Title Box
    title_card = add_card(s1, 1.0, 2.3, 11.333, 2.4, bg_color=C_PRIMARY_LIGHT, border_color=C_PRIMARY)
    tb_proj = s1.shapes.add_textbox(Inches(1.3), Inches(2.5), Inches(10.7), Inches(2.0))
    tf_p = tb_proj.text_frame
    tf_p.word_wrap = True

    p_p1 = tf_p.paragraphs[0]
    p_p1.text = "InvoiceKit"
    p_p1.font.size = Pt(36)
    p_p1.font.bold = True
    p_p1.font.color.rgb = C_PRIMARY

    p_p2 = tf_p.add_paragraph()
    p_p2.text = "Enterprise Shared Component Library & Universal Multi-Target Invoicing Engine"
    p_p2.font.size = Pt(18)
    p_p2.font.bold = True
    p_p2.font.color.rgb = C_TEXT_DARK

    p_p3 = tf_p.add_paragraph()
    p_p3.text = "Token-driven Design System • WCAG AA Accessibility Enforcement • Single-Template DOM, Vector PDF & Email Renderers • Indian GST Compliance"
    p_p3.font.size = Pt(12)
    p_p3.font.color.rgb = C_TEXT_MUTED

    # Candidate Profile & Evaluator Info Card
    add_card(s1, 1.0, 5.0, 5.5, 1.9, bg_color=C_BG_CARD)
    cand_box = s1.shapes.add_textbox(Inches(1.2), Inches(5.1), Inches(5.1), Inches(1.7))
    tf_cand = cand_box.text_frame
    p_can_h = tf_cand.paragraphs[0]
    p_can_h.text = "STUDENT DEVELOPER CREDENTIALS"
    p_can_h.font.size = Pt(10)
    p_can_h.font.bold = True
    p_can_h.font.color.rgb = C_PRIMARY

    p_can1 = tf_cand.add_paragraph()
    p_can1.text = "Name: Om Vijay Ingole"
    p_can1.font.size = Pt(13)
    p_can1.font.bold = True
    p_can1.font.color.rgb = C_TEXT_DARK

    p_can2 = tf_cand.add_paragraph()
    p_can2.text = "Branch: Information Technology (IT)"
    p_can2.font.size = Pt(12)
    p_can2.font.color.rgb = C_TEXT_BODY

    p_can3 = tf_cand.add_paragraph()
    p_can3.text = "Institution: Shri Sant Gajanan Maharaj College of Engg."
    p_can3.font.size = Pt(11)
    p_can3.font.color.rgb = C_TEXT_MUTED

    # Evaluation Rubric Card
    add_card(s1, 6.8, 5.0, 5.533, 1.9, bg_color=C_BG_CARD)
    ev_box = s1.shapes.add_textbox(Inches(7.0), Inches(5.1), Inches(5.1), Inches(1.7))
    tf_ev = ev_box.text_frame
    p_ev_h = tf_ev.paragraphs[0]
    p_ev_h.text = "EVALUATION DOMAINS ADDRESSED"
    p_ev_h.font.size = Pt(10)
    p_ev_h.font.bold = True
    p_ev_h.font.color.rgb = C_ACCENT_GREEN

    p_ev1 = tf_ev.add_paragraph()
    p_ev1.text = "✔ Architecture: Monorepo workspace decoupling tokens & UI"
    p_ev1.font.size = Pt(11)
    p_ev1.font.color.rgb = C_TEXT_BODY

    p_ev2 = tf_ev.add_paragraph()
    p_ev2.text = "✔ Innovation: Abstract multi-target driver pattern for PDF/DOM/Email"
    p_ev2.font.size = Pt(11)
    p_ev2.font.color.rgb = C_TEXT_BODY

    p_ev3 = tf_ev.add_paragraph()
    p_ev3.text = "✔ QA & Standards: 100% WCAG AA contrast ratio compliance"
    p_ev3.font.size = Pt(11)
    p_ev3.font.color.rgb = C_TEXT_BODY

    p_ev4 = tf_ev.add_paragraph()
    p_ev4.text = "✔ Industrial Fit: Indian GST (CGST/SGST/IGST), SAC & UPI systems"
    p_ev4.font.size = Pt(11)
    p_ev4.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 2: Problem Statement & Industrial Motivation
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_header(s2, "Problem Statement & Industry Motivation", "1. Research Context")

    add_card(s2, 0.8, 1.8, 5.6, 5.0)
    tb = s2.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "The Enterprise UI Drift Dilemma"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    points1 = [
        ("Redundant UI Re-implementation:", "In enterprise SaaS and billing software, different modules hand-roll their own buttons, tables, and modal dialogues, leading to high code bloat."),
        ("Visual & Accessibility Drift:", "Colors diverge across screens; contrast drops below legal WCAG thresholds (creating severe non-compliance liabilities)."),
        ("The Triplicate Bug Burden:", "When an input validation or table formatting bug is resolved on an invoice screen, it has to be patched 3 to 5 separate times across other portals."),
        ("Multi-Medium Fragmentation:", "Renderings diverge wildly: the screen view looks modern, but generated PDFs break pagination, and billing notification emails look distorted in Outlook/Gmail.")
    ]
    for h, b in points1:
        p_h = tf.add_paragraph()
        p_h.text = f"• {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(12)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(11)
        p_b.font.color.rgb = C_TEXT_MUTED

    add_card(s2, 6.8, 1.8, 5.733, 5.0)
    tb = s2.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Proposed Solution: The InvoiceKit Approach"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_ACCENT_GREEN

    points2 = [
        ("Single Source of Truth Design Tokens:", "All visual properties (palette, typography, 4px grid spacing, radii, elevation) live in an isolated @invoicekit/tokens package."),
        ("Zero-Drift 24-Component Suite:", "Strict TypeScript props contracts. Zero component-level hardcoded styles. Strictly tokenized primitives."),
        ("Universal Driver Pattern:", "A canonical renderInvoice(invoice, out) interface implemented across three outputs (DOM, PDF, Email HTML/ASCII)."),
        ("Automated Quality Assurance:", "Pre-commit WCAG AA color contrast math verification (&ge; 4.5:1) integrated into CI/CD pipelines.")
    ]
    for h, b in points2:
        p_h = tf.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(12)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(11)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 3: Project Objectives & Scope
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_header(s3, "Project Objectives & Scope of Work", "2. Project Specifications")

    cols = [
        ("1. Shared Component Library", [
            "Build 24+ enterprise UI primitives (Button, Table, Modal, Toast, Badge, Input, etc.).",
            "Export strict TypeScript interfaces for every prop.",
            "Token-driven styling with zero per-component visual drift.",
            "Complete interactive states (hover, focus, disabled, loading, error)."
        ]),
        ("2. Universal Invoice Engine", [
            "Define canonical Invoice data schema (Zod/TypeScript).",
            "Implement abstract InvoiceRendererOutput<T> interface.",
            "Output 1: Interactive responsive React DOM view.",
            "Output 2: Vector ISO A4 print-ready PDF (via jsPDF).",
            "Output 3: Responsive inline-CSS HTML email + ASCII plain-text."
        ]),
        ("3. Standards & Indian Localization", [
            "Automated WCAG AA relative luminance contrast audit (&ge; 4.5:1).",
            "Indian Rupee (₹ INR) Lakhs/Crores numbering format.",
            "15-digit GSTIN, 10-digit PAN, HSN/SAC code tracking.",
            "Dual GST modes (IGST vs CGST+SGST) and Indian Banking/UPI."
        ])
    ]

    for i, (title, items) in enumerate(cols):
        add_card(s3, 0.8 + i * 4.0, 1.8, 3.75, 5.0)
        tb = s3.shapes.add_textbox(Inches(1.0 + i * 4.0), Inches(2.0), Inches(3.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        for it in items:
            p_i = tf.add_paragraph()
            p_i.text = f"• {it}"
            p_i.font.size = Pt(11)
            p_i.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 4: System Architecture & Monorepo Hierarchy
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_header(s4, "System Architecture & Monorepo Hierarchy", "3. Architecture Design")

    # Flow Diagram Cards
    boxes = [
        ("Layer 1: @invoicekit/tokens", "The Foundation", "Defines color palettes, typography, spacing, WCAG 2.1 luminance algorithm, and CSS root variables.", 1.8),
        ("Layer 2: @invoicekit/ui", "Shared UI Primitives", "24 typed components consuming design tokens. Zero hardcoded CSS. Emits accessible UI primitives.", 3.0),
        ("Layer 3: @invoicekit/renderer", "Universal Invoicing Engine", "Dispatches canonical invoice data across DOM, Vector PDF, and Email HTML/ASCII drivers.", 4.2),
        ("Layer 4: @invoicekit/docs", "Playground & Studio App", "Interactive Storybook alternative, live 3-renderer preview, bank toggles, and WCAG auditor.", 5.4),
    ]

    for title, sub, desc, y_pos in boxes:
        add_card(s4, 0.8, y_pos, 7.5, 1.05)
        tb = s4.shapes.add_textbox(Inches(1.0), Inches(y_pos + 0.05), Inches(7.1), Inches(0.95))
        tf = tb.text_frame
        tf.word_wrap = True
        p1 = tf.paragraphs[0]
        p1.text = f"{title}  —  {sub}"
        p1.font.size = Pt(13)
        p1.font.bold = True
        p1.font.color.rgb = C_PRIMARY
        p2 = tf.add_paragraph()
        p2.text = desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = C_TEXT_BODY

    # Right side: Architecture Benefits Card
    add_card(s4, 8.6, 1.8, 3.933, 4.65)
    tb_r = s4.shapes.add_textbox(Inches(8.8), Inches(2.0), Inches(3.5), Inches(4.2))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p_rh = tf_r.paragraphs[0]
    p_rh.text = "Key Architectural Advantages"
    p_rh.font.size = Pt(14)
    p_rh.font.bold = True
    p_rh.font.color.rgb = C_ACCENT_GREEN

    advs = [
        ("Modular Boundaries:", "Tokens, UI, and renderers can be consumed independently or together."),
        ("Zero Bundler Lock-in:", "Vite, Next.js, or Remix can ingest packages without transpilation snags."),
        ("Local Distribution:", "Fully packaging-ready using npm workspaces and npm pack tarballs."),
        ("Type Integrity:", "Path-aliased TypeScript configuration guarantees zero 'any' leaks across workspaces.")
    ]
    for h, b in advs:
        p_h = tf_r.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf_r.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 5: Design Tokens & WCAG AA Contrast Enforcement
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_header(s5, "Design Tokens & WCAG AA Contrast Audit", "4. Accessibility & Tokens")

    add_card(s5, 0.8, 1.8, 5.6, 5.0)
    tb = s5.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Mathematical Contrast Formulation"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    math_points = [
        ("W3C Relative Luminance (L):", "Linearized sRGB channels:\nL = 0.2126 * R_lin + 0.7152 * G_lin + 0.0722 * B_lin"),
        ("Contrast Ratio Formulation:", "Ratio = (L1 + 0.05) / (L2 + 0.05)\nwhere L1 = lighter color, L2 = darker color."),
        ("W3C WCAG 2.1 AA Threshold:", "Normal Body Text: Ratio &ge; 4.5:1\nLarge Text (&ge;18pt / &ge;14pt bold): Ratio &ge; 3.0:1"),
        ("W3C WCAG 2.1 AAA Threshold:", "Normal Text: Ratio &ge; 7.0:1\nLarge Text: Ratio &ge; 4.5:1")
    ]
    for h, b in math_points:
        p_h = tf.add_paragraph()
        p_h.text = f"• {h}"
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"{b}"
        p_b.font.size = Pt(10.5)
        p_b.font.color.rgb = C_TEXT_BODY

    add_card(s5, 6.8, 1.8, 5.733, 5.0)
    tb2 = s5.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.5))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = "Automated Compliance Audit Matrix"
    p2.font.size = Pt(15)
    p2.font.bold = True
    p2.font.color.rgb = C_ACCENT_GREEN

    pairs = [
        ("Body Text (Slate-900 on White)", "#0F172A on #FFFFFF", "16.1:1", "PASS AAA"),
        ("Secondary Text (Slate-600 on White)", "#475569 on #FFFFFF", "7.0:1", "PASS AAA"),
        ("Primary Button (White on Indigo-600)", "#FFFFFF on #4F46E5", "5.9:1", "PASS AA"),
        ("Danger Button (White on Red-600)", "#FFFFFF on #DC2626", "4.6:1", "PASS AA"),
        ("Paid Badge (Emerald-800 on Emerald-100)", "#065F46 on #D1FAE5", "7.4:1", "PASS AAA"),
        ("Pending Badge (Amber-900 on Amber-100)", "#78350F on #FEF3C7", "7.8:1", "PASS AAA"),
        ("Overdue Badge (Red-800 on Red-100)", "#991B1B on #FEE2E2", "7.1:1", "PASS AAA")
    ]
    for name, hexes, rat, res in pairs:
        p_row = tf2.add_paragraph()
        p_row.text = f"✔ {name}\n   {hexes}  ➔  {rat} ({res})"
        p_row.font.size = Pt(10)
        p_row.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 6: Enterprise Component Suite (24 Components)
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_header(s6, "Shared Component Suite: 24 Enterprise Primitives", "5. Component Engineering")

    categories = [
        ("Forms & Inputs", [
            "Button (5 variants, 3 sizes, loading)",
            "Input (validation, error, icon slots)",
            "Textarea (multiline invoice notes)",
            "CurrencyInput (₹ INR prefix, precision)",
            "DatePicker (formatted dates)",
            "Select (accessible dropdown)",
            "Checkbox & Switch (toggle primitives)"
        ]),
        ("Data & Tables", [
            "Table (data grid with striping)",
            "TableHeader & TableBody",
            "TableRow & TableHead (align left/right)",
            "TableCell (monospace currency align)",
            "TableFooter (totals summation bar)",
            "Divider (horizontal/vertical labels)",
            "Kbd (shortcut key badges)"
        ]),
        ("Feedback & Modals", [
            "Modal (accessible dialog + ESC trap)",
            "Toast (context-driven auto-dismiss)",
            "Alert (system status banners)",
            "Badge (WCAG AA compliant status)",
            "StatusPill (dot-indicator lifecycle)",
            "Tooltip (hover/focus helper)",
            "Skeleton (loading placeholders)"
        ]),
        ("Surfaces & Nav", [
            "Card (outlined, elevated, flat)",
            "CardHeader & CardContent",
            "CardFooter (signatory sections)",
            "Tabs (TabsList, Trigger, Content)",
            "Avatar (image & initials fallback)",
            "EmptyState (zero-state illustrations)",
            "DropdownMenu (popup actions)"
        ])
    ]

    for i, (cat_name, comp_list) in enumerate(categories):
        add_card(s6, 0.8 + i * 3.0, 1.8, 2.75, 5.0)
        tb = s6.shapes.add_textbox(Inches(0.95 + i * 3.0), Inches(2.0), Inches(2.45), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = cat_name
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        for c in comp_list:
            p_c = tf.add_paragraph()
            p_c.text = f"• {c}"
            p_c.font.size = Pt(9.5)
            p_c.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 7: The Universal Invoicing Engine: Renderer Pattern
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_header(s7, "The Flagship Pattern: renderInvoice(invoice, out)", "6. Core Innovation")

    add_card(s7, 0.8, 1.8, 6.0, 5.0)
    tb_code = s7.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.6), Inches(4.5))
    tf_c = tb_code.text_frame
    tf_c.word_wrap = True
    p_ch = tf_c.paragraphs[0]
    p_ch.text = "Abstract Driver Contract & Dispatcher"
    p_ch.font.size = Pt(14)
    p_ch.font.bold = True
    p_ch.font.color.rgb = C_PRIMARY

    code_snip = """// 1. Abstract Renderer Interface
export interface InvoiceRendererOutput<T> {
  header(title, number, status, date, due, pos): void;
  parties(issuer: Party, client: Party): void;
  row(item: InvoiceItem, index: number): void;
  total(totals: InvoiceTotals): void;
  notes(notes?: string, terms?: string): void;
  footer(payment?: PaymentDetails): void;
  getResult(): T;
}

// 2. Canonical Dispatcher Function
export function renderInvoice<T>(
  invoice: Invoice, 
  out: InvoiceRendererOutput<T>
): T {
  out.header(...);
  out.parties(invoice.issuer, invoice.client);
  invoice.items.forEach((item, i) => out.row(item, i));
  out.total(invoice.totals);
  out.notes(invoice.notes, invoice.terms);
  out.footer(invoice.paymentDetails);
  return out.getResult();
}"""
    p_code = tf_c.add_paragraph()
    p_code.text = code_snip
    p_code.font.size = Pt(9.5)
    p_code.font.name = "Courier New"
    p_code.font.color.rgb = C_PRIMARY_DARK

    add_card(s7, 7.1, 1.8, 5.433, 5.0)
    tb_desc = s7.shapes.add_textbox(Inches(7.3), Inches(2.0), Inches(5.0), Inches(4.5))
    tf_d = tb_desc.text_frame
    tf_d.word_wrap = True
    p_dh = tf_d.paragraphs[0]
    p_dh.text = "Why Evaluators Value This Pattern"
    p_dh.font.size = Pt(14)
    p_dh.font.bold = True
    p_dh.font.color.rgb = C_ACCENT_GREEN

    pattern_benefits = [
        ("Decoupled Business Logic:", "Invoice data calculation (tax rates, discounts, totals) is completely detached from presentation logic."),
        ("Elimination of Duplicate Code:", "A single invoice object drives web display, client PDF downloads, and automated email receipts."),
        ("Open-Closed Principle (SOLID):", "Adding a 4th renderer (e.g. WhatsApp markdown or POS thermal receipt) requires zero changes to the core template!"),
        ("Synchronous & Vector Crisp:", "DOM uses React components, PDF uses vector coordinate geometry (jsPDF), and Email uses table-inline styles.")
    ]
    for h, b in pattern_benefits:
        p_h = tf_d.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf_d.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 8: Three Rendering Targets: DOM, PDF, and Email
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_header(s8, "Three Rendering Targets: DOM, Vector PDF & Email", "7. Multi-Target Outputs")

    targets = [
        ("Output 1: React DOM", "Interactive On-Screen UI", [
            "Driver: DOMInvoiceRenderer",
            "Returns: React.ReactElement",
            "Features:",
            "  • Rendered using @invoicekit/ui components",
            "  • Responsive card & table layout",
            "  • StatusPill & GST compliance badges",
            "  • Monospace right-aligned currency columns",
            "  • Interactive live bank & UPI details"
        ]),
        ("Output 2: Vector PDF", "ISO A4 Print-Ready Document", [
            "Driver: PDFInvoiceRenderer (jsPDF)",
            "Returns: { doc, download(), getBlobUrl() }",
            "Features:",
            "  • Standard ISO A4 (210 x 297 mm)",
            "  • Mathematical coordinate grid layout",
            "  • Brand accent bands & typography hierarchy",
            "  • Number formatted in Indian lakhs/thousands",
            "  • 1-Click direct client PDF download"
        ]),
        ("Output 3: Responsive Email", "HTML & ASCII Plain Text", [
            "Driver: EmailInvoiceRenderer",
            "Returns: { html: string, plainText: string }",
            "Features:",
            "  • Bulletproof inline-CSS <table> structure",
            "  • Compatible with Outlook, Gmail & Apple Mail",
            "  • Monospace ASCII plain-text fallback",
            "  • One-click copy HTML / Plain text triggers",
            "  • Integrated bank & instant UPI details"
        ])
    ]

    for i, (title, sub, bullet_list) in enumerate(targets):
        add_card(s8, 0.8 + i * 4.0, 1.8, 3.75, 5.0)
        tb = s8.shapes.add_textbox(Inches(1.0 + i * 4.0), Inches(2.0), Inches(3.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        p_s = tf.add_paragraph()
        p_s.text = sub
        p_s.font.size = Pt(11)
        p_s.font.color.rgb = C_TEXT_MUTED

        for b in bullet_list:
            p_b = tf.add_paragraph()
            p_b.text = b
            p_b.font.size = Pt(9.5)
            p_b.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 9: Indian Localization & GST Compliance Architecture
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_header(s9, "Indian Localization & GST Compliance Architecture", "8. Indian Market Specialization")

    india_cards = [
        ("Currency & Numbering", [
            "Primary Currency: Indian Rupee (₹ / INR)",
            "Numbering Scheme: Lakhs & Crores (en-IN formatting)",
            "Formatted example: ₹4,50,000.00 instead of 450,000.00",
            "CurrencyInput primitive with default ₹ prefix & INR code"
        ]),
        ("Indian GST Statutory Rules", [
            "15-Digit GSTIN: Mapped for both Supplier and Buyer",
            "10-Digit PAN: Permanent Account Number verification",
            "State & State Code: Karnataka (29), Maharashtra (27), etc.",
            "HSN/SAC Codes: Mandatory SAC 998311/998314 for IT & Services",
            "Dual GST Modes: Interstate (IGST 18%) vs Intrastate (CGST 9% + SGST 9%)"
        ]),
        ("Indian Banking & UPI Rails", [
            "Major Commercial Banks: HDFC Bank, SBI, ICICI, Axis, Kotak",
            "IFSC Codes: 11-character Indian Financial System Codes",
            "Account Categorization: Current A/C vs Savings A/C",
            "Instant UPI Payment: VPA (e.g. bharatcloud@okhdfcbank) with instant mobile payment settlement",
            "Legal Declarations: TDS Section 194J & local jurisdiction notice"
        ])
    ]

    for i, (title, items) in enumerate(india_cards):
        add_card(s9, 0.8 + i * 4.0, 1.8, 3.75, 5.0)
        tb = s9.shapes.add_textbox(Inches(1.0 + i * 4.0), Inches(2.0), Inches(3.35), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        for it in items:
            p_i = tf.add_paragraph()
            p_i.text = f"• {it}"
            p_i.font.size = Pt(10)
            p_i.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 10: Component Playground & Documentation App
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_header(s10, "Developer Experience: Playground & Documentation Site", "9. Tooling & DX")

    add_card(s10, 0.8, 1.8, 5.6, 5.0)
    tb = s10.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "The Storybook Alternative: @invoicekit/docs"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    features1 = [
        ("Zero Overhead Docs App:", "Built with Vite & React 18, providing sub-millisecond hot module reloading (HMR) without bulky Storybook dependencies."),
        ("Interactive Component Playground:", "Every single component out of the 24 primitives can be inspected live with toggles for loading, disabled, error states, and sizing."),
        ("Live Notification Triggers:", "Contextual Toast triggers (Success, Error, Warning, Info) and accessible Modal dialogues tested in real-time.")
    ]
    for h, b in features1:
        p_h = tf.add_paragraph()
        p_h.text = f"• {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    add_card(s10, 6.8, 1.8, 5.733, 5.0)
    tb2 = s10.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.5))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = "Integrated Studio & WCAG Inspector"
    p2.font.size = Pt(15)
    p2.font.bold = True
    p2.font.color.rgb = C_ACCENT_GREEN

    features2 = [
        ("The Invoice Studio:", "Allows real-time toggling of Indian bank accounts (HDFC, SBI, ICICI, etc.), GST modes (IGST vs CGST/SGST), and discounts."),
        ("Interactive WCAG AA Inspector:", "Users can input arbitrary Foreground and Background Hex colors to calculate the exact W3C contrast ratio and view live pass/fail badges."),
        ("One-Click Export:", "Direct triggers for downloading vector PDF invoices and copying bulletproof inline-CSS email HTML.")
    ]
    for h, b in features2:
        p_h = tf2.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf2.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 11: Testing, Verification & Quality Assurance
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_header(s11, "Testing, Verification & Quality Assurance", "10. Validation & QA")

    tests = [
        ("1. WCAG AA Contrast Testing", "packages/tokens/src/contrast.test.ts", [
            "Automated test asserting all default design tokens exceed 4.5:1 ratio.",
            "Validates black/white standard (21:1).",
            "Guarantees failing pairs (< 4.5:1) are rejected.",
            "Result: 100% PASS (3 of 3 tests passing in 2ms)"
        ]),
        ("2. Multi-Renderer Engine Testing", "packages/renderer/src/renderer.test.ts", [
            "Validates DOMInvoiceRenderer output generation.",
            "Validates PDFInvoiceRenderer vector doc & download function.",
            "Validates EmailInvoiceRenderer HTML & ASCII output with GSTIN, IFSC, and UPI fields.",
            "Result: 100% PASS (3 of 3 tests passing in 22ms)"
        ]),
        ("3. Static Type Checking", "TypeScript 5.7.2 (tsc --noEmit)", [
            "Global strict typing across monorepo workspace.",
            "Zero 'any' leaks in event handlers and component props.",
            "Path alias resolution mapped across packages.",
            "Result: 0 ERRORS (Clean compilation exit code 0)"
        ]),
        ("4. Package Integrity", "npm pack verification", [
            "Verifies standalone packaging of all 3 libraries.",
            "Generated: invoicekit-tokens-1.0.0.tgz (3.6 kB)",
            "Generated: invoicekit-ui-1.0.0.tgz (10.9 kB)",
            "Generated: invoicekit-renderer-1.0.0.tgz (7.9 kB)"
        ])
    ]

    for i, (title, file_name, bullets) in enumerate(tests):
        add_card(s11, 0.8 + i * 3.0, 1.8, 2.75, 5.0)
        tb = s11.shapes.add_textbox(Inches(0.95 + i * 3.0), Inches(2.0), Inches(2.45), Inches(4.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        p_f = tf.add_paragraph()
        p_f.text = file_name
        p_f.font.size = Pt(8.5)
        p_f.font.color.rgb = C_TEXT_MUTED

        for b in bullets:
            p_b = tf.add_paragraph()
            p_b.text = f"• {b}"
            p_b.font.size = Pt(9.5)
            p_b.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 12: CI/CD Pipeline & Packaging Strategy
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_header(s12, "CI/CD Pipeline & Packaging Strategy", "11. DevOps & Release")

    add_card(s12, 0.8, 1.8, 5.6, 5.0)
    tb = s12.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(5.2), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "GitHub Actions CI Workflow (.github/workflows/ci.yml)"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    steps = [
        ("Step 1: Checkout & Cache", "actions/checkout@v4 and actions/setup-node@v4 with automated npm caching."),
        ("Step 2: Clean Dependency Install", "npm ci ensuring exact dependency lockfile parity."),
        ("Step 3: Static Typecheck Gate", "npm run typecheck (tsc --noEmit) catches prop mismatches across workspaces."),
        ("Step 4: Automated Testing Suite", "npm test executes Vitest contrast calculations and renderer assertions."),
        ("Step 5: Production Build", "npm run build bundles docs and packages via Vite."),
        ("Step 6: Tarball Packaging Gate", "npm pack validates that all three packages can be published to npm or local registries.")
    ]
    for h, b in steps:
        p_h = tf.add_paragraph()
        p_h.text = f"• {h}: "
        p_h.font.bold = True
        p_h.font.size = Pt(10.5)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(9.5)
        p_b.font.color.rgb = C_TEXT_MUTED

    add_card(s12, 6.8, 1.8, 5.733, 5.0)
    tb2 = s12.shapes.add_textbox(Inches(7.0), Inches(2.0), Inches(5.3), Inches(4.5))
    tf2 = tb2.text_frame
    tf2.word_wrap = True
    p2 = tf2.paragraphs[0]
    p2.text = "Versioning, Release & Distribution"
    p2.font.size = Pt(14)
    p2.font.bold = True
    p2.font.color.rgb = C_ACCENT_GREEN

    dist_points = [
        ("Semantic Versioning (SemVer):", "Adheres to v1.0.0 standards with breaking change boundaries."),
        ("Comprehensive CHANGELOG.md:", "Full release notes documenting token systems, 24 components, and Indian GST features."),
        ("Workspace Inter-linking:", "pnpm/npm workspace:* protocol allows packages to import sibling libraries directly during active development."),
        ("Consumer Integration:", "Enterprises can install either via internal Verdaccio / Artifactory or local npm link / npm pack.")
    ]
    for h, b in dist_points:
        p_h = tf2.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf2.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 13: Future Enhancements & Commercial Applications
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    add_header(s13, "Future Scope & Commercial Applications", "12. Road Ahead")

    futures = [
        ("Direct Indian IRP Portal Sync", [
            "Direct API integration with the Indian GST E-Invoicing IRP portal (NIC / ClearTax APIs).",
            "Automatic generation and embedding of digitally signed QR codes and 64-character IRNs (Invoice Reference Numbers)."
        ]),
        ("Dynamic UPI QR Payment Codes", [
            "Embedding dynamic Bharat UPI QR codes directly onto PDFs and emails.",
            "Pre-filled amount and invoice reference enabling instant 1-scan mobile settlement via GPay / PhonePe / Paytm."
        ]),
        ("Multi-State E-Way Bill Generation", [
            "Automatic distance-based E-Way bill generation for consignments exceeding statutory thresholds.",
            "Automated vehicle number tracking and consignment delivery acknowledgment."
        ]),
        ("Commercial SaaS Monorepo Distribution", [
            "Publishing as an open-source headless UI library with optional enterprise support.",
            "Pre-built integrations for Tally ERP, Zoho Books, and SAP Business One."
        ])
    ]

    for i, (title, items) in enumerate(futures):
        row = i // 2
        col = i % 2
        x = 0.8 + col * 5.95
        y = 1.8 + row * 2.5
        add_card(s13, x, y, 5.7, 2.3)
        tb = s13.shapes.add_textbox(Inches(x + 0.2), Inches(y + 0.2), Inches(5.3), Inches(1.9))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"Phase {i+1}: {title}"
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = C_PRIMARY

        for it in items:
            p_i = tf.add_paragraph()
            p_i.text = f"• {it}"
            p_i.font.size = Pt(10)
            p_i.font.color.rgb = C_TEXT_BODY

    # =========================================================================
    # SLIDE 14: Conclusion & Project Defense Summary
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    add_header(s14, "Conclusion & Project Defense Summary", "13. Conclusion")

    add_card(s14, 0.8, 1.8, 7.5, 5.0)
    tb = s14.shapes.add_textbox(Inches(1.0), Inches(2.0), Inches(7.1), Inches(4.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "Summary of Project Achievements"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = C_PRIMARY

    conclusions = [
        ("Problem Solved:", "Eliminated enterprise UI drift and redundant bug fixing by unifying design tokens across 24 typed components."),
        ("Innovative Renderer Architecture:", "Successfully realized the 'One source of truth, three renderers' paradigm, delivering pixel-accurate React DOM, vector ISO A4 PDF, and inline HTML email from a single template."),
        ("Strict Accessibility Adherence:", "100% of component text/background pairs pass WCAG 2.1 AA (&ge; 4.5:1) verified via automated mathematical tests."),
        ("Production Indian Localization:", "Engineered specifically for Indian business software with full GSTIN, PAN, SAC codes, Indian banking (HDFC/SBI/ICICI), and UPI integration."),
        ("DevOps Excellence:", "Complete GitHub Actions CI pipeline, zero TypeScript errors, and verified npm package distribution.")
    ]
    for h, b in conclusions:
        p_h = tf.add_paragraph()
        p_h.text = f"✔ {h} "
        p_h.font.bold = True
        p_h.font.size = Pt(11)
        p_h.font.color.rgb = C_TEXT_DARK
        p_b = tf.add_paragraph()
        p_b.text = f"  {b}"
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED

    # Right Card: Student Signoff
    add_card(s14, 8.6, 1.8, 3.933, 5.0, bg_color=C_PRIMARY_LIGHT, border_color=C_PRIMARY)
    tb_sign = s14.shapes.add_textbox(Inches(8.8), Inches(2.2), Inches(3.5), Inches(4.2))
    tf_s = tb_sign.text_frame
    tf_s.word_wrap = True

    p_thx = tf_s.paragraphs[0]
    p_thx.text = "Thank You!"
    p_thx.font.size = Pt(28)
    p_thx.font.bold = True
    p_thx.font.color.rgb = C_PRIMARY

    p_qa = tf_s.add_paragraph()
    p_qa.text = "Questions & Evaluator Discussion"
    p_qa.font.size = Pt(14)
    p_qa.font.bold = True
    p_qa.font.color.rgb = C_TEXT_DARK

    p_cinfo = tf_s.add_paragraph()
    p_cinfo.text = "\nProject Author:\nOm Vijay Ingole\nB.Tech — Information Technology\n\nInstitution:\nShri Sant Gajanan Maharaj College of Engineering (SSGMCE), Shegaon\n\nRepository:\nInvoiceKit Monorepo v1.0.0"
    p_cinfo.font.size = Pt(11)
    p_cinfo.font.color.rgb = C_TEXT_BODY

    # Save presentation
    output_pptx = r"C:\Users\OM INGOLE\invoicekit\InvoiceKit_Project_Presentation.pptx"
    prs.save(output_pptx)
    print(f"Presentation saved successfully to {output_pptx}")

if __name__ == "__main__":
    create_presentation()
