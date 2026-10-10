import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  StatusPill,
  Text,
  Badge,
} from '@invoicekit/ui';
import { colors, spacing, radii } from '@invoicekit/tokens';
import {
  InvoiceRendererOutput,
  InvoiceStatusType,
  Party,
  InvoiceItem,
  InvoiceTotals,
  PaymentDetails,
  formatIndianCurrency,
} from './types';

export class DOMInvoiceRenderer implements InvoiceRendererOutput<React.ReactElement> {
  private headerData?: {
    title: string;
    invoiceNumber: string;
    status: InvoiceStatusType;
    issueDate: string;
    dueDate: string;
    placeOfSupply?: string;
  };
  private issuerData?: Party;
  private clientData?: Party;
  private rowsData: InvoiceItem[] = [];
  private totalsData?: InvoiceTotals;
  private notesData?: { notes?: string; terms?: string };
  private footerData?: PaymentDetails;

  header(
    title: string,
    invoiceNumber: string,
    status: InvoiceStatusType,
    issueDate: string,
    dueDate: string,
    placeOfSupply?: string
  ): void {
    this.headerData = { title, invoiceNumber, status, issueDate, dueDate, placeOfSupply };
  }

  parties(issuer: Party, client: Party): void {
    this.issuerData = issuer;
    this.clientData = client;
  }

  row(item: InvoiceItem): void {
    this.rowsData.push(item);
  }

  total(totals: InvoiceTotals): void {
    this.totalsData = totals;
  }

  notes(notes?: string, terms?: string): void {
    this.notesData = { notes, terms };
  }

  footer(paymentDetails?: PaymentDetails): void {
    this.footerData = paymentDetails;
  }

