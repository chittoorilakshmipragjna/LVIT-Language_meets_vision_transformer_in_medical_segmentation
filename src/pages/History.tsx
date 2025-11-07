import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const mockHistory = [
  {
    id: 1,
    date: "2025-11-07",
    patientId: "PT-2451",
    imageType: "Chest X-Ray",
    findings: "Left upper lobe opacity with irregular borders",
    confidence: 87,
    status: "completed",
    analysis: "Opacity detected in the left upper lobe, measuring approximately 2.5cm with irregular borders.",
    detailedFindings: [
      "Left upper lobe opacity detected",
      "Irregular borders with heterogeneous density",
      "Primary lesion size: approximately 2.5cm"
    ]
  },
  {
    id: 2,
    date: "2025-11-06",
    patientId: "PT-2398",
    imageType: "CT Scan",
    findings: "No abnormalities detected",
    confidence: 95,
    status: "completed",
    analysis: "CT scan shows clear lung fields with no evidence of consolidation, masses, or nodules.",
    detailedFindings: [
      "Clear lung fields bilaterally",
      "No consolidation or masses",
      "Normal mediastinal structures"
    ]
  },
  {
    id: 3,
    date: "2025-11-05",
    patientId: "PT-2367",
    imageType: "Chest X-Ray",
    findings: "Left lower lobe consolidation with air bronchograms",
    confidence: 82,
    status: "completed",
    analysis: "Consolidation in left lower lobe with visible air bronchograms, suggestive of pneumonia.",
    detailedFindings: [
      "Left lower lobe consolidation",
      "Air bronchograms present",
      "Pattern consistent with pneumonia"
    ]
  }
];

export default function History() {
  const [selectedItem, setSelectedItem] = useState<typeof mockHistory[0] | null>(null);

  const handleView = (item: typeof mockHistory[0]) => {
    setSelectedItem(item);
  };

  const handleDownload = (item: typeof mockHistory[0]) => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      pdf.setFontSize(20);
      pdf.setTextColor(0, 150, 136);
      pdf.text("Medical Imaging Analysis Report", pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Patient ID: ${item.patientId}`, 20, 35);
      pdf.text(`Date: ${item.date}`, 20, 42);
      pdf.text(`Image Type: ${item.imageType}`, 20, 49);
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Confidence Score: ${item.confidence}%`, 20, 60);
      
      pdf.setFontSize(14);
      pdf.text("Key Findings:", 20, 75);
      pdf.setFontSize(11);
      let yPos = 85;
      item.detailedFindings.forEach((finding: string, idx: number) => {
        const lines = pdf.splitTextToSize(`${idx + 1}. ${finding}`, pageWidth - 40);
        pdf.text(lines, 20, yPos);
        yPos += lines.length * 6;
      });
      
      pdf.setFontSize(14);
      pdf.text("Detailed Analysis:", 20, yPos + 10);
      pdf.setFontSize(11);
      const analysisLines = pdf.splitTextToSize(item.analysis, pageWidth - 40);
      pdf.text(analysisLines, 20, yPos + 20);
      
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        "This report is AI-generated and should be reviewed by a qualified medical professional.",
        pageWidth / 2,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      
      pdf.save(`${item.patientId}-analysis-${item.date}.pdf`);
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analysis History</h1>
          <p className="text-muted-foreground">
            View and manage your previous diagnostic analyses
          </p>
        </div>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-6 border-primary/10 bg-card/50 backdrop-blur hover:border-primary/20 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{item.patientId}</h3>
                    <Badge variant="outline" className="border-primary/30">
                      {item.imageType}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.findings}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Confidence:</span>
                    <div className="flex-1 max-w-[200px] h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{item.confidence}%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/20"
                    onClick={() => handleView(item)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-primary/20"
                    onClick={() => handleDownload(item)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Analysis Details - {selectedItem?.patientId}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-medium">{selectedItem.date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Image Type:</span>
                  <p className="font-medium">{selectedItem.imageType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Confidence:</span>
                  <p className="font-medium">{selectedItem.confidence}%</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <h3 className="font-semibold mb-2 text-destructive">Key Findings:</h3>
                <ul className="space-y-1">
                  {selectedItem.detailedFindings.map((finding: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Detailed Analysis:</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedItem.analysis}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
