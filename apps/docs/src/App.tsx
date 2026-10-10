import React, { useState, useMemo } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Modal,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  useToast,
  Text,
  CurrencyInput,
  DatePicker,
  Checkbox,
  Switch,
  Tooltip,
  Divider,
  Avatar,
  Skeleton,
  EmptyState,
  StatusPill,
  Kbd,
  Alert,
  DropdownMenu,
} from '@invoicekit/ui';
import {
  colors,
  spacing,
  radii,
  evaluateContrast,
  defaultComponentTokenPairs,
} from '@invoicekit/tokens';
import {
  renderInvoice,
  DOMInvoiceRenderer,
  PDFInvoiceRenderer,
  EmailInvoiceRenderer,
  sampleInvoice,
  Invoice,
  InvoiceStatusType,
} from '@invoicekit/renderer';

export default function App() {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<'studio' | 'components' | 'wcag' | 'package'>('studio');

  // Indian Banks Preset
  const indianBanks = [
    { name: 'HDFC Bank Limited', ifsc: 'HDFC0000060', branch: 'Koramangala, Bengaluru', upi: 'bharatcloud@okhdfcbank' },
    { name: 'State Bank of India (SBI)', ifsc: 'SBIN0001234', branch: 'MG Road, Bengaluru', upi: 'bharatcloud@oksbi' },
    { name: 'ICICI Bank Limited', ifsc: 'ICIC0000104', branch: 'Indiranagar, Bengaluru', upi: 'bharatcloud@icici' },
    { name: 'Axis Bank Limited', ifsc: 'UTIB0000054', branch: 'Koramangala, Bengaluru', upi: 'bharatcloud@axisbank' },
    { name: 'Kotak Mahindra Bank', ifsc: 'KKBK0000651', branch: 'Lavelle Road, Bengaluru', upi: 'bharatcloud@kotak' },
  ];

  // Studio State
  const [invoiceStatus, setInvoiceStatus] = useState<InvoiceStatusType>('pending');
  const [invoiceCurrency, setInvoiceCurrency] = useState('INR');
  const [hasDiscount, setHasDiscount] = useState(true);
  const [selectedBankIdx, setSelectedBankIdx] = useState(0);
  const [isInterstateGst, setIsInterstateGst] = useState(true);
  const [customNotes, setCustomNotes] = useState(sampleInvoice.notes || '');
  const [emailSubTab, setEmailSubTab] = useState<'preview' | 'html' | 'plaintext'>('preview');

  // Component Playground State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [demoInputVal, setDemoInputVal] = useState('Bharat Cloud Technologies Pvt. Ltd.');
  const [demoAmount, setDemoAmount] = useState('180000.00');

  // Contrast Calculator State
  const [customFg, setCustomFg] = useState('#4F46E5');
  const [customBg, setCustomBg] = useState('#FFFFFF');

  // Active Invoice Data
  const currentInvoice: Invoice = useMemo(() => {
    const baseSubtotal = 450000;
    const discount = hasDiscount ? 25000 : 0;
    const taxRate = 18;
    const taxable = baseSubtotal - discount;
    const taxAmount = (taxable * taxRate) / 100;
    const total = taxable + taxAmount;
    const activeBank = indianBanks[selectedBankIdx] || indianBanks[0];

    return {
      ...sampleInvoice,
      status: invoiceStatus,
      notes: customNotes,
      paymentDetails: {
        ...sampleInvoice.paymentDetails,
        bankName: activeBank.name,
        ifscCode: activeBank.ifsc,
        branch: activeBank.branch,
        upiId: activeBank.upi,
      },
      totals: {
        ...sampleInvoice.totals,
        currency: invoiceCurrency,
        subtotal: baseSubtotal,
        discount,
        taxRate,
        taxAmount,
        isInterstate: isInterstateGst,
        igstAmount: isInterstateGst ? taxAmount : 0,
        cgstAmount: isInterstateGst ? 0 : taxAmount / 2,
        sgstAmount: isInterstateGst ? 0 : taxAmount / 2,
        total,
      },
    };
  }, [invoiceStatus, invoiceCurrency, hasDiscount, selectedBankIdx, isInterstateGst, customNotes]);

  // Execute 3 Renderers from single invoice model
  const domRenderResult = useMemo(() => {
    const r = new DOMInvoiceRenderer();
    return renderInvoice(currentInvoice, r);
  }, [currentInvoice]);

  const pdfRenderResult = useMemo(() => {
    const r = new PDFInvoiceRenderer();
    return renderInvoice(currentInvoice, r);
  }, [currentInvoice]);

  const emailRenderResult = useMemo(() => {
    const r = new EmailInvoiceRenderer();
    return renderInvoice(currentInvoice, r);
  }, [currentInvoice]);

  const customContrast = useMemo(() => {
    try {
      return evaluateContrast(customFg, customBg);
    } catch {
      return null;
    }
  }, [customFg, customBg]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} Copied`, 'Copied content to clipboard successfully.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: colors.neutral[50] }}>
      {/* Top Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.neutral[200]}`,
          padding: `${spacing[3]} ${spacing[6]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: radii.md,
              backgroundColor: colors.primary[600],
              color: colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          >
            IK
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: colors.neutral[900] }}>InvoiceKit</span>
              <Badge variant="info" size="sm">v1.0.0</Badge>
              <Badge variant="success" size="sm">by OM INGOLE</Badge>
            </div>
            <span style={{ fontSize: '0.75rem', color: colors.neutral[600] }}>
              Designed &amp; Developed by <strong>OM INGOLE</strong> • 2nd Year IT @ SSGMCE
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div style={{ display: 'flex', gap: spacing[1], backgroundColor: colors.neutral[100], padding: '3px', borderRadius: radii.lg }}>
          {[
            { id: 'studio', label: '⚡ Invoice Studio' },
            { id: 'components', label: '🧩 Components (24)' },
            { id: 'wcag', label: '♿ WCAG AA Audit' },
            { id: 'package', label: '📦 Package & CI' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              style={{
                padding: `${spacing[1.5]} ${spacing[3.5]}`,
                borderRadius: radii.md,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: activeView === tab.id ? 600 : 500,
                backgroundColor: activeView === tab.id ? colors.white : 'transparent',
                color: activeView === tab.id ? colors.neutral[900] : colors.neutral[600],
                boxShadow: activeView === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 120ms ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Workspace Body */}
      <main style={{ flex: 1, padding: `${spacing[8]} ${spacing[6]}`, maxWidth: '1360px', width: '100%', margin: '0 auto' }}>
        {/* VIEW 1: INVOICE STUDIO (THE 3 RENDERERS) */}
        {activeView === 'studio' && (
          <div>
            {/* Intro Hero Banner */}
            <div style={{ marginBottom: spacing[6] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: spacing[4] }}>
                <div>
                  <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: colors.neutral[900] }}>
                    Universal Invoicing Engine
                  </h1>
                  <p style={{ margin: `${spacing[1]} 0 0 0`, color: colors.neutral[600], fontSize: '0.9375rem' }}>
                    <strong>One source of truth, three renderers.</strong> The exact architecture powering scalable business tools:
                    a single invoice data model dispatches to interactive React DOM, print-ready vector PDF, and inline HTML / plain-text email.
                  </p>
                </div>

                {/* Quick Controls */}
                <Card variant="flat" style={{ padding: spacing[3], display: 'flex', gap: spacing[3], alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.neutral[600] }}>Status:</span>
                    <select
                      value={invoiceStatus}
                      onChange={(e) => setInvoiceStatus(e.target.value as any)}
                      style={{ padding: '4px 8px', borderRadius: radii.md, border: `1px solid ${colors.neutral[300]}`, fontSize: '0.8125rem' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.neutral[600] }}>Currency:</span>
                    <select
                      value={invoiceCurrency}
                      onChange={(e) => setInvoiceCurrency(e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: radii.md, border: `1px solid ${colors.neutral[300]}`, fontSize: '0.8125rem' }}
                    >
                      <option value="INR">INR (₹ Indian Rupee)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.neutral[600] }}>Bank (India):</span>
                    <select
                      value={selectedBankIdx}
                      onChange={(e) => setSelectedBankIdx(Number(e.target.value))}
                      style={{ padding: '4px 8px', borderRadius: radii.md, border: `1px solid ${colors.neutral[300]}`, fontSize: '0.8125rem' }}
                    >
                      {indianBanks.map((b, i) => (
                        <option key={i} value={i}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: colors.neutral[600] }}>GST Mode:</span>
                    <select
                      value={isInterstateGst ? 'interstate' : 'intrastate'}
                      onChange={(e) => setIsInterstateGst(e.target.value === 'interstate')}
                      style={{ padding: '4px 8px', borderRadius: radii.md, border: `1px solid ${colors.neutral[300]}`, fontSize: '0.8125rem' }}
                    >
                      <option value="interstate">Interstate (18% IGST)</option>
                      <option value="intrastate">Intrastate (9% CGST + 9% SGST)</option>
                    </select>
                  </div>

                  <Switch
                    checked={hasDiscount}
                    onChange={setHasDiscount}
                    label="Discount (-₹25k)"
                  />
                </Card>
              </div>
            </div>

            {/* Three Renderers Tabbed Showcase */}
            <Tabs defaultValue="dom">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[4] }}>
                <TabsList>
                  <TabsTrigger value="dom">
                    💻 1. React DOM (Interactive)
                  </TabsTrigger>
                  <TabsTrigger value="pdf">
                    📄 2. Print-Ready PDF
                  </TabsTrigger>
                  <TabsTrigger value="email">
                    ✉️ 3. Email (HTML & ASCII)
                  </TabsTrigger>
                </TabsList>

                {/* Action Shortcuts */}
                <div style={{ display: 'flex', gap: spacing[2] }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      pdfRenderResult.download(`Invoice-${currentInvoice.number}.pdf`);
                      toast.success('PDF Download Started', `Generating vector PDF for ${currentInvoice.number}`);
                    }}
                  >
                    ⬇️ Download PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      copyToClipboard(emailRenderResult.html, 'Email HTML');
                    }}
                  >
                    📋 Copy Email HTML
                  </Button>
                </div>
              </div>

              {/* RENDERER 1: REACT DOM */}
              <TabsContent value="dom">
                <div style={{ backgroundColor: colors.neutral[100], padding: spacing[6], borderRadius: radii.xl }}>
                  <div style={{ marginBottom: spacing[3], display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text variant="caption" color={colors.neutral[600]}>
                      RENDERED BY: <Kbd>DOMInvoiceRenderer</Kbd> • Consumes <code>@invoicekit/ui</code> components
                    </Text>
                    <Badge variant="success" size="sm">Live DOM Component</Badge>
                  </div>
                  {domRenderResult}
                </div>
              </TabsContent>

              {/* RENDERER 2: PRINT-READY PDF */}
              <TabsContent value="pdf">
                <Card variant="outlined" style={{ padding: spacing[8] }}>
                  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ fontSize: '3rem', marginBottom: spacing[2] }}>📄</div>
                    <Text variant="h3">Print-Ready Vector PDF Engine</Text>
                    <Text variant="body" color={colors.neutral[600]} style={{ marginTop: spacing[2] }}>
                      Built using <code>PDFInvoiceRenderer</code> powered by <code>jsPDF</code>. Generates crisp, standard A4 vector documents with custom typography, brand accent bands, calculated layout coordinates, zebra-striped line tables, and payment instructions.
                    </Text>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: spacing[3], marginTop: spacing[6] }}>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => {
                          pdfRenderResult.download(`Invoice-${currentInvoice.number}.pdf`);
                          toast.success('Downloaded PDF', `Saved Invoice-${currentInvoice.number}.pdf`);
                        }}
                      >
                        📥 Download Vector PDF File
                      </Button>
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                          const url = pdfRenderResult.getBlobUrl();
                          window.open(url, '_blank');
                        }}
                      >
                        🔍 Open in New Tab
                      </Button>
                    </div>

                    <div style={{ marginTop: spacing[8], textAlign: 'left', backgroundColor: colors.neutral[50], padding: spacing[4], borderRadius: radii.lg }}>
                      <Text variant="caption" weight="semibold" color={colors.neutral[700]}>PDF ENGINE SPECIFICATIONS:</Text>
                      <ul style={{ margin: `${spacing[2]} 0 0 0`, paddingLeft: spacing[4], fontSize: '0.8125rem', color: colors.neutral[600], lineHeight: 1.6 }}>
                        <li>Format: Standard ISO A4 (210mm x 297mm) Portrait</li>
                        <li>Typography: Scaled Helvetica with custom weights and point-size hierarchies</li>
                        <li>Color Scheme: Synced with <code>@invoicekit/tokens</code> (Indigo-600 #4F46E5 & Slate neutrals)</li>
                        <li>Table Rendering: Dynamic item calculation, right-aligned currency math, zebra striping</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* RENDERER 3: EMAIL (HTML & PLAIN TEXT) */}
              <TabsContent value="email">
                <Card variant="outlined">
                  <CardHeader style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <CardTitle>Email Invoice Renderer</CardTitle>
                      <CardDescription>Email-client bulletproof inline CSS HTML & ASCII Plain Text</CardDescription>
                    </div>
                    <div style={{ display: 'flex', gap: spacing[2] }}>
                      <Button
                        variant={emailSubTab === 'preview' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setEmailSubTab('preview')}
                      >
                        Visual Preview
                      </Button>
                      <Button
                        variant={emailSubTab === 'html' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setEmailSubTab('html')}
                      >
                        HTML Code
                      </Button>
                      <Button
                        variant={emailSubTab === 'plaintext' ? 'primary' : 'secondary'}
                        size="sm"
                        onClick={() => setEmailSubTab('plaintext')}
                      >
                        ASCII Plain Text
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {emailSubTab === 'preview' && (
                      <div style={{ backgroundColor: colors.neutral[100], padding: spacing[6], borderRadius: radii.lg }}>
                        <div style={{ maxWidth: '640px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: radii.lg, overflow: 'hidden' }}>
                          <iframe
                            title="Email Preview"
                            srcDoc={emailRenderResult.html}
                            style={{ width: '100%', height: '620px', border: 'none', backgroundColor: '#FFFFFF' }}
                          />
                        </div>
                      </div>
                    )}

                    {emailSubTab === 'html' && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: spacing[2] }}>
                          <Button size="sm" variant="secondary" onClick={() => copyToClipboard(emailRenderResult.html, 'Raw HTML')}>
                            Copy Raw HTML
                          </Button>
                        </div>
                        <pre
                          style={{
                            backgroundColor: colors.neutral[900],
                            color: colors.neutral[100],
                            padding: spacing[4],
                            borderRadius: radii.lg,
                            overflowX: 'auto',
                            maxHeight: '480px',
                            fontSize: '0.8125rem',
                          }}
                        >
                          {emailRenderResult.html}
                        </pre>
                      </div>
                    )}

                    {emailSubTab === 'plaintext' && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: spacing[2] }}>
                          <Button size="sm" variant="secondary" onClick={() => copyToClipboard(emailRenderResult.plainText, 'ASCII Text')}>
                            Copy Plain Text
                          </Button>
                        </div>
                        <pre
                          style={{
                            backgroundColor: colors.neutral[900],
                            color: '#34D399',
                            padding: spacing[4],
                            borderRadius: radii.lg,
                            overflowX: 'auto',
                            maxHeight: '480px',
                            fontSize: '0.8125rem',
                            fontFamily: 'monospace',
                            lineHeight: 1.4,
                          }}
                        >
                          {emailRenderResult.plainText}
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* VIEW 2: COMPONENT PLAYGROUND (24 ENTERPRISE PRIMITIVES) */}
        {activeView === 'components' && (
          <div>
            <div style={{ marginBottom: spacing[6] }}>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: colors.neutral[900] }}>
                Shared Component Library Playground
              </h1>
              <p style={{ margin: `${spacing[1]} 0 0 0`, color: colors.neutral[600] }}>
                Every component is token-driven (zero design drift), strictly typed with exported TypeScript interfaces, and audited for WCAG AA compliance.
              </p>
            </div>

            {/* Playground Interactive Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: spacing[6] }}>
              {/* 1. BUTTONS */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>1. Button</CardTitle>
                  <CardDescription>Variants, sizes, loading & disabled states</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                    <Button variant="primary" isLoading={btnLoading} disabled={btnDisabled}>Primary</Button>
                    <Button variant="secondary" disabled={btnDisabled}>Secondary</Button>
                    <Button variant="outline" disabled={btnDisabled}>Outline</Button>
                    <Button variant="ghost" disabled={btnDisabled}>Ghost</Button>
                    <Button variant="danger" disabled={btnDisabled}>Danger</Button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div style={{ display: 'flex', gap: spacing[4], paddingTop: spacing[2], borderTop: `1px solid ${colors.neutral[200]}` }}>
                    <Switch checked={btnLoading} onChange={setBtnLoading} label="Toggle Loading" />
                    <Switch checked={btnDisabled} onChange={setBtnDisabled} label="Toggle Disabled" />
                  </div>
                </CardContent>
              </Card>

              {/* 2. INPUTS & TEXTAREA */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>2. Input & Textarea</CardTitle>
                  <CardDescription>With labels, helper texts, validation errors, and icon slots</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                  <Input
                    label="Customer Organization (Buyer)"
                    value={demoInputVal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoInputVal(e.target.value)}
                    helperText="Legal registered entity appearing on GST tax invoice"
                  />
                  <Input
                    label="GSTIN (Goods & Services Tax ID)"
                    defaultValue="27AAACA9876K1Z2"
                    helperText="15-digit alphanumeric Indian GST identifier (Maharashtra State Code: 27)"
                  />
                  <Textarea
                    label="Payment Terms & Notes"
                    defaultValue="Subject to Bengaluru jurisdiction. RTGS/NEFT/IMPS or UPI accepted."
                    rows={2}
                  />
                </CardContent>
              </Card>

              {/* 3. CURRENCY & DATEPICKER */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>3. CurrencyInput & DatePicker</CardTitle>
                  <CardDescription>Domain-specific inputs formatted for Indian Rupees (₹) and dates</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                  <CurrencyInput
                    label="Taxable Rate / Milestone Price (₹)"
                    currencySymbol="₹"
                    currencyCode="INR"
                    value={demoAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoAmount(e.target.value)}
                  />
                  <DatePicker
                    label="Payment Due Date"
                    defaultValue="2026-11-06"
                  />
                </CardContent>
              </Card>

              {/* 4. SELECT & DROPDOWN */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>4. Select & DropdownMenu</CardTitle>
                  <CardDescription>Accessible selection and Indian billing actions</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
                  <Select
                    label="Indian GST Tax Bracket"
                    options={[
                      { label: '18% GST (Standard Services & IT/SaaS - SAC 9983)', value: '18' },
                      { label: '12% GST (Standard Business Goods)', value: '12' },
                      { label: '5% GST (Concessional / Essential)', value: '5' },
                      { label: '28% GST (Luxury / Specified)', value: '28' },
                      { label: '0% / Exempted (Export / SEZ Supply)', value: '0' },
                    ]}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text variant="body-sm" color={colors.neutral[600]}>GST & Billing Actions:</Text>
                    <DropdownMenu
                      trigger={<Button variant="secondary" size="sm">Actions ▾</Button>}
                      items={[
                        { label: 'Record UPI Payment', onClick: () => toast.success('UPI Payment Recorded', '₹5,01,500 settled via bharatcloud@okhdfcbank.') },
                        { label: 'Verify GSTIN on Portal', onClick: () => toast.info('GSTIN Verified', 'Active taxpayer registered in Maharashtra.') },
                        { label: 'Generate E-Way Bill', onClick: () => toast.info('E-Way Bill', 'E-Way bill generated successfully.') },
                        { label: 'Duplicate Tax Invoice', onClick: () => toast.info('Duplicated', 'Created copy as INV/2026-27/0143.') },
                        { label: 'Cancel Invoice', danger: true, onClick: () => toast.error('Cancelled', 'Invoice marked as cancelled.') },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* 5. BADGES & STATUS PILLS */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>5. Badge & StatusPill</CardTitle>
                  <CardDescription>Lifecycle states matching WCAG AA contrast standards</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                    <Badge variant="success" dot>Paid</Badge>
                    <Badge variant="warning" dot>Pending</Badge>
                    <Badge variant="danger" dot>Overdue</Badge>
                    <Badge variant="info" dot>Draft</Badge>
                    <Badge variant="neutral">Archived</Badge>
                  </div>
                  <Divider label="Compact Status Pills" />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                    <StatusPill status="paid" />
                    <StatusPill status="pending" />
                    <StatusPill status="overdue" />
                    <StatusPill status="draft" />
                    <StatusPill status="cancelled" />
                  </div>
                </CardContent>
              </Card>

              {/* 6. TOAST NOTIFICATIONS */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>6. Toast Notifications</CardTitle>
                  <CardDescription>Context-driven notification toasts with auto-dismiss</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                  <Button size="sm" variant="outline" onClick={() => toast.success('Payment Received', '₹5,01,500.00 settled via HDFC Bank / UPI.')}>
                    ✓ Success Toast
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.error('Payment Overdue', 'Invoice INV/2026-27/0142 is overdue by 5 days.')}>
                    ✕ Error Toast
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.warning('GST Filing Reminder', 'GSTR-1 filing due by 11th of the month.')}>
                    ⚠ Warning Toast
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toast.info('IRN Generated', 'E-Invoice QR & Ack No signed by IRP portal.')}>
                    ℹ Info Toast
                  </Button>
                </CardContent>
              </Card>

              {/* 7. MODAL DIALOG */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>7. Modal Dialog</CardTitle>
                  <CardDescription>Accessible dialog with focus trap & ESC listener</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Dispatch Tax Invoice Modal
                  </Button>

                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title="Dispatch Tax Invoice to Buyer"
                    description="Send an automated email with GST-compliant PDF invoice & UPI payment link."
                    footer={
                      <>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            setIsModalOpen(false);
                            toast.success('Tax Invoice Dispatched', 'Sent to accounts@apexretail.in with UPI link');
                          }}
                        >
                          Send Invoice
                        </Button>
                      </>
                    }
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                      <Input label="Recipient Email" defaultValue="accounts@apexretail.in" />
                      <Input label="Email Subject" defaultValue="Tax Invoice INV/2026-27/0142 from Bharat Cloud Technologies" />
                      <Textarea label="Personalized Message" defaultValue="Dear Finance Team, please find attached the GST tax invoice for completed milestones. Settle via RTGS/NEFT or UPI." rows={3} />
                    </div>
                  </Modal>
                </CardContent>
              </Card>

              {/* 8. ALERTS & EMPTY STATE */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>8. Alert & EmptyState</CardTitle>
                  <CardDescription>System banners and zero-state placeholders</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                  <Alert tone="info" title="E-Invoicing & GSTR-1 Compliance">
                    B2B invoices generated by this system comply with E-Invoicing schema (INV-01) for Indian GST portals.
                  </Alert>
                  <Alert tone="warning" title="TDS Section 194J Notice">
                    Buyer may deduct 2% TDS on professional/technical services under Indian Income Tax Act.
                  </Alert>
                </CardContent>
              </Card>

              {/* 9. AVATAR, SKELETON, KBD, TOOLTIP */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>9. Utility Primitives</CardTitle>
                  <CardDescription>Avatar, Tooltip, Kbd, Skeleton & Switch</CardDescription>
                </CardHeader>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
                    <Avatar name="Rohan Sharma" size="md" />
                    <Avatar name="Bharat Cloud" size="md" />
                    <Tooltip content="Direct NEFT/RTGS & Instant UPI">
                      <Badge variant="info">Hover for Bank & UPI Tooltip</Badge>
                    </Tooltip>
                    <div>
                      <Kbd>Ctrl</Kbd> + <Kbd>P</Kbd> to Print
                    </div>
                  </div>

                  <div>
                    <Text variant="caption" color={colors.neutral[500]}>Loading Skeleton Placeholder:</Text>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5], marginTop: spacing[1.5] }}>
                      <Skeleton width="100%" height="16px" />
                      <Skeleton width="75%" height="16px" />
                      <Skeleton width="40%" height="16px" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: spacing[4] }}>
                    <Checkbox
                      label="Include bank wire instructions"
                      checked={checkboxChecked}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckboxChecked(e.target.checked)}
                    />
                    <Switch
                      label="Auto-charge payment card"
                      checked={switchChecked}
                      onChange={setSwitchChecked}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* VIEW 3: WCAG AA CONTRAST AUDIT */}
        {activeView === 'wcag' && (
          <div>
            <div style={{ marginBottom: spacing[6] }}>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: colors.neutral[900] }}>
                WCAG AA Accessibility Contrast Audit
              </h1>
              <p style={{ margin: `${spacing[1]} 0 0 0`, color: colors.neutral[600] }}>
                Every text and background pair across InvoiceKit is verified against the W3C WCAG 2.1 specifications (Minimum 4.5:1 ratio for normal text).
              </p>
            </div>

            {/* Live Interactive Color Contrast Tester */}
            <Card variant="outlined" style={{ marginBottom: spacing[8] }}>
              <CardHeader>
                <CardTitle>Interactive Contrast Ratio Inspector</CardTitle>
                <CardDescription>Test any foreground and background color combination in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: spacing[6], alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                    <div style={{ display: 'flex', gap: spacing[3] }}>
                      <Input
                        label="Foreground (Text Hex)"
                        value={customFg}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomFg(e.target.value)}
                      />
                      <Input
                        label="Background Hex"
                        value={customBg}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomBg(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: spacing[2] }}>
                      {['#4F46E5', '#0F172A', '#065F46', '#991B1B', '#FFFFFF'].map((hex) => (
                        <button
                          key={hex}
                          onClick={() => setCustomFg(hex)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: hex,
                            border: `1px solid ${colors.neutral[300]}`,
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {customContrast && (
                    <div
                      style={{
                        padding: spacing[6],
                        borderRadius: radii.xl,
                        backgroundColor: customBg,
                        color: customFg,
                        border: `1px solid ${colors.neutral[300]}`,
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'monospace' }}>
                        {customContrast.ratioFormatted}
                      </div>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, marginTop: spacing[1] }}>
                        Sample Text Preview
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: spacing[2], marginTop: spacing[3] }}>
                        <Badge variant={customContrast.wcagAA ? 'success' : 'danger'}>
                          {customContrast.wcagAA ? '✓ WCAG AA Pass (>=4.5:1)' : '✕ WCAG AA Fail'}
                        </Badge>
                        <Badge variant={customContrast.wcagAAA ? 'success' : 'neutral'}>
                          {customContrast.wcagAAA ? '✓ WCAG AAA Pass (>=7:1)' : 'WCAG AAA Normal'}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* System Audit Results Table */}
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>System Palette Audit Matrix</CardTitle>
                <CardDescription>Verified token pairs evaluated during automated test suite execution</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component Token Pair</TableHead>
                      <TableHead>Sample</TableHead>
                      <TableHead>FG Hex</TableHead>
                      <TableHead>BG Hex</TableHead>
                      <TableHead align="right">Contrast Ratio</TableHead>
                      <TableHead align="center">WCAG AA Standard</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {defaultComponentTokenPairs.map((pair: { name: string; fg: string; bg: string; isLarge: boolean }, idx: number) => {
                      const res = evaluateContrast(pair.fg, pair.bg);
                      return (
                        <TableRow key={idx}>
                          <TableCell style={{ fontWeight: 600 }}>{pair.name}</TableCell>
                          <TableCell>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '4px 10px',
                                borderRadius: radii.md,
                                backgroundColor: pair.bg,
                                color: pair.fg,
                                fontWeight: 600,
                                fontSize: '0.8125rem',
                              }}
                            >
                              Aa 123
                            </span>
                          </TableCell>
                          <TableCell mono>{pair.fg}</TableCell>
                          <TableCell mono>{pair.bg}</TableCell>
                          <TableCell align="right" mono style={{ fontWeight: 700 }}>
                            {res.ratioFormatted}
                          </TableCell>
                          <TableCell align="center">
                            <Badge variant={res.wcagAA ? 'success' : 'danger'} size="sm">
                              {res.wcagAA ? 'PASS AA' : 'FAIL'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* VIEW 4: PACKAGING, VERSIONING & CI/CD */}
        {activeView === 'package' && (
          <div>
            <div style={{ marginBottom: spacing[6] }}>
              <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: colors.neutral[900] }}>
                Packaging, Versioning & CI/CD Pipeline
              </h1>
              <p style={{ margin: `${spacing[1]} 0 0 0`, color: colors.neutral[600] }}>
                Configured as a modern workspace monorepo ready for local distribution (<code>npm pack</code>) or private registry publishing.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: spacing[6] }}>
              {/* Package Monorepo Architecture */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Workspace Structure</CardTitle>
                  <CardDescription>Modular separation of concerns</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre
                    style={{
                      backgroundColor: colors.neutral[900],
                      color: colors.neutral[100],
                      padding: spacing[4],
                      borderRadius: radii.lg,
                      fontSize: '0.8125rem',
                      lineHeight: 1.5,
                    }}
                  >
{`invoicekit/
├── packages/
│   ├── tokens/      # @invoicekit/tokens (WCAG audit, palettes)
│   ├── ui/          # @invoicekit/ui (24 shared components)
│   └── renderer/    # @invoicekit/renderer (DOM, PDF, Email)
├── apps/
│   └── docs/        # @invoicekit/docs (Playground & Studio)
└── .github/
    └── workflows/   # ci.yml (Lint, typecheck, test, build)`}
                  </pre>
                </CardContent>
              </Card>

              {/* CI/CD GitHub Action Configuration */}
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>GitHub Actions CI Workflow</CardTitle>
                  <CardDescription>Runs tests, contrast audits & typechecks on push</CardDescription>
                </CardHeader>
                <CardContent>
                  <pre
                    style={{
                      backgroundColor: colors.neutral[900],
                      color: '#60A5FA',
                      padding: spacing[4],
                      borderRadius: radii.lg,
                      fontSize: '0.75rem',
                      maxHeight: '260px',
                      overflowY: 'auto',
                    }}
                  >
{`name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Typecheck
        run: npm run typecheck

      - name: Run WCAG Contrast & Renderer Tests
        run: npm test

      - name: Build Packages & Docs
        run: npm run build`}
                  </pre>
                </CardContent>
              </Card>

              {/* Changelog & Versioning */}
              <Card variant="outlined" style={{ gridColumn: '1 / -1' }}>
                <CardHeader>
                  <CardTitle>Package Changelog (v1.0.0)</CardTitle>
                  <CardDescription>Semantic versioning release history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                        <Text variant="h4">v1.0.0 — Initial Release</Text>
                        <Badge variant="success">Latest</Badge>
                        <Text variant="caption" color={colors.neutral[500]}>October 2026</Text>
                      </div>
                      <ul style={{ margin: `${spacing[2]} 0 0 0`, paddingLeft: spacing[4], fontSize: '0.875rem', color: colors.neutral[700], lineHeight: 1.6 }}>
                        <li><strong>Universal Invoicing Engine:</strong> Implemented single-source <code>renderInvoice(invoice, out)</code> with DOM, vector PDF, and inline HTML/plain-text email renderers.</li>
                        <li><strong>Design System Tokens:</strong> Complete palette tokenization with automated WCAG AA (&ge; 4.5:1) accessibility audit suite.</li>
                        <li><strong>Shared UI Library:</strong> 24 enterprise primitives including Button, Input, Table, Modal, Badge, Select, Tabs, Toast, and CurrencyInput.</li>
                        <li><strong>Interactive Studio & Docs:</strong> Real-time playground, email preview, PDF vector download, and WCAG inspector.</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${colors.neutral[200]}`,
          backgroundColor: colors.white,
          padding: `${spacing[5]} ${spacing[6]}`,
          fontSize: '0.8125rem',
          color: colors.neutral[600],
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: spacing[2], alignItems: 'center', textAlign: 'center' }}>
          <div>
            <strong>InvoiceKit</strong> — Production Component Library & Universal Invoice Engine. Built with React, TypeScript & Vite.
          </div>
          <div style={{ fontSize: '0.875rem', color: colors.neutral[700] }}>
            Designed &amp; Developed by{' '}
            <a
              href="https://github.com/omingole87"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontWeight: 700, color: colors.primary[600], textDecoration: 'none' }}
            >
              OM INGOLE
            </a>{' '}
            • 2nd Year IT @ SSGMCE
          </div>
        </div>
      </footer>
    </div>
  );
}