  getResult(): React.ReactElement {
    const { headerData, issuerData, clientData, rowsData, totalsData, notesData, footerData } = this;
    const currency = totalsData?.currency || 'INR';

    const fmt = (val: number) => formatIndianCurrency(val, currency);

    return (
      <Card variant="outlined" style={{ maxWidth: '860px', margin: '0 auto', backgroundColor: colors.white }}>
        {/* Header Section */}
        <CardHeader
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: `${spacing[8]} ${spacing[8]} ${spacing[6]}`,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], flexWrap: 'wrap' }}>
              <Text variant="h2">{headerData?.title || 'Tax Invoice'}</Text>
              {headerData?.status && <StatusPill status={headerData.status} />}
              <Badge variant="info" size="sm">GST Compliant</Badge>
            </div>
            <div style={{ display: 'flex', gap: spacing[3], marginTop: spacing[1.5], alignItems: 'center' }}>
              <Text variant="mono" color={colors.neutral[700]} weight="semibold">
                {headerData?.invoiceNumber}
              </Text>
              {headerData?.placeOfSupply && (
                <Text variant="caption" color={colors.neutral[500]}>
                  Place of Supply: <strong>{headerData.placeOfSupply}</strong>
                </Text>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
              <div>
                <Text variant="caption" color={colors.neutral[500]}>Invoice Date</Text>
                <Text variant="body-sm" weight="medium">{headerData?.issueDate}</Text>
              </div>
              <div style={{ marginTop: spacing[1] }}>
                <Text variant="caption" color={colors.neutral[500]}>Payment Due</Text>
                <Text variant="body-sm" weight="semibold" color={colors.danger[700]}>
                  {headerData?.dueDate}
                </Text>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent style={{ padding: `0 ${spacing[8]} ${spacing[8]}` }}>
          {/* Parties: Billed By (Supplier) vs Billed To (Buyer) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: spacing[6],
              padding: `${spacing[5]} 0`,
              backgroundColor: colors.neutral[50],
              borderRadius: radii.lg,
              marginBottom: spacing[6],
            }}
          >
            <div style={{ padding: `0 ${spacing[5]}` }}>
              <Text variant="caption" color={colors.neutral[500]} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Billed By (Supplier)
              </Text>
              <Text variant="body" weight="semibold" style={{ marginTop: spacing[1] }}>
                {issuerData?.name}
              </Text>
              {issuerData?.address && <Text variant="body-sm" color={colors.neutral[600]}>{issuerData.address}</Text>}
              <div style={{ marginTop: spacing[2], display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {issuerData?.gstin && (
                  <Text variant="caption" weight="medium" color={colors.primary[700]}>
                    GSTIN: <code style={{ fontFamily: 'monospace' }}>{issuerData.gstin}</code>
                  </Text>
                )}
                {issuerData?.pan && (
                  <Text variant="caption" color={colors.neutral[600]}>
                    PAN: <code style={{ fontFamily: 'monospace' }}>{issuerData.pan}</code>
                  </Text>
                )}
                {issuerData?.state && (
                  <Text variant="caption" color={colors.neutral[500]}>
                    State: {issuerData.state} (Code: {issuerData.stateCode || 'N/A'})
                  </Text>
                )}
              </div>
            </div>

            <div style={{ padding: `0 ${spacing[5]}`, borderLeft: `1px solid ${colors.neutral[200]}` }}>
              <Text variant="caption" color={colors.neutral[500]} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Billed To (Buyer)
              </Text>
              <Text variant="body" weight="semibold" style={{ marginTop: spacing[1] }}>
                {clientData?.name}
              </Text>
              {clientData?.address && <Text variant="body-sm" color={colors.neutral[600]}>{clientData.address}</Text>}
              <div style={{ marginTop: spacing[2], display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {clientData?.gstin && (
                  <Text variant="caption" weight="medium" color={colors.primary[700]}>
                    GSTIN: <code style={{ fontFamily: 'monospace' }}>{clientData.gstin}</code>
                  </Text>
                )}
                {clientData?.pan && (
                  <Text variant="caption" color={colors.neutral[600]}>
                    PAN: <code style={{ fontFamily: 'monospace' }}>{clientData.pan}</code>
                  </Text>
                )}
                {clientData?.state && (
                  <Text variant="caption" color={colors.neutral[500]}>
                    State: {clientData.state} (Code: {clientData.stateCode || 'N/A'})
                  </Text>
                )}
              </div>
            </div>
          </div>

          {/* Line Items Table with HSN/SAC Column */}
          <div style={{ marginTop: spacing[4] }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item & Description</TableHead>
                  <TableHead align="center">HSN/SAC</TableHead>
                  <TableHead align="right">Qty</TableHead>
                  <TableHead align="right">Unit Price (₹)</TableHead>
                  <TableHead align="right">Taxable Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rowsData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Text variant="body-sm" weight="medium">{item.description}</Text>
                    </TableCell>
                    <TableCell align="center" mono style={{ fontSize: '0.75rem', color: colors.neutral[600] }}>
                      {item.hsnSac || '—'}
                    </TableCell>
                    <TableCell align="right" mono>
                      {item.quantity}
                    </TableCell>
                    <TableCell align="right" mono>
                      {fmt(item.unitPrice)}
                    </TableCell>
                    <TableCell align="right" mono style={{ fontWeight: 600 }}>
                      {fmt(item.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totals & GST Breakdown */}
          {totalsData && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: spacing[6] }}>
              <div style={{ width: '340px', display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text variant="body-sm" color={colors.neutral[600]}>Taxable Value</Text>
                  <Text variant="mono" weight="medium">{fmt(totalsData.subtotal)}</Text>
                </div>
                {totalsData.discount ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text variant="body-sm" color={colors.neutral[600]}>Discount</Text>
                    <Text variant="mono" color={colors.danger[700]}>
                      -{fmt(totalsData.discount)}
                    </Text>
                  </div>
                ) : null}

                {/* GST Tax Lines: Interstate vs Intrastate */}
                {totalsData.isInterstate ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text variant="body-sm" color={colors.neutral[600]}>
                      IGST ({totalsData.taxRate}%)
                    </Text>
                    <Text variant="mono" weight="medium">
                      {fmt(totalsData.igstAmount || totalsData.taxAmount)}
                    </Text>
                  </div>
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text variant="body-sm" color={colors.neutral[600]}>
                        CGST ({totalsData.taxRate / 2}%)
                      </Text>
                      <Text variant="mono" weight="medium">
                        {fmt(totalsData.cgstAmount || totalsData.taxAmount / 2)}
                      </Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text variant="body-sm" color={colors.neutral[600]}>
                        SGST ({totalsData.taxRate / 2}%)
                      </Text>
                      <Text variant="mono" weight="medium">
                        {fmt(totalsData.sgstAmount || totalsData.taxAmount / 2)}
                      </Text>
                    </div>
                  </>
                )}

                <div style={{ height: '1px', backgroundColor: colors.neutral[200], margin: `${spacing[1]} 0` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Text variant="h4">Total Due</Text>
                  <Text variant="h3" color={colors.primary[600]} style={{ fontFamily: 'monospace' }}>
                    {fmt(totalsData.total)}
                  </Text>
                </div>
              </div>
            </div>
          )}

          {/* Notes & Terms */}
          {(notesData?.notes || notesData?.terms) && (
            <div style={{ marginTop: spacing[8], backgroundColor: colors.neutral[50], padding: spacing[4], borderRadius: radii.lg }}>
              {notesData.notes && (
                <div style={{ marginBottom: notesData.terms ? spacing[2] : 0 }}>
                  <Text variant="caption" weight="semibold" color={colors.neutral[700]}>Declaration / Notes:</Text>
                  <Text variant="body-sm" color={colors.neutral[600]}>{notesData.notes}</Text>
                </div>
              )}
              {notesData.terms && (
                <div>
                  <Text variant="caption" weight="semibold" color={colors.neutral[700]}>Terms & Conditions:</Text>
                  <Text variant="body-sm" color={colors.neutral[600]}>{notesData.terms}</Text>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {/* Footer with Indian Banking (NEFT/RTGS/IMPS & UPI) */}
        {footerData && (
          <CardFooter style={{ padding: `${spacing[5]} ${spacing[8]}`, backgroundColor: colors.neutral[50] }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing[3] }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                  <Text variant="caption" weight="bold" color={colors.neutral[700]}>
                    INDIAN BANKING DETAILS (NEFT / RTGS / IMPS):
                  </Text>
                  <Badge variant="success" size="sm">Active Account</Badge>
                </div>
                <div style={{ marginTop: spacing[1], fontSize: '0.8125rem', color: colors.neutral[800], lineHeight: 1.5 }}>
                  <strong>{footerData.bankName}</strong> ({footerData.accountType || 'Current'} A/C) • A/C No:{' '}
                  <code style={{ fontFamily: 'monospace', fontWeight: 600 }}>{footerData.accountNumber}</code> • IFSC:{' '}
                  <code style={{ fontFamily: 'monospace', fontWeight: 700, color: colors.primary[700] }}>
                    {footerData.ifscCode}
                  </code>
                  {footerData.branch && <span> • Branch: {footerData.branch}</span>}
                </div>
                {footerData.upiId && (
                  <div style={{ marginTop: spacing[1], display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <Text variant="caption" color={colors.neutral[600]}>
                      UPI VPA: <strong style={{ color: colors.neutral[900], fontFamily: 'monospace' }}>{footerData.upiId}</strong>
                    </Text>
                    <span style={{ fontSize: '0.75rem', color: colors.success[700], fontWeight: 600 }}>
                      ⚡ Instant UPI Settlement
                    </span>
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text variant="caption" color={colors.neutral[400]}>Authorized Signatory</Text>
                <div style={{ height: '24px' }}></div>
                <Text variant="caption" weight="semibold" color={colors.neutral[700]}>
                  For {issuerData?.name}
                </Text>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
}
