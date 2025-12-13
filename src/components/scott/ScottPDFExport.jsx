import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import jsPDF from 'jspdf';

/**
 * PDF EXPORT
 * Contracts, financial reports for accountants
 */

export default function ScottPDFExport({ artistId = null }) {
    const [exporting, setExporting] = useState(false);

    const exportFinancialReport = async () => {
        setExporting(true);

        try {
            // Fetch data
            const invoices = artistId
                ? await base44.entities.ScottInvoice.filter({ artist_id: artistId })
                : await base44.entities.ScottInvoice.list();

            const expenses = artistId
                ? await base44.entities.ScottExpense.filter({ artist_id: artistId })
                : await base44.entities.ScottExpense.list();

            // Calculate totals
            const totalRevenue = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);
            const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
            const netProfit = totalRevenue - totalExpenses;

            // Generate PDF
            const doc = new jsPDF();
            
            // Header
            doc.setFontSize(20);
            doc.text('KINGDOM51 Financial Report', 20, 20);
            
            doc.setFontSize(10);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);
            
            if (artistId) {
                const artist = await base44.entities.ScottArtist.filter({ id: artistId });
                doc.text(`Artist: ${artist[0]?.name || 'Unknown'}`, 20, 35);
            }

            // Summary
            doc.setFontSize(14);
            doc.text('Financial Summary', 20, 50);
            
            doc.setFontSize(10);
            doc.text(`Total Revenue: £${totalRevenue.toFixed(2)}`, 30, 60);
            doc.text(`Total Expenses: £${totalExpenses.toFixed(2)}`, 30, 68);
            doc.setFontSize(12);
            doc.text(`Net Profit: £${netProfit.toFixed(2)}`, 30, 78);

            // Invoices
            let y = 95;
            doc.setFontSize(14);
            doc.text('Invoices', 20, y);
            y += 10;

            doc.setFontSize(9);
            invoices.forEach((inv, i) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(`${inv.date} - ${inv.description} - £${inv.amount} - ${inv.status}`, 30, y);
                y += 8;
            });

            // Expenses
            y += 10;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.setFontSize(14);
            doc.text('Expenses', 20, y);
            y += 10;

            doc.setFontSize(9);
            expenses.forEach((exp, i) => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(`${exp.date} - ${exp.description} - £${exp.amount} - ${exp.category}`, 30, y);
                y += 8;
            });

            // Save
            doc.save(`KINGDOM51_Financial_Report_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (error) {
            alert('Export error: ' + error.message);
        } finally {
            setExporting(false);
        }
    };

    const exportContractTemplate = async () => {
        setExporting(true);

        try {
            const doc = new jsPDF();
            
            // Header
            doc.setFontSize(20);
            doc.text('ARTIST MANAGEMENT AGREEMENT', 20, 20);
            
            doc.setFontSize(10);
            doc.text('KINGDOM51', 20, 30);
            doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

            // Contract template
            doc.setFontSize(11);
            const contractText = [
                '',
                'This Artist Management Agreement ("Agreement") is entered into on',
                `${new Date().toLocaleDateString()} between:`,
                '',
                'MANAGER: KINGDOM51',
                'Address: _______________________________',
                '',
                'ARTIST: _______________________________',
                'Address: _______________________________',
                '',
                '1. TERM',
                'This Agreement shall commence on _________ and continue for',
                'a period of _____ years.',
                '',
                '2. COMMISSION',
                'Manager shall receive __% of Artist\'s gross income.',
                '',
                '3. RESPONSIBILITIES',
                'Manager agrees to use reasonable efforts to promote Artist\'s career.',
                '',
                '4. EXPENSES',
                'All approved expenses shall be reimbursed by Artist.',
                '',
                'Signatures:',
                '',
                'MANAGER: _________________ Date: _______',
                '',
                'ARTIST: __________________ Date: _______'
            ];

            let y = 50;
            contractText.forEach(line => {
                if (y > 270) {
                    doc.addPage();
                    y = 20;
                }
                doc.text(line, 20, y);
                y += 7;
            });

            doc.save(`KINGDOM51_Contract_Template_${new Date().toISOString().split('T')[0]}.pdf`);

        } catch (error) {
            alert('Export error: ' + error.message);
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="bg-black border-2 border-cyan-500 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h3 className="text-cyan-400 font-black font-mono text-lg">PDF EXPORTS</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <button
                    onClick={exportFinancialReport}
                    disabled={exporting}
                    className="p-4 bg-green-900/30 border-2 border-green-500 hover:bg-green-900/50 transition-all disabled:opacity-50"
                >
                    <Download className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-white font-bold text-sm">Financial Report</p>
                    <p className="text-gray-400 text-xs">Invoices, expenses, profit/loss</p>
                </button>

                <button
                    onClick={exportContractTemplate}
                    disabled={exporting}
                    className="p-4 bg-purple-900/30 border-2 border-purple-500 hover:bg-purple-900/50 transition-all disabled:opacity-50"
                >
                    <FileText className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-white font-bold text-sm">Contract Template</p>
                    <p className="text-gray-400 text-xs">Management agreement PDF</p>
                </button>
            </div>

            <div className="mt-4 bg-cyan-900/20 border border-cyan-500/50 p-3">
                <p className="text-cyan-400 text-xs font-bold mb-1">💼 FOR ACCOUNTANTS:</p>
                <p className="text-gray-400 text-xs">
                    Export clean financial reports for tax filing and bookkeeping
                </p>
            </div>
        </div>
    );
}